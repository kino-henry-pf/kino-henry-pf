import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import OrderDetail from './entities/orderDetails.entity';
import Product from '../products/product.entity';
import { UsersService } from '../users/users.service';
import { BranchService } from '../branchs/branchs.service';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateOrderDto } from './dto/create-order.dto';
import SeatReservation from '../reservations/seat-reservation.entity';

@Injectable()
export default class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly detailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly usersService: UsersService,
    private readonly branchsService: BranchService,
    private readonly reservationsService: ReservationsService,
  ) {}
  async findById(id: string): Promise<Order | null> {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ['details', 'details.product', 'details.seatReservation'],
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['details'],
    });
  }

  async create(dto: CreateOrderDto): Promise<Order | null> {
    await this.usersService.findById(dto.userId);
    await this.branchsService.findById(dto.branchId);

    // Validate seat reservations
    let seatDetails: SeatReservation[] = [];
    if (dto.seatReservationIds?.length) {
      seatDetails = await this.reservationsService.findSeatReservations(
        dto.seatReservationIds,
      );
      console.log(dto.seatReservationIds);
      if (seatDetails.length !== dto.seatReservationIds.length) {
        throw new BadRequestException(
          'One or more seatReservationIds are invalid',
        );
      }
    }

    // Validate products
    let productEntities: Product[] = [];
    if (dto.products?.length) {
      const productIds = dto.products.map((p) => p.productId);
      productEntities = await this.productsRepository.find({
        where: { id: In(productIds) },
      });
      if (productEntities.length !== productIds.length) {
        throw new BadRequestException('One or more productIds are invalid');
      }
    }

    const order = this.ordersRepository.create({
      user: { id: dto.userId },
      branch: { id: dto.branchId },
    });
    const savedOrder = await this.ordersRepository.save(order);

    // Build order details
    const details: OrderDetail[] = [];

    // 1. Ticket items
    for (const seat of seatDetails) {
      details.push(
        this.detailsRepository.create({
          orderId: savedOrder.id,
          seatReservationId: seat.id,
          quantity: 1,
          price: 85, // Always assign, never leave undefined
        }),
      );
    }

    // 2. Product items
    for (const item of dto.products || []) {
      const product = productEntities.find((p) => p.id === item.productId);

      if (!product) {
        throw new BadRequestException(`Invalid productId: ${item.productId}`);
      }

      details.push(
        this.detailsRepository.create({
          orderId: savedOrder.id,
          productId: product.id,
          quantity: item.quantity,
          price: Number(product.price), // FORCE numeric
        }),
      );
    }

    await this.detailsRepository.save(details);

    const savedDetails = await this.detailsRepository.save(details);

    // Calculate total
    const total = savedDetails.reduce(
      (sum, detail) => sum + Number(detail.price) * detail.quantity,
      0,
    );

    savedOrder.total = total;
    await this.ordersRepository.save(savedOrder);

    return this.findById(savedOrder.id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Branch } from 'src/branchs/branch.entity';
import { OrderDetails } from './entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    // @InjectRepository(Reservations)
    // private readonly reservationsRepository: Repository<Reservations>
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>
  ){}
  async create(createOrderDto: CreateOrderDto) {
    const user: User | null = await this.usersRepository.findOneBy({id: createOrderDto.userId})
    if (!user) throw new NotFoundException('User not found')
    const branch: Branch | null = await this.branchRepository.findOneBy({id: createOrderDto.branchId})
    if (!branch) throw new NotFoundException('Branch not found')
    // const reservation: Reservation | null = await this.reservationRepository.findOneBy({id: createOrderDto.reservationId})
    // if (!reservation) throw new NotFoundException('Branch not found')
    const orderDetails: OrderDetails | null = await this.orderDetailsRepository.findOneBy({id: createOrderDto.orderDetailsId})
    if (!orderDetails) throw new NotFoundException('Order details not found')
    
    const order = new Order()
    order.user = user
    order.branch = branch
    // order.reservation = reservation
    order.orderDetails = orderDetails
    return order
  }

  async findAll() {
    const orders = await this.orderRepository.find()
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({id})
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

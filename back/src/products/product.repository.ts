import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import Product, { Category } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import CreateProductDto from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductsRepository {
    
    constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>) {}

    async findAll(): Promise<Product[]>{
        return await this.productRepository.find({
            order: {name: 'ASC'}
        })
    }

    async findById(id: string): Promise<Product>{
        const product = await this.productRepository.findOneBy({id})
        if(!product) throw new BadRequestException(`Producto con id ${id} no encontrado`)
        return product
    }

   async findByCategory(category: Category): Promise<Product[]> {
  const products = await this.productRepository.find({
    where: { category }
  });

  if (!products.length) {
    throw new BadRequestException(`No hay productos disponibles en la categoría ${category}`);
  }

  return products;
}

    async createProduct(product: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create({
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            category: product.category,
        });

        return await this.productRepository.save(newProduct)
    }

    async updateProduct(id: string, product: UpdateProductDto): Promise<Product>{
        const findProduct = await this.productRepository.findOneBy({id})
        if(!findProduct) throw new BadRequestException(`Producto con id ${id} no existe`)
        
        await this.productRepository.update(id, product)
        const findUpdatedProduct = await this.productRepository.findOneBy({id})
        if(!findUpdatedProduct) throw new BadRequestException(`Producto con id ${id} no existe`)

        
        return findUpdatedProduct
    }

    async deleteProduct(id: string): Promise<string>{

        const findProduct = await this.productRepository.findOneBy({id})
        if(!findProduct) throw new BadRequestException(`Producto con id ${id} no existe`)

        await this.productRepository.delete({id})

        return `Producto con id ${id} ha sido eliminado`
    }
}
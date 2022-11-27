import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  create(product: CreateProductDto): Promise <ProductEntity> {    
    return new Promise(async (resolve, reject) => {
      try{   
        const id = '123456';  
        const isAvailable = true;   
        let created = new ProductEntity();
        created = { ...product, id: id, isAvailable: isAvailable};
        resolve(created);
      }catch (error){
        console.log(error);
        reject({
          code: error.code,
          detail: error.detail
        })        
      }
    });
  }
}

import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}

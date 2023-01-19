import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { productProviders } from 'src/products/procucts.providers';
import { cartProviders } from './carts.providers';
import { CartsController } from './controllers/carts.controller';
import { CartsService } from './service/carts.service';

@Module({
  controllers: [CartsController],
  providers: [
    ...databaseProviders,
    ...cartProviders,
    ...productProviders,
    CartsService]
})
export class CartsModule { }

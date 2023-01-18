import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { cartProviders } from './carts.providers';
import { CartsController } from './controllers/carts.controller';
import { CartsService } from './service/carts.service';

@Module({
  controllers: [CartsController],
  providers: [
    ...databaseProviders,
    ...cartProviders,
    CartsService]
})
export class CartsModule {}

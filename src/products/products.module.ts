import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controllers/products.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { productProviders } from './procucts.providers';

@Module({
  controllers: [ProductsController],
  providers: [
    ...databaseProviders,
    ...productProviders,
    ProductsService
  ]
})
export class ProductsModule {}

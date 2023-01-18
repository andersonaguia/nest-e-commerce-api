import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AppModule, 
    ProductsModule, CartsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AppModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

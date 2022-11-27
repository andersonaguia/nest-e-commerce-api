import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "../utils/product-category.enum";

export class ProductEntity {
    id: string;

    name: string;

    price: number;

    description: string;

    isAvailable: boolean;

    category: ProductCategory;
}

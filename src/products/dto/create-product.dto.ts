import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "../utils/product-category.enum";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsEnum(ProductCategory)
    readonly category: ProductCategory;
}

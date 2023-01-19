import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto {
    readonly userId: string;
    
    readonly cartId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly productId: number;
}

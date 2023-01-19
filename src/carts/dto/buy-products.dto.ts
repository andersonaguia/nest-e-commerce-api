import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BuyProductsDto {
    @IsNotEmpty()
    @IsNumber()
    readonly cartId: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    readonly address: {
        street: string,
        number: string,
        neighborhood: string,
        city: string,
        zipCode: string
    };

    @IsNotEmpty()
    readonly payment: {
        cardNumber: string,
        cardName: string,
        dueDate: string,
        cvv: string
    }
}

import { CartProductEntity } from "../entities/cart-products.entity";

export class TotalCartDTO {
    items: CartProductEntity[];
    
    total: number;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "../utils/product-category.enum";

@Entity({ name: "products" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: "float" })
    price: number;

    @Column({ length: 255})
    description: string;

    @Column({ default: true })
    isAvailable: boolean;

    @Column()
    category: ProductCategory;
}

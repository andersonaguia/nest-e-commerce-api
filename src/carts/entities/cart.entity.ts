import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;
}

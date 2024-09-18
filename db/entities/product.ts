import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Shop } from './shop';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @ManyToOne(() => Shop, shop => shop.products)
  shop: Shop;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

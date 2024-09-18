import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product';
import { Hotline } from './hotline';
import bcrypt from 'bcrypt';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shopName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, product => product.shop)
  products: Product[];

  @OneToOne(() => Hotline, hotline => hotline.shop)
  hotline: Hotline;

//   async setPassword(password: string) {
//     this.password = await bcrypt.hash(password, 10);
//   }
}

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Shop } from './shop';

@Entity()
export class Hotline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotlineNumber: string;

  @OneToOne(() => Shop)
  @JoinColumn()
  shop: Shop;
}

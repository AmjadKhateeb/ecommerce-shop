import { DataSource } from 'typeorm';
import { Shop } from '../db/entities/shop';
import { Product } from '../db/entities/product';
import { Category } from './../db/entities/category';
import { Hotline } from '../db/entities/hotline';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",  
  password: "", 
  database: "ecommerce-shop", 
  synchronize: true,
  logging: false,
  entities: [Shop, Product, Category, Hotline],
  migrations: [],
  subscribers: [],
});

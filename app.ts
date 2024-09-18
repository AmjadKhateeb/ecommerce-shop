import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './db/dbConfig';
import { shopRouter } from './routes/shop';
import { productRouter } from './routes/product';
import { categoryRouter } from './routes/category';
import { hotlineRouter } from './routes/hotline';

const app = express();
app.use(express.json());

app.use('/shops', shopRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/hotline', hotlineRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(5000, () => {
      console.log('Connected to db');
    });
  })
   .catch(error => console.log(error));

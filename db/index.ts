import express from 'express';
import { AppDataSource } from './dbConfig';
import { shopRouter } from '../routes/shop';
import { productRouter } from '../routes/product';
import { categoryRouter } from '../routes/category';
import { hotlineRouter } from '../routes/hotline'; // Import hotline routes
import { errorHandler } from '../Middleware/errorHandler';

const app = express();
app.use(express.json()); // Ensure this middleware is included

app.use('/shops', shopRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter); // Use category routes
app.use('/hotlines', hotlineRouter); // Use hotline routes

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log('Connected to db');
    });
  })
  .catch(error => console.log(error));

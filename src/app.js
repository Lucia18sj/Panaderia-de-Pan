import express from 'express';
import morgan from 'morgan';

import productRoutes from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view-engine', 'ejs')

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


app.use('/api/customers',customerRoutes);
app.use('/api/products',productRoutes);

export default app;
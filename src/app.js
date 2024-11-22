import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import homeRoutes from './routes/home.routes.js';
import productRoutes from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.PORT || 3000);
app.set('view-engine', 'ejs')


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


app.use('/api/customers',customerRoutes);
app.use('/api/products',productRoutes);
app.use('/', homeRoutes);
app.use('/login' , homeRoutes)
app.use('/register' , homeRoutes)




export default app;
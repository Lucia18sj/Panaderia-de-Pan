import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import homeRoutes from './routes/home.routes.js';
import productRoutes from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';
import cartRoutes from './routes/cart.routes.js';
import administratorRoutes from './routes/administrador.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Configuración de archivos estáticos y middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secreto_seguro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Rutas
app.use('/api/administrator', administratorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/', homeRoutes);
app.use('/api/cart', cartRoutes);


export default app;

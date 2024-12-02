import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

import homeRoutes from './routes/home.routes.js';
import productRoutes from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.PORT || 3000);
app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Asegúrate de que el directorio views esté correcto
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/products', productRoutes);

app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Nosotros.html'));
});

app.get('/contactos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Contactos.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Administrador.html'));
});

app.get('/home', (req, res) => {
    res.render('Home.ejs'); // Renderiza Home.ejs
});

app.use('/api/customers', customerRoutes);
app.use('/home', homeRoutes);

export default app;

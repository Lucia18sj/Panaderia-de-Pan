//import productoController from "../controllers/producto.controller.js";
import { getAllProducts, getOneProduct, insertProduct, updateProduct, deleteProduct, getAllProductsforCard 
} from '../controllers/producto.controller.js';
import express from "express";

const router = express.Router();

// Rutas de productos
router.get('/inventario', getAllProducts);  // Verifica que esta función esté definida en el controlador
router.get('/getOne/:id_product', getOneProduct);  // Verifica que esta función esté definida en el controlador
router.post('/insert', insertProduct);  // Verifica que esta función esté definida en el controlador
router.post('/update/:id_product', updateProduct);  // Verifica que esta función esté definida en el controlador
router.get('/deleteOne/:id_product', deleteProduct);  // Asegúrate de que esta función también esté bien definida

// Rutas para las tarjetas
//router.get('/getOneProductforCard/:id_product', getOneProductforCard);  // Verifica que esta función esté definida
router.get('/getAllProductsforCard', getAllProductsforCard);  // Verifica que esta función esté definida

export default router;

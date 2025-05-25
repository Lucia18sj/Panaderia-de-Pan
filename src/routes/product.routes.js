import productoController from "../controllers/producto.controller.js";
import express from "express";

const router = express.Router();

router.get('/getAllProducts', productoController.getProducts);
router.get('/getAllFeaturedProducts', productoController.getAllFeaturedProducts);
router.get('/getProductById/:id_product', productoController.getProductById);
router.post('/insertProduct', productoController.createProduct);
router.put('/updateProduct/:id_product', productoController.updateProduct);

export default router;

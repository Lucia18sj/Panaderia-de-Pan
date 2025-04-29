import productoController from "../controllers/producto.controller.js";
import express from "express";

const router = express.Router();

router.get('/getAllProducts', productoController.getProducts);
router.get('/getAllFeaturedProducts', productoController.getAllFeaturedProducts);
router.post('/insertProduct', productoController.insertProduct);
router.post('/updateProduct', productoController.updateProduct);


export default router;

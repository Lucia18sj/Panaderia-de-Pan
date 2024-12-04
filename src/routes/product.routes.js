import productoController from "../controllers/producto.controller.js";
import express from "express";

const router = express.Router();

router.get('/', productoController.getAllProductsforCard); 

export default router;

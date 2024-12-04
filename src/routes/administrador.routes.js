import administratorController from "../controllers/administrator.controller.js";
import express from 'express';

const router = express.Router();
router.get('/', administratorController.administrator);
router.get('/inventario', administratorController.getAllProducts);
router.get('/getOne/:id_product', administratorController.getOneProduct);
router.post('/insert', administratorController.insertProduct);  
router.post('/update/:id_product',administratorController.updateProduct);  
router.get('/deleteOne/:id_product', administratorController.deleteProduct); 

export default router;
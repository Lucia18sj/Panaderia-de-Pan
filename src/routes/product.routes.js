import productController from "../controllers/producto.controller.js"
import {Router} from "express";

const router = Router()

router.post('/insertProduct',productController.insertProduct);
router.get('/getOneProduct/:id_product', productController.getOneProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.put('/updateOne/:id_product', productController.UpdateOneProduct);
router.delete('/deleteOne/:id_product', productController.DeleteOneProduct);

//Rutas para las tarjetas 
router.get('/getOneProductforCard/:id_product', productController.getOneProductforCard);
router.get('/getAllProductsforCard', productController.getAllProductsforCard);

export default router;
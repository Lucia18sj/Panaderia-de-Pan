import homeController from "../controllers/home.controller.js";
import { Router } from "express";

const router = Router();
router.get('/login', homeController.login);
router.get('/logout', homeController.logout);

router.get('/register', homeController.register);
router.get('/car/:idCustomer', homeController.carrito);
router.get('/myAccount/:idCustomer',homeController.myAccount)
router.get('/Datos', homeController.DatosMiCuenta);
router.get('/address', homeController.Direcciones);

export default router;


import homeController from "../controllers/home.controller.js";
import { Router } from "express";

const router = Router();

//router.get('/', homeController.getHome);
router.get('/login', homeController.login);
router.get('/register', homeController.register);
router.get('/car', homeController.carrito);
router.get('/myAccount',homeController.myAccount)


export default router;


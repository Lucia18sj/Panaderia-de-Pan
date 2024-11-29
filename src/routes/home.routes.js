import homeController from "../controllers/home.controller.js";
import { Router } from "express";

const router = Router();

router.get('/', homeController.getHome);
router.get('/login', homeController.login);
router.get('/register', homeController.register);
router.get('/:idCustomer', homeController.getHome);
router.get('/:idCustomer', homeController.myAccount);

export default router;


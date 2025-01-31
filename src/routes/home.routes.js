import homeController from "../controllers/home.controller.js";
import { Router } from "express";

const router = Router();

router.get('/', homeController.getProductforHome);
router.get('/login', homeController.login);
router.get('/logout', homeController.logout);

router.get('/register', homeController.register);
router.get('/myAccount/:idCustomer',homeController.myAccount)
router.get('/accountDetails/:idCustomer',homeController.accountDetails)
router.get('/address', homeController.Direcciones);
router.get('/us', homeController.us);
router.get('/contact', homeController.contact);
export default router;


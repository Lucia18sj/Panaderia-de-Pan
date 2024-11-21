import homeController from "../controllers/home.controller.js";
import { Router } from "express";

const router = Router();

router.get('/', homeController.getHome);

export default router;


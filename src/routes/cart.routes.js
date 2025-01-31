import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/:idCustomer", cartController.getCart);
router.post("/add", cartController.addToCart);

export default router;

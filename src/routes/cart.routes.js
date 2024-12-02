import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/confirm/:idCustomer", cartController.confirmSale);
router.get("/:idCustomer", cartController.getCart);
router.put("/update/:idCustomer/:idProduct/:change", cartController.updateQuantity);
router.post("/add", cartController.addToCart);

export default router;

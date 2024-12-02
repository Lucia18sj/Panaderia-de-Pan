import express from "express";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

// Ruta para obtener el carrito
router.get("/:idCustomer", cartController.getCart);

// Ruta para actualizar la cantidad en el carrito
router.post("/", cartController.addToCart);
router.put('/cart/update/:idCustomer/:idProduct/:change', cartController.updateQuantity);
router.post('/confirm', cartController.confirmSale);

export default router;

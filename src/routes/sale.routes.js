import express from "express";
import saleController from "../controllers/sale.controller.js";

const router = express.Router();

router.post("/create", saleController.createSale);
router.post("/confirm", saleController.confirmSale);

export default router;
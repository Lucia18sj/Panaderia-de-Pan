//Customer.Routes
import customerController from "../controllers/customer.controller.js";
import {Router} from "express";

const routes = Router();
    routes.post('/login', customerController.loginCustomer);
    routes.post('/register', customerController.insertCustomer);
export default routes;
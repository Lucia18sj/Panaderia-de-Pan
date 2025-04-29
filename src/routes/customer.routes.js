//Customer.Routes
import customerController from "../controllers/customer.controller.js";
import {Router} from "express";

const routes = Router();
    routes.post('/insertCustomer', customerController.insertCustomer);
    routes.get('/getAllCustomers', customerController.getAllCustomers);
    routes.post('/login', customerController.loginCustomer);
export default routes;
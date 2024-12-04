//Customer.Routes
import customerController from "../controllers/customer.controller.js";
import {Router} from "express";

const routes = Router();
    routes.post('/insertCustomer', customerController.insertCustomer);
    routes.get('/getAllCustomers', customerController.getAllCustomers);
    routes.get('/getOneCustomer/:idcustomer', customerController.getOneCustomer);
    routes.post('/login', customerController.getCustomerId);
export default routes;
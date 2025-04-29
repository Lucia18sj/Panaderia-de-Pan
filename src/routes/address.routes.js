import addresscontroller from "../controllers/address.controller.js";
import {Router} from "express";

const routes = Router();
    routes.post('/insertAddress', addresscontroller.insertAddress);
    routes.get('/getAllAddress/:idCustomer', addresscontroller.getCustomerAddresses);
    routes.post('/updateAddress/:idAddress', addresscontroller.updateAddress);
export default routes;
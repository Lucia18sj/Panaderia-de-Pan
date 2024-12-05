import addresscontroller from "../controllers/address.controller.js";
import {Router} from "express";

const routes = Router();
    routes.post('/insertAddress', addresscontroller.insertAddress);
    routes.get('/getAllAddress/:idCustomer', addresscontroller.GetCustomerAddresses);
    routes.get('/getOneAddress/:idAddress', addresscontroller.updateOneAddress);
    routes.post('/updateAddress/:idAddress', addresscontroller.updateOneAddress);
export default routes;
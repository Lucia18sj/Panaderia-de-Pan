import {pool} from '../database.js'

const addressController = {};

addressController.insertAddress = async(req,res) => {
    const {name, postcode, state, city, address, telephone, address_type, info} = req.body
    try {
        const [rows] =  await pool.query('CALL AddAddress(?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.params.idcustomer, name, postcode, state, city, address, telephone, address_type, info])
        res.send({
            id: rows.insertId,
            name, 
            postcode, 
            state, 
            city, 
            address, 
            telephone, 
            address_type, 
            info
        })
    } catch (error) {
        
    }
};

addressController.GetCustomerAddresses = async(req,res) =>{
    try {
        const [rows] = await pool.query('CALL GetCustomerAddresses(?)', [req.params.idcustomer])
        if(rows.length === 0){
            res.status(404).json({
                message: 'No Customer found'
            })
        }
        res.json(rows)
    } catch (error) {
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
};

addressController.updateOneAddress = async(req,res) => {
    const {address, postcode, state, city, name, telephone, address_type, info} = req.body;
    try {
        await pool.query('CALL UpdateAddress(?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.params.idcustomer,address, postcode, state, city, name, telephone, address_type, info]);
        res.json({
            message: "Address updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error,
        });
    }
};
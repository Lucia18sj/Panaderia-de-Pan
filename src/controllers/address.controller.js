import {pool} from '../database.js'

const addressController = {};

addressController.insertAddress = async (req, res) => {
    const { city, state, postcode, country, address_type, telephone, info } = req.body;
    try {
        const [rows] = await pool.query('CALL AddCustomerAddress(?, ?, ?, ?, ?, ?, ?, ?)', [
            req.params.idcustomer,
            city,
            state,
            postcode,
            country,
            address_type,
            telephone,
            info
        ]);
        res.json({
            message: "Address added successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while adding the address",
            error: error
        });
    }
};

// Obtener todas las direcciones de un cliente
addressController.getCustomerAddresses = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL GetCustomerAddresses(?)', [
            req.params.idcustomer
        ]);
        if (rows[0].length === 0) {
            return res.status(404).json({
                message: 'No addresses found for this customer'
            });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching addresses",
            error: error
        });
    }
};

addressController.updateAddress = async (req, res) => {
    const id_address = req.params.idaddress;
    const {
        city,
        state,
        postcode,
        country,
        address_type,
        telephone,
        info
    } = req.body;

    try {
        await pool.query('CALL UpdateAddress(?, ?, ?, ?, ?, ?, ?, ?)', [
            id_address,
            city,
            state,
            postcode,
            country,
            address_type,
            telephone,
            info
        ]);
        res.json({
            message: "Address updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the address",
            error: error
        });
    }
};

export default addressController;
import {pool} from '../database.js'

const customerController = {};

customerController.insertCustomer = async (req,res) => {
    const {name, lastname, email, password} = req.body
    try{
        const [rows] =  await pool.query('CALL AddCustomer(?, ?, ?, ?)', [name, lastname, email, password])
        res.send({
            id: rows.insertId,
            name, 
            lastname,
            email,
            password,
        })
    }catch(error){
        res.status(500).json({
            message: "Ocurrio un Error al registrar un nuevo usuario",
            data: error
        });
    }
    
    
};

customerController.getOneCustomer = async(req, res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM Customer WHERE id_customer = ?', [req.params.idcustomer])
        if(rows.length === 0){
            res.status(404).json({
                message: "Customer not found",
                error: error
            });
        }
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
    
    
}

customerController.getAllCustomers = async(req, res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM Customer')
        if(rows.length === 0){
            res.status(404).json({
                message: 'No Customer found'
            })
        }
        res.json(rows)
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
    
}

customerController.getCustomerId = async(req,res) =>{
    const {email, password} = req.body
    try{
        const [rows] =  await pool.query('CALL Login(?, ?)', [email, password])
        if (rows[0].length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        const customerId = rows[0][0].id_customer;
        res.json({ id_customer: customerId });
    }catch(error){
        res.json({
            message:"An error has ocurred",
            data:error
        });
    }
    
}


export default customerController;


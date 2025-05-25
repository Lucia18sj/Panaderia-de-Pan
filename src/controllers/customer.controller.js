import {pool} from '../database.js'
const customerController = {};

customerController.insertCustomer = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        const [rows] = await pool.query('CALL RegisterCustomer(?, ?, ?, ?)', [
            name,
            lastname,
            email,
            password
        ]);
        res.json({
            message: "Customer registered successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while registering the customer",
            error: error
        });
    }
};


customerController.loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    
    
    try {
        const [rows] = await pool.query('CALL LoginCustomer(?, ?)', [
            email,
            password
        ]);
        if (rows[0].length === 0) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }
        res.json(rows[0][0]);
        console.log('Respuesta del backend al hacer login:', rows[0][0]);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during login",
            error: error
        });
    }
};

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

customerController.getCustomerId = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('CALL Login(?, ?)', [email, password]);
        console.log("Resultado de la consulta a la BD:", rows);
        if (rows[0].length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        const customerId = rows[0][0].id_customer;
        const name = rows[0][0].name; 
        const lastname = rows[0][0].lastname; 
        req.session.customerId = customerId;
        req.session.name = name;
        req.session.email = email;
        req.session.lastname = lastname;

        console.log('Sesión después de login:', req.session);

        res.redirect('/');
    } catch (error) {
        res.json({
            message: "An error has occurred",
            data: error
        });
    }

};



customerController.getIdCustomer = async(req,res)=>{
    const customerId = req.session.id_customer;
    if (req.session.id_customer) {
        res.render('navBar', {customerId});
        res.json({ id_customer: req.session.id_customer});
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
};


export default customerController;


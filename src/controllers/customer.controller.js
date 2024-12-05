import {pool} from '../database.js'
const customerController = {};

customerController.insertCustomer = async (req,res) => {
    const {name, lastname, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Las contraseñas no coinciden.",
        });
    }
    try{
        const [rows] =  await pool.query('CALL AddCustomer(?, ?, ?, ?)', [name, lastname, email, password])
        res.render('../src/views/login.ejs');
    }catch(error){
        res.status(500).json({
            message: "Ocurrio un Error al registrar un nuevo usuario",
            data: error
        });
    }
};

customerController.getOneCustomer = async(req, res) =>{
    try{
        const [rows] = await pool.query('SELECT name, lastname, email FROM Customer WHERE id_customer = ?', [req.params.idcustomer])
        if(rows.length === 0){
            res.status(404).json({
                message: "Email o contraseña incorrectos",
                error: error
            });
        }
        const customerId = rows[0][0].id_customer;
        req.session.customerId = customerId;
        res.json({ id_customer: customerId });
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

customerController.getCustomerId = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('CALL Login(?, ?)', [email, password]);

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
        res.redirect(`/api/products`);
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


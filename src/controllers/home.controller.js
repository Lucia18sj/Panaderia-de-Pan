import { pool } from '../database.js';
const homeController = {};

homeController.getProductforHome = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Product WHERE is_active = 1 LIMIT 12;');

        if (rows.length === 0) {
            res.status(404).json({
                message: 'No products found'
            });
        } else {
            res.render('Home', { 
                products: rows, 
                name: req.session.name || 'Invitado',
                customerId: req.session.customerId || null,
                email: req.session.email,
                lastname: req.session.lastname,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error
        });
    }
};

homeController.login = async (req, res) => {
    if (req.session.name && req.session.customerId) {
        return res.redirect(`/myAccount/${req.session.customerId}`);
    }
    return res.render('login', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};

homeController.logout =  async(req,res) =>{
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/');
    });
};
homeController.register = async (req, res) => {
    return res.render('Register', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};

homeController.myAccount = async (req, res) => {
    return res.render('MiCuenta', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};


homeController.accountDetails = async (req, res) => {
    return res.render('DatosdeCuenta', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};

homeController.Direcciones = async (req, res) => {
    res.render('Direcciones', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};

homeController.us =async (req, res) => {
    res.render('Nosotros', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};
homeController.contact =async (req, res) => {
    res.render('Contactos', {
        name: req.session.name || 'Invitado',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
};
export default homeController;

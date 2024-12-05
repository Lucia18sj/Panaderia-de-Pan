import { pool } from '../database.js';
const homeController = {};


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
        res.redirect('/api/products');
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
    res.render('Direcciones');
};
export default homeController;

import { pool } from '../database.js';

const productController = {};

productController.getAllProductsforCard = async (req, res) => {
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

export default productController;
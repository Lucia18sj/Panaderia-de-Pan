import { pool } from '../database.js';

const productController = {};

productController.getAllFeaturedProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Product WHERE is_active = 1 LIMIT 12;');

        if (rows.length === 0) {
            res.status(404).json({
                message: 'No products found'
            });
        } else {
            res.json(rows)
        }
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error
        });
    }
};
productController.getProducts = async (req,res)=>{
    try {
        const [rows] = await pool.query('CALL GetAllProducts()');

        if (rows.length === 0) {
            res.status(404).json({
                message: 'No products found'
            });
        } else {
            res.json(rows)
        }
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error
        });
    }
}

productController.insertProduct = async (req, res) => {
const { id_category, product, price, description, image_url, is_active, stock, stock_min } = req.body;

try {
    const [rows] = await pool.query('CALL InsertProduct(?, ?, ?, ?, ?, ?, ?, ?)', [
    id_category, product, price, description, image_url, is_active, stock, stock_min
    ]);
    res.json({ message: 'Product inserted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error inserting product', error });
}
};

productController.updateProduct = async (req, res) => {
const { id_product } = req.params;
const { id_category, product, price, description, image_url, is_active, stock, stock_min } = req.body;

try {
    const [rows] = await pool.query('CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    id_product, id_category, product, price, description, image_url, is_active, stock, stock_min
    ]);
    res.json({ message: 'Product updated successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
}
};
  

export default productController;
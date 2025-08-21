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
productController.getProductById = async (req, res) => {
    const { id_product } = req.params;

    try {
        const [rows] = await pool.query('CALL getProductById(?)', [id_product]);

        const result = rows[0]; 

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: "An error has occurred",
            error: error
        });
    }
};

productController.createProduct = async (req, res) => {
    const {
        product,
        price,
        description,
        image_url,
        is_active,
        stock,
        stock_min,
        category
    } = req.body;

    try {
        await pool.query('CALL insert_product(?, ?, ?, ?, ?, ?, ?, ?)', [
            product,
            price,
            description,
            image_url,
            is_active,
            stock,
            stock_min,
            category
        ]);

        res.status(201).json({ message: 'Product inserted successfully' });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({
            message: 'An error occurred while inserting the product',
            error
        });
    }
};

productController.updateProduct = async (req, res) => {
    const { id_product } = req.params;
    const {
        product,
        price,
        description,
        image_url,
        is_active,
        stock,
        stock_min,
        category
    } = req.body;

    try {
        await pool.query('CALL update_product(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            id_product,
            product,
            price,
            description,
            image_url,
            is_active,
            stock,
            stock_min,
            category
        ]);

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            message: 'An error occurred while updating the product',
            error
        });
    }
};
productController.deleteProduct = async (req, res) => {
    const { id_product } = req.params;
    


    try {
        await pool.query('CALL delete_product(?)', [id_product]);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            message: 'An error occurred while deleting the product',
            error
        });
    }
};

export default productController;
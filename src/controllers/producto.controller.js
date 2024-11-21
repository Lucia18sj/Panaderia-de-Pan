import {pool} from '../database.js'

const productController = {};

productController.insertProduct = async (req,res) =>{
    const {product, price, stock, stock_min, category, description, image} =  req.body
    try{
        const [rows] = await pool.query('CALL AddProduct(?, ?, ?, ?, ?, ?, ?)', [product, price, stock, stock_min, category, description, image])
        res.send({
            id: rows.insertId,
            product, 
            price, 
            stock, 
            stock_min, 
            category, 
            description, 
            image
        })
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            data: error
        });
    }

};
productController.getOneProduct = async (req,res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM Product WHERE id_product = ?', [req.params.idProduct])
        if(rows.length === 0){
            res.status(404).json({
                message: "Product not found",
                error: error
            });
        }
        res.json(rows[0])
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
};

productController.getAllProducts = async (req,res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM Product')
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
};

productController.getOneProductforCard = async (req,res) =>{
    try{
        const [rows] = await pool.query('CALL GetOneProduct(?)', [req.params.idProduct])
        if(rows.length === 0){
            res.status(404).json({
                message: "Product not found",
                error: error
            });
        }
        const product = rows[0][0];
        res.json(product);
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
};

productController.getAllProductsforCard = async (req,res) =>{
    try{
        const [rows] = await pool.query('CALL GetProducts()')
        if(rows.length === 0){
            res.status(404).json({
                message: 'No Customer found'
            })
        }
        res.json(rows[0])
    }catch(error){
        res.status(500).json({
            message: "An error has ocurred",
            error: error
        })
    }
};

productController.UpdateOneProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { product, price, description, image_url, category, stock, stock_min } = req.body;

    try {
        await pool.query('CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?)', [
            idProduct,
            product,
            price,
            description,
            image_url,
            category,
            stock,
            stock_min,
        ]);

        res.json({
            message: "Product updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error,
        });
    }
};

// Desactivar un producto
productController.DeleteOneProduct = async (req, res) => {
    const { idProduct } = req.params;

    try {
        await pool.query('CALL DeactivateProduct(?)', [idProduct]);
        res.json({
            message: "Product deactivated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error,
        });
    }
};

export default productController;
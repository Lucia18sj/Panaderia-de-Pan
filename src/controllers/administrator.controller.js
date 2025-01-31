import { pool } from "../database.js";

const administratorController = {};

administratorController.administrator = async(req,res) =>{
    res.render('Administrador', {
        name: req.session.name || 'Administrador',
        customerId: req.session.customerId || null,
        email: req.session.email,
        lastname: req.session.lastname,
    });
}

administratorController.getAllProducts = async (req, res) => {
    console.log("Ejecutando getAllProducts");
    try {
        const [rows] = await pool.query('CALL GetProducts()');
        console.log("Datos obtenidos:", rows); 
        if (rows[0].length === 0) {
            return res.render('Inventario.ejs', { products: [], 
                name: req.session.name || 'Administrador',
                customerId: req.session.customerId || null,
                email: req.session.email,
                lastname: req.session.lastname, 
            }); 
        }
        return res.render('Inventario.ejs', 
            { products: rows[0],
            name: req.session.name || 'Administrador',
            customerId: req.session.customerId || null,
            email: req.session.email,
            lastname: req.session.lastname, 
         });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return res.status(500).render('error.ejs', { message: "Error al obtener los productos" });
    }
};

administratorController .getOneProduct = async (req, res) => {
    const { id_product } = req.params;
    try {
        const [rows] = await pool.query('CALL GetOneProduct(?)', [id_product]);
        if (rows[0].length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.render('editar_producto.ejs', { product: rows[0][0] }); // Redirige al formulario de edición
    } catch (error) {
        res.status(500).json({ message: "An error has occurred", error: error });
    }
};

administratorController .insertProduct = async (req, res) => {
    const { product, price, stock, stock_min, category, description, image } = req.body;
    try {
        const [rows] = await pool.query('CALL AddProduct(?, ?, ?, ?, ?, ?, ?)', [
            product, price, stock, stock_min, category, description, image
        ]);
        res.redirect('/api/administrator/inventario')
    } catch (error) {
        console.error("Error en insertProduct:", error);
        res.status(500).json({ message: "An error has occurred", error: error.message || error });
    }
}

administratorController .updateProduct = async (req, res) => {
    const { id_product } = req.params;
    const { product, price, description, stock, stock_min, image, category } = req.body;
    
    console.log('Datos recibidos:', req.body); // Verifica los valores recibidos
    
    try {
        await pool.query('CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?)', [
            id_product, product, price, description, image, category, stock, stock_min
        ]);
        res.redirect('/api/administrator/inventario');
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "An error has occurred", error: error.message || error });
    }
};
administratorController .deleteProduct = async (req, res) => {
    const { id_product } = req.params;
    try {
        await pool.query('CALL DeactivateProduct(?)', [id_product]);
        res.redirect('/api/administrator/inventario'); // Redirige a la página de inventario después de eliminar
    } catch (error) {
        res.status(500).json({ message: "An error has occurred", error: error });
    }
};

export default administratorController;
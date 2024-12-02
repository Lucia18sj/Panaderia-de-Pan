import { pool } from '../database.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    console.log("Ejecutando getAllProducts");  // Depuración
    try {
        // Llamada al procedimiento almacenado GetProducts()
        const [rows] = await pool.query('CALL GetProducts()');
        console.log("Datos obtenidos:", rows);  // Verifica los datos obtenidos

        // Verifica si hay productos en la respuesta
        if (rows[0].length === 0) {
            return res.render('Inventario.ejs', { products: [] });
        }

        // Renderiza la vista 'Inventario.ejs' con los productos obtenidos
        res.render('Inventario.ejs', { products: rows[0] });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
};

// Obtener un producto para editar
export const getOneProduct = async (req, res) => {
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

// Insertar un producto
export const insertProduct = async (req, res) => {
    const { product, price, stock, stock_min, category, description, image } = req.body;
    try {
        const [rows] = await pool.query('CALL AddProduct(?, ?, ?, ?, ?, ?, ?)', [
            product, price, stock, stock_min, category, description, image
        ]);
        res.redirect('/api/products/inventario'); // Redirige a Inventario después de agregar el producto
    } catch (error) {
        console.error("Error en insertProduct:", error);
        res.status(500).json({ message: "An error has occurred", error: error.message || error });
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    const { id_product } = req.params;
    const { product, price, description, stock, stock_min, image, category } = req.body;
    
    console.log('Datos recibidos:', req.body); // Verifica los valores recibidos
    
    try {
        await pool.query('CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?)', [
            id_product, product, price, description, image, category, stock, stock_min
        ]);
        res.redirect('/api/products/inventario');
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "An error has occurred", error: error.message || error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const { id_product } = req.params;
    try {
        await pool.query('CALL DeactivateProduct(?)', [id_product]);
        res.redirect('/api/products/inventario'); // Redirige a la página de inventario después de eliminar
    } catch (error) {
        res.status(500).json({ message: "An error has occurred", error: error });
    }
};

// Get Products for Cards
export const getAllProductsforCard = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL GetProductsCards()');
        if (rows.length === 0) {
            res.status(404).json({
                message: 'No Products found'
            });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error
        });
    }
};

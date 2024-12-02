import { pool } from "../database.js";

const cartController = {};

    cartController.addToCart = async (req, res) => {
        const { idCustomer, idProduct, quantity } = req.body;

        try {
            await pool.query("CALL AddToCart(?, ?, ?)", [idCustomer, idProduct, quantity]);
            res.json({ message: "Product added to cart" });
        } catch (error) {
            res.status(500).json({ message: "Error adding product to cart", error });
        }
    };

    cartController.getCart = async (req, res) => {
        const { idCustomer } = req.params;
        try {
            const [rows] = await pool.query("CALL GetCart(?)", [idCustomer]);
    
            // Si no hay productos en el carrito, devuelve un arreglo vacío
            if (!rows || rows[0].length === 0) {
                return res.render('carrito', { cartItems: [] }); // Renderiza carrito.ejs con un carrito vacío
            }
    
            // Devuelve los productos del carrito a la vista
            res.render('carrito', { cartItems: rows[0] });
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            res.status(500).send("Error al obtener el carrito");
        }
    };


    cartController.updateQuantity = async (req, res) => {
        const { idProduct, change } = req.params;
        const { idCustomer } = req.body; // Asegúrate de enviar este dato correctamente

        try {
            // Aquí va la lógica para actualizar la cantidad en el carrito
            await pool.query("CALL UpdateCartQuantity(?, ?, ?)", [idCustomer, idProduct, change]);

            res.json({ message: "Cantidad actualizada correctamente" });
        } catch (error) {
            console.error("Error al actualizar la cantidad:", error);
            res.status(500).send("Error al actualizar la cantidad");
        }
    };


    cartController.confirmSale = async (req, res) => {
        
    };
    
export default cartController;

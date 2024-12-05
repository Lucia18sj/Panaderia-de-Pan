import { pool } from "../database.js";

const cartController = {};

    cartController.addToCart = async (req, res) => {
        const { idCustomer, idProduct, quantity } = req.body;

        try {
            await pool.query("CALL AddToCart(?, ?, ?)", [idCustomer, idProduct, quantity]);
            res.redirect(`/api/cart/${idCustomer}`);
        } catch (error) {
            res.status(500).json({ message: "Error adding product to cart", error });
        }
    };

    cartController.getCart = async (req, res) => {
        const { idCustomer } = req.params;
        try {
            const [rows] = await pool.query("CALL GetCart(?)", [idCustomer]);
    
            res.render('carrito', {
                cartItems: rows[0] || [],
                customerId: idCustomer,
                name: req.session.name || 'Invitado',
                email: req.session.email,
                lastname: req.session.lastname,
            });
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            res.status(500).send("Error al obtener el carrito");
        }
    };


    cartController.updateQuantity = async (req, res) => {
        const { idProduct, change } = req.params;
        const { idCustomer } = req.body;

        try {
            await pool.query("CALL UpdateCartQuantity(?, ?, ?)", [idCustomer, idProduct, change]);

            res.json({ message: "Cantidad actualizada correctamente" });
        } catch (error) {
            console.error("Error al actualizar la cantidad:", error);
            res.status(500).send("Error al actualizar la cantidad");
        }
    };


    cartController.confirmSale = async (req, res) => {
        const { idCustomer } = req.params; // Se obtiene de la ruta
    
        try {
            if (!idCustomer) {
                return res.status(400).json({ message: "El idCustomer es obligatorio." });
            }
    
            // Obtener los productos del carrito
            const [rows] = await pool.query("CALL GetCart(?)", [idCustomer]);
    
            if (!rows || rows[0].length === 0) {
                return res.status(400).json({ message: "El carrito está vacío." });
            }
    
            // Calcular el total y configurar los productos
            const items = rows[0].map(item => ({
                title: item.product_name,
                quantity: item.quantity,
                unit_price: parseFloat(item.unit_price),
            }));
    
            // Configurar la preferencia
            const preference = {
                items: items,
                back_urls: {
                    success: "https://www.tusitio.com/success",
                    failure: "https://www.tusitio.com/failure",
                    pending: "https://www.tusitio.com/pending",
                },
                auto_return: "approved",
            };
    
            // Crear la preferencia de pago
            const response = await mercadopago.preferences.create(preference);
            const preferenceId = response.body.id;
    
            res.json({ preferenceId });
        } catch (error) {
            console.error("Error al procesar la venta:", error.message || error);
            res.status(500).json({ message: "Error al procesar la venta", error });
        }
    };
    
    
    
export default cartController;

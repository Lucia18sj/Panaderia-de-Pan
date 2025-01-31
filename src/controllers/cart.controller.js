
import { pool } from "../database.js";
/*import { MercadoPagoConfig, Preference } from 'mercadopago';
// Configuración de MercadoPago con tu access token
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-245424655621015-120115-b93c49f0b2738cc2431dd1e8741fbd83-2130642654' });
*/
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
/*
cartController.getCart = async (req, res) => {
  const { idCustomer } = req.params;

  try {
    const [rows] = await pool.query("CALL GetCart(?)", [idCustomer]);
    const cartItems = rows[0] || [];  

    if (cartItems.length === 0) {
      return res.render('carrito', {
        message: "Tu carrito está vacío",
        customerId: idCustomer,
      });
    }

    const items = cartItems.map(item => ({
      title: item.product,
      quantity: item.amount,
      unit_price: parseFloat(item.price), 
    }));

    const preference = new Preference(client);
    preference.back_urls = {
      success: 'https://i.pinimg.com/474x/7d/a8/55/7da855f3292df90242c37b25b0f7e6f8.jpg',
      failure: 'https://i.pinimg.com/474x/b3/d2/0d/b3d20dbc6864fe0c76f049e77f89d30f.jpg',
      pending: 'https://i.pinimg.com/236x/47/6c/16/476c16a0b9a99c3ee24960513c2f1cef.jpg',
    };
    preference.auto_return = 'approved';

    const preferenceData = {
      items,
    };

    // Crear la preferencia
    const response = await preference.create(preferenceData);
    const preferenceId = response.body.id; 

    res.render('carrito', {
      cartItems,
      customerId: idCustomer,
      name: req.session.name || 'Invitado',
      email: req.session.email,
      lastname: req.session.lastname,
      preferenceId,
    });

  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error al obtener el carrito");
  }
};*/
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
export default cartController;

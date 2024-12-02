import { pool } from "../database.js";
import mercadopago from "../config/mercadoPago.js";

const paymentController = {};


paymentController.processPayment = async (req, res) => {
    const { idSale } = req.body;

    try {
        
        const [saleRows] = await pool.query(
            "SELECT id_sale, total FROM Sale WHERE id_sale = ? AND status = 'Pendiente'",
            [idSale]
        );

        if (saleRows.length === 0) {
            return res.status(404).json({ message: "Sale not found or already processed" });
        }

        const total = saleRows[0].total;

        const preference = {
            items: [
                {
                    title: `Compra en Panadería`,
                    unit_price: total,
                    quantity: 1,
                },
            ],
            back_urls: {
                success: "https://pbs.twimg.com/media/F1cDhPZXsAI0-85.jpg",
                failure: "https://i.pinimg.com/474x/b3/d2/0d/b3d20dbc6864fe0c76f049e77f89d30f.jpg",
                pending: "https://img.freepik.com/vector-premium/diseno-vectorial-pago-pendiente-estilo-icono_822882-18191.jpg",
            },
            auto_return: "approved",
            external_reference: idSale.toString(),
        };

        const response = await mercadopago.preferences.create(preference);

        res.json({
            id: response.body.id,
            init_point: response.body.init_point,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error processing payment",
            error,
        });
    }
};


paymentController.paymentCallback = async (req, res) => {
    const { status, external_reference, payment_id } = req.query;

    try {
        
        const [saleRows] = await pool.query(
            "SELECT * FROM Sale WHERE id_sale = ?",
            [external_reference]
        );

        if (saleRows.length === 0) {
            return res.status(404).json({ message: "Sale not found" });
        }

        const sale = saleRows[0];
        
        
        let paymentStatus = 'Pendiente';
        if (status === 'approved') {
            paymentStatus = 'Completado';
        } else if (status === 'rejected') {
            paymentStatus = 'Fallido';
        }

        await pool.query(
            "UPDATE Sale SET status = ?, payment_status = ?, payment_id = ? WHERE id_sale = ?",
            [paymentStatus, status, payment_id, external_reference]
        );

        res.json({ message: "Payment status updated", status });
    } catch (error) {
        res.status(500).json({
            message: "Error processing payment callback",
            error,
        });
    }
};

export default paymentController;

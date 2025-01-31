import { pool } from "../database";

const saleController = {};

saleController.createSale = async (req, res) => {
    const { idCustomer, products } = req.body;
    try {
        // Registrar la venta en la base de datos
        const total = products.reduce((total, item) => total + item.price * item.quantity, 0);
        const [saleResult] = await pool.query(
            `INSERT INTO Sale (id_customer, sale_date, total, status) VALUES (?, NOW(), ?, 'Pendiente')`,
            [idCustomer, total]
        );

        const saleId = saleResult.insertId;

        // Registrar los detalles de la venta
        const saleDetails = products.map((product) => [
            saleId,
            product.idProduct,
            product.quantity,
            product.price,
        ]);

        await pool.query(
            `INSERT INTO SaleDetail (id_sale, id_product, amount, price) VALUES ?`,
            [saleDetails]
        );

        res.json({ message: "Venta creada con éxito", saleId });

    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ message: "Error al crear la venta", error });
    }
};

saleController.confirmSale = async (req, res) => {
    const { paymentId, status, idSale, amount } = req.body;

    try {
        // Actualizar el estado de la venta
        await pool.query(
            `UPDATE Sale SET status = ? WHERE id_sale = ?`,
            [status === "approved" ? "Completado" : "Cancelado", idSale]
        );

        // Registrar el pago
        await pool.query(
            `INSERT INTO Payment (id_sale, payment_method, payment_status, payment_date, amount) VALUES (?, ?, ?, NOW(), ?)`,
            [idSale, "Mercado Pago", status, amount]
        );

        res.json({ message: "Venta confirmada exitosamente" });

    } catch (error) {
        console.error("Error al confirmar la venta:", error);
        res.status(500).json({ message: "Error al confirmar la venta", error });
    }
};

export default saleController;

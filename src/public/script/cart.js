async function loadCart() {
    const customerId = 1;
    try {
        const response = await fetch(`/api/cart/${customerId}`);
        if (!response.ok) throw new Error("Error fetching cart items");

        const cartItems = await response.json();
        console.log("Carrito cargado:", cartItems);

        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");

        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart-message">Tu carrito está vacío.</p>`;
            totalPriceElement.textContent = "$0.00";
            return;
        }

        // Si hay productos, renderizarlos
        let totalPrice = 0;

        cartItems.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="https://via.placeholder.com/100" alt="${item.product}">
                <div class="item-details">
                    <p class="item-name">${item.product}</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <span class="quantity">${item.amount}</span>
                    </div>
                </div>
                <p class="item-total">$${item.total.toFixed(2)}</p>
            `;

            totalPrice += item.total;

            // Agregar el elemento al contenedor
            cartItemsContainer.appendChild(cartItem);
        });

        // Actualizar el total
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

document.getElementById("checkoutButton").addEventListener("click", async () => {
    const idCustomer = 1; // Cambia esto para obtener dinámicamente el idCustomer

    try {
        // Llamar al endpoint confirmSale con el idCustomer en la URL
        const response = await fetch(`/api/cart/confirm/${idCustomer}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.preferenceId) {
            // Redirigir al usuario a la página de pago de Mercado Pago
            window.location.href = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${data.preferenceId}`;
        } else {
            alert("Error al crear la preferencia de pago");
        }
    } catch (error) {
        console.error("Error al procesar la compra:", error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buy-button').addEventListener('click', handleCheckout);
});




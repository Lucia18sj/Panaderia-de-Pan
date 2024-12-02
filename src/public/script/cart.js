async function loadCart() {
    const customerId = 1; // Cambia esto al ID del cliente actual
    try {
        const response = await fetch(`/api/cart/${customerId}`);
        if (!response.ok) throw new Error("Error fetching cart items");

        const cartItems = await response.json();
        console.log("Carrito cargado:", cartItems);  // Verifica los datos del carrito

        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");

        // Limpiar el contenedor antes de agregar los productos
        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {
            // Si el carrito está vacío, mostrar un mensaje
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
                        <button class="quantity-btn" data-id="${item.id_product}" data-change="-1" onclick="updateQuantity(this)">-</button>
                        <span class="quantity">${item.amount}</span>
                        <button class="quantity-btn" data-id="${item.id_product}" data-change="1" onclick="updateQuantity(this)">+</button>
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

async function updateQuantity(idProduct, change) {
    const customerId = 1; // Asumimos que el ID del cliente está configurado
    try {
        const response = await fetch(`/api/cart/update/${idProduct}/${change}`, {
            method: 'PUT', // Asegúrate de que estás usando el método correcto
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Asegúrate de que la respuesta es JSON
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json(); // Esto debería ser un objeto JSON
        console.log('Cantidad actualizada:', data);
        loadCart(); // Recargar el carrito después de actualizar la cantidad
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
    }
}


async function handleCheckout() {
    const customerId = 1; // Cambia esto por el ID del cliente
    try {
        // Realiza la solicitud para crear la preferencia de pago en el backend
        const response = await fetch('/api/cart/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCustomer: customerId }),
        });

        const data = await response.json();
        const preferenceId = data.preferenceId;

        // Cargar el botón de Mercado Pago usando el preferenceId
        if (preferenceId) {
            Mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '#checkout-btn-container', // Contenedor donde se mostrará el botón
                    label: 'Pagar con Mercado Pago',
                }
            });
        }
    } catch (error) {
        console.error('Error al procesar la compra:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buy-button').addEventListener('click', handleCheckout);
});




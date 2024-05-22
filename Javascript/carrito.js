
document.addEventListener('DOMContentLoaded', function() {
    function mostrarCarrito() {
        // Recuperar los elementos seleccionados del almacenamiento local
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

        // Mostrar los elementos seleccionados en la página si hay alguno
        const seleccionCarrito = document.getElementById('seleccion-carrito');
        if (selectedItems && selectedItems.length > 0) {
            // Limpiar el contenido anterior del carrito
            seleccionCarrito.innerHTML = '';
            let total = 0; // Variable para calcular el total

            selectedItems.forEach(item => {
                const price = parseFloat(item.price.replace('$', ''));
                const subtotal = price * item.quantity;

                const itemElement = document.createElement('div');
                itemElement.classList.add('seleccion-item');
                itemElement.innerHTML = `
                    <p>Nombre: ${item.name}</p>
                    <p>Especie: ${item.species}</p>
                    <p>Estado: ${item.status}</p>
                    <p>Precio: ${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>
                    <button class="btn-delete">Borrar</button>
                `;
                seleccionCarrito.appendChild(itemElement);

                const deleteButton = itemElement.querySelector('.btn-delete');
                deleteButton.addEventListener('click', function() {
                    // Eliminar el elemento seleccionado del arreglo y del almacenamiento local
                    const index = selectedItems.indexOf(item);
                    if (index > -1) {
                        selectedItems.splice(index, 1);
                        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
                        mostrarCarrito();
                    }
                });

                // Actualizar el total después de añadir el elemento
                total += subtotal;
            });

            // Mostrar el total
            const totalElement = document.createElement('div');
            totalElement.classList.add('total');
            totalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
            seleccionCarrito.appendChild(totalElement);

        } else {
            // Si no hay elementos mostrar alerta con SweetAlert
            Swal.fire("¡Alerta!", "No hay elementos seleccionados en el carrito.", "warning")
                .then((value) => {
                    if (value) {
                        window.history.back();
                    }
                });
        }

        const comprarButton = document.getElementById('comprar-btn');
        comprarButton.addEventListener('click', function() {
            // Mostrar alerta con SweetAlert
            Swal.fire("¡Éxito!", "¡Compra realizada con éxito!", "success")
                .then((value) => {
                    if (value) {
                        window.history.back();
                    }
                });
        });
    }

    // Llamar a la función para mostrar el carrito
    mostrarCarrito();
});

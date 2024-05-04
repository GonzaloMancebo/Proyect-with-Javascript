document.addEventListener('DOMContentLoaded', function() {
    function mostrarCarrito() {
        // Recuperar los elementos seleccionados del almacenamiento local
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

        // Mostrar los elementos seleccionados en la página si hay alguno
        const seleccionCarrito = document.getElementById('seleccion-carrito');
        if (selectedItems && selectedItems.length > 0) {
            // Limpiar el contenido anterior del carrito
            seleccionCarrito.innerHTML = '';

            selectedItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('seleccion-item');
                itemElement.innerHTML = `
                    <p>Nombre: ${item.name}</p>
                    <p>Especie: ${item.species}</p>
                    <p>Estado: ${item.status}</p>
                    <p>Género: ${item.gender}</p>
                    <p>Origen: ${item.origin.name}</p>
                    <p>Cantidad: ${item.quantity}</p>
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
            });
        } else {
            // Si no hay elementos mostrar alerta
            alert('No hay elementos seleccionados en el carrito.');
            window.history.back();
        }

        const comprarButton = document.getElementById('comprar-btn');
        comprarButton.addEventListener('click', function() {
            alert('¡Compra realizada con éxito!');
            window.history.back();
        });
    }

    // Llamar a la función para mostrar el carrito
    mostrarCarrito();
});

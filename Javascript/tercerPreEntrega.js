document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    let selectedItems = [];

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const characters = data.results;

            const characterHTML = characters.map(character => {
                return `
                    <div class="character">
                        <img src="${character.image}" alt="${character.name}">
                        <h4>${character.name}</h4>
                        <p>${character.species}</p>
                        <p>${character.status}</p>
                        <p>${character.gender}</p>
                        <p>${character.origin.name}</p>
                        <button type="button" class="more">+</button>
                        <p class="counter">0</p> 
                        <button type="button" class="less">-</button>
                    </div>
                `;
            }).join('');

            document.getElementById('character').innerHTML = characterHTML;

            // Obtener todos los botones de suma y resta
            const moreButtons = document.querySelectorAll('.more');
            const lessButtons = document.querySelectorAll('.less');

            // Agregar eventos clic a los botones de suma
            moreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Valor actual
                    let valueElement = button.parentElement.querySelector('.counter');
                    let value = parseInt(valueElement.textContent);
                    // Incrementar el valor
                    value += 1;
                    // Mostrar el nuevo valor
                    valueElement.textContent = value;
                    // Actualizar el contador del carrito
                    updateCarritoCount();
                });
            });

            // Agregar eventos clic a los botones de resta
            lessButtons.forEach(button => {
                button.addEventListener('click', function() {
                    let valueElement = button.parentElement.querySelector('.counter');
                    let value = parseInt(valueElement.textContent);
                    if (value > 0) {
                        value -= 1;
                        valueElement.textContent = value;
                        // Actualizar el contador del carrito
                        updateCarritoCount();
                    }
                });
            });
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));

    // Función para manejar el clic en el carrito
    function handleCarritoClick() {
        // Guardar los elementos seleccionados en el almacenamiento local
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        // Redirigir a la otra página
        window.location.href = 'carrito.html';
    }

    // Función para actualizar el contador del carrito
    function updateCarritoCount() {
        const counters = document.querySelectorAll('.counter');
        let totalCount = 0;
        selectedItems = []; // Limpiar arreglo
        counters.forEach(counter => {
            totalCount += parseInt(counter.textContent);
            const character = counter.parentElement;
            const count = parseInt(counter.textContent);
            if (count > 0) {
                selectedItems.push({
                    name: character.querySelector('h4').textContent,
                    species: character.querySelector('p:nth-of-type(2)').textContent,
                    status: character.querySelector('p:nth-of-type(3)').textContent,
                    gender: character.querySelector('p:nth-of-type(4)').textContent,
                    origin: character.querySelector('p:nth-of-type(5)').textContent,
                    quantity: count
                });
            }
        });
        document.getElementById('carrito-count').textContent = totalCount;
    }

    // Asignar handleCarritoClick al evento onclick del elemento del carrito
    document.getElementById('carrito').onclick = handleCarritoClick;
});

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://rickandmortyapi.com/api/character';

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

            // Agregar HTML generado al elemento con id 'character'
            document.getElementById('character').innerHTML = characterHTML;

            // Obtener todos los botones de suma y resta
            const moreButtons = document.querySelectorAll('.more');
            const lessButtons = document.querySelectorAll('.less');

            // Agregar eventos clic a los botones de suma
            moreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Obtener el valor actual
                    let valueElement = button.parentElement.querySelector('.counter');
                    let value = parseInt(valueElement.textContent);
                    // Incrementar el valor
                    value += 1;
                    // Mostrar el nuevo valor
                    valueElement.textContent = value;
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
                    }
                });
            });
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
});

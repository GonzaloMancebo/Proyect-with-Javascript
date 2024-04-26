const apiUrl = 'https://rickandmortyapi.com/api/character';

let nombreUsuario = "";
let edadUsuario = "";
let emailUsuario = "";

nombreUsuario = prompt("Por favor, ingresa tu nombre:");
if (nombreUsuario === null) {
    alert("Has cancelado el ingreso de datos. La página se recargará para intentarlo de nuevo.");
    location.reload(); 
}

// Solicitar al usuario su edad
edadUsuario = prompt("Hola " + nombreUsuario + ", ¿cuál es tu edad?");
if (edadUsuario === null) {
    alert("Has cancelado el ingreso de datos. La página se recargará para intentarlo de nuevo.");
    location.reload(); 
}

emailUsuario = prompt("¿Cuál es tu correo electrónico?");
if (emailUsuario === null) {
    alert("Has cancelado el ingreso de datos. La página se recargará para intentarlo de nuevo.");
    location.reload(); 
}

let datosCorrectos = confirm(`Nombre: ${nombreUsuario}\nEdad: ${edadUsuario}\nCorreo electrónico: ${emailUsuario}\n\n¿Son estos datos correctos?`);
if (!datosCorrectos) {
    alert("Los datos ingresados no son correctos. La página se recargará para intentarlo de nuevo.");
    location.reload(); 
}

console.log("Datos confirmados:");
console.log("Nombre:", nombreUsuario);
console.log("Edad:", edadUsuario);
console.log("Correo electrónico:", emailUsuario);


function updateCart() {
    const characters = document.querySelectorAll('.character');
    let totalItems = 0;
    characters.forEach(character => {
        const counter = character.querySelector('.counter');
        const value = parseInt(counter.textContent);
        totalItems += value;
    });
    cartIcon.setAttribute('data-badge', totalItems);
}


fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const characters = data.results;

        const characterHTML = characters.map((character, index) => {
            return `
                <div class="character" data-index="${index}">
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

        const moreButtons = document.querySelectorAll('.more');
        const lessButtons = document.querySelectorAll('.less');

        moreButtons.forEach(button => {
            button.addEventListener('click', function() {
                let valueElement = button.parentElement.querySelector('.counter');
                let value = parseInt(valueElement.textContent);
                value += 1;
                valueElement.textContent = value;
                updateCart(); // Llamar a updateCart() después de cambiar el valor del contador
            });
        });
        
        lessButtons.forEach(button => {
            button.addEventListener('click', function() {
                let valueElement = button.parentElement.querySelector('.counter');
                let value = parseInt(valueElement.textContent);
                if (value > 0) {
                    value -= 1;
                    valueElement.textContent = value;
                    updateCart(); // Llamar a updateCart() después de cambiar el valor del contador
                } else {
                    alert('El carrito no puede tener menos de cero elementos');
                }
            });
        });
        
    })
    .catch(error => {
        alert('Error al obtener datos de la API');
        console.log('Error al obtener datos de la API:', error);
    });


   
const cartIcon = document.querySelector('.fake-cart .material-symbols-outlined');
cartIcon.addEventListener('click', () => {
    const personajesSeleccionados = obtenerPersonajesSeleccionados();
    
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = ''; 
    carritoContainer.appendChild(mostrarCarrito(personajesSeleccionados));
});


function obtenerPersonajesSeleccionados() {
    const characters = document.querySelectorAll('.character');
    const personajesSeleccionados = [];
    characters.forEach(character => {
        const counter = character.querySelector('.counter');
        const value = parseInt(counter.textContent);
        if (value > 0) {
            const name = character.querySelector('h4').textContent;
            const species = character.querySelector('p:nth-child(3)').textContent;
            const status = character.querySelector('p:nth-child(4)').textContent;
            const gender = character.querySelector('p:nth-child(5)').textContent;
            const origin = character.querySelector('p:nth-child(6)').textContent;
            const image = character.querySelector('img').src;
            personajesSeleccionados.push({ name, species, status, gender, origin, image });
        }
    });
    return personajesSeleccionados;
}

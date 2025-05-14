function obtenerInformacio() {
    var name = document.getElementById('nombre').value;
    var description = document.getElementById('descripcion').value;
    var room = document.getElementById('numCuartos').value;
    var bathroom = document.getElementById('numBanos').value;
    var garage = document.getElementById('numGaraje').value;
    var price = document.getElementById('precio').value;
    var properties = JSON.parse(localStorage.getItem('properties')) || [];

    var property = {
        name: name,
        description: description,
        room: room,
        bathroom: bathroom,
        garage: garage,
        price: price
    };
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    Swal.fire({
        icon: "success",
        title: "Solicitud registrada",
        showConfirmButton: false,
        timer: 2000
    });
    Clean();

}
function Clean() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('numCuartos').value = '';
    document.getElementById('numBanos').value = '';
    document.getElementById('numGaraje').value = '';
    document.getElementById('precio').value = '';
}


document.addEventListener('DOMContentLoaded', function () {

    var properties = JSON.parse(localStorage.getItem('properties')) || [];
    var propertyListContainer = document.getElementById('property-list');

    function createPropertyCard(property, index) {
        return `
        <article class="tarjeta">
                            <picture>
                                <source srcset="./img/anuncio${index}.jpg" type="image/jpeg">
                                <img loading="lazy" src="./img/anuncio${index}.jpg" alt="anuncio">
                            </picture>
                            <div class="contenido-tarjeta">
                                <h3>${property.name}</h3>
                                <p>${property.description}</p>
                                <p> <span>$</span> ${property.price}</p>
                                <ul class="property-list">
                                    <li>
                                        <img src="./img/icono_dormitorio.svg">
                                        <strong>Cuartos</strong>
                                        <span> ${property.room}</span>
                                    </li>
                                    <li>
                                        <img src="./img//icono_wc.svg">
                                        <strong>Baños</strong>
                                        <span>${property.bathroom}</span>

                                    </li>
                                    <li>

                                        <img src="./img/icono_estacionamiento.svg">
                                        <strong>Garajes</strong>
                                        <span>${property.garage}</span>

                                    </li>
                                </ul>
                            </div>
                        </article>
  `;
    }

    properties.slice(0, 10).forEach((property, index) => {
        var propertyCard = createPropertyCard(property, index + 1); // El índice comienza desde 1
        propertyListContainer.innerHTML += propertyCard;
    });

    // Función para mostrar todas las propiedades
    function showAllProperties() {
        propertyListContainer.innerHTML = '';
        properties.slice(0, 12).forEach((property, index) => {
            var propertyCard = createPropertyCard(property, index + 1);
            propertyListContainer.innerHTML += propertyCard;
        });
    }

    // Función para mostrar propiedades que coincidan con la búsqueda
    function searchProperties() {
        var searchTerm = document.getElementById('busqueda').value.toLowerCase();
        var filteredProperties = properties.filter(property => {
            return property.name.toLowerCase().includes(searchTerm) || property.description.toLowerCase().includes(searchTerm);
        });
        propertyListContainer.innerHTML = '';
        filteredProperties.forEach((property, index) => {
            var propertyCard = createPropertyCard(property, index + 1);
            propertyListContainer.innerHTML += propertyCard;
        });
    }

    // Mostrar todas las propiedades al cargar la página
    showAllProperties();

    // Agregar evento de clic al botón de búsqueda
    document.getElementById('btn-buscar').addEventListener('click', function () {
        searchProperties();
    });

});

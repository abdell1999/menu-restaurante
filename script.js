document.addEventListener('DOMContentLoaded', function () {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu');
            for (const seccion in data) {
                const seccionHTML = `
                    <section>
                        <h2>${seccion.toUpperCase()}</h2>
                        <div class="menu-grid">
                            ${data[seccion].map(item => `
                                <div class="item">
                                    <img src="${item.imagen}" alt="${item.nombre}">
                                    <div class="item-content">
                                        <h3>${item.nombre}</h3>
                                        <p>${item.descripcion}</p>
                                        <span class="precio">${item.precio}€</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                `;
                menuContainer.innerHTML += seccionHTML;
            }
        })
        .catch(error => console.error('Error cargando el menú:', error));
});
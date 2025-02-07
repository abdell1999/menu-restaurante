document.addEventListener('DOMContentLoaded', function () {
    const toggleDarkModeIcon = document.getElementById('toggleDarkMode');
    const toggleImagesIcon = document.getElementById('toggleImages');
    const menuContainer = document.getElementById('menu');

    // Modo oscuro
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
        toggleDarkModeIcon.classList.remove('fa-moon');
        toggleDarkModeIcon.classList.add('fa-sun');
    }

    toggleDarkModeIcon.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleDarkModeIcon.classList.toggle('fa-moon');
        toggleDarkModeIcon.classList.toggle('fa-sun');
    });

    // Ocultar imágenes
    toggleImagesIcon.addEventListener('click', () => {
        const images = document.querySelectorAll('.item img');
        images.forEach(img => {
            img.style.display = img.style.display === 'none' ? 'block' : 'none';
        });
        toggleImagesIcon.classList.toggle('fa-eye');
        toggleImagesIcon.classList.toggle('fa-eye-slash');
    });

    // Cargar menú
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
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
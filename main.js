document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. SCROLL SUAVE PARA ENLACES INTERNOS
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hostname === location.hostname && this.pathname === location.pathname) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ----------------------------------------------------
    // 2. STICKY HEADER con Efecto Visual
    // ----------------------------------------------------
    const header = document.querySelector('.main-header');
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // ----------------------------------------------------
    // 3. LÓGICA DE LA BARRA DE BÚSQUEDA
    // ----------------------------------------------------
    
    // Base de datos de las páginas de la wiki
    const wikiPages = [
        { url: 'experiencia-usuario.html', keywords: ['ux', 'experiencia de usuario', 'user experience'] },
        { url: 'diseno-web.html', keywords: ['diseño web', 'web', 'html', 'css', 'responsive'] },
        { url: 'design-thinking.html', keywords: ['design thinking', 'pensamiento de diseño', 'idear', 'prototipar'] },
        { url: 'diseno-centrado-usuario.html', keywords: ['dcu', 'diseño centrado en el usuario', 'ucd'] },
        { url: 'diseno-interaccion.html', keywords: ['ixd', 'diseño de interacción', 'interaccion'] },
        { url: 'arquitectura-informacion.html', keywords: ['ia', 'arquitectura de la informacion', 'informacion'] },
        { url: 'diseno-navegacion.html', keywords: ['navegacion', 'diseño de navegación', 'menu', 'flujo'] },
        { url: 'diseno-visual.html', keywords: ['diseño visual', 'visual', 'colores', 'tipografia'] },
        { url: 'glosario.html', keywords: ['glosario', 'terminos', 'definicion', 'diccionario'] },
        { url: 'contacto.html', keywords: ['contacto', 'ayuda', 'formulario', 'reportar'] }
    ];

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchError = document.getElementById('search-error');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene que la página se recargue
        searchError.style.display = 'none'; // Oculta errores previos
        
        const query = searchInput.value.trim().toLowerCase();
        if (query === '') return; // No hacer nada si está vacío

        let pageFound = null;

        // Lógica de búsqueda: revisa si la consulta del usuario incluye alguna palabra clave
        for (const page of wikiPages) {
            if (page.keywords.some(keyword => query.includes(keyword))) {
                pageFound = page;
                break;
            }
        }

        if (pageFound) {
            // ¡Encontrado! Redirigir a la página
            window.location.href = pageFound.url;
        } else {
            // ¡No encontrado! Mostrar error y enlace a Google
            const googleQuery = encodeURIComponent(query);
            searchError.innerHTML = `Concepto no encontrado. ¿Quieres buscar en Google: 
                                     <a href="https://www.google.com/search?q=${googleQuery}" target="_blank" rel="noopener noreferrer">${query}</a>?`;
            searchError.style.display = 'block';
        }
    });
});

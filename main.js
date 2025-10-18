document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. SCROLL SUAVE PARA ENLACES INTERNOS
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo aplica a enlaces internos dentro de la misma página 
            if (this.hostname === location.hostname && this.pathname === location.pathname) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Smooth scroll
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
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
});
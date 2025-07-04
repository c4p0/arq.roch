document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de navegación
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    
    // Función para mostrar una sección
    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === id) {
                setTimeout(() => {
                    section.classList.add('active');
                }, 10);
            }
        });
        
        // Recolocar los botones de navegación
        repositionNavButtons();
    }
    
    // Función para recolocar los botones
    function repositionNavButtons() {
        const nav = document.getElementById('navigation');
        const activeIndex = Array.from(navButtons).findIndex(btn => 
            btn.getAttribute('data-href') === document.querySelector('.content-section.active')?.id
        );
        
        navButtons.forEach((btn, index) => {
            if (index < activeIndex) {
                btn.style.transform = 'translateY(-100%)';
            } else if (index > activeIndex) {
                btn.style.transform = 'translateY(100%)';
            } else {
                btn.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Event listeners para los botones
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection(this.getAttribute('data-href'));
        });
    });
    
    // Botón home
    document.getElementById('home').addEventListener('click', function() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        // Restablecer posición de los botones
        navButtons.forEach(btn => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Inicializar
    showSection('studiokos'); // Mostrar la primera sección por defecto
});
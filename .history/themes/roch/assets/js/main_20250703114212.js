document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const sectionsContainer = document.querySelector('.sections-container');
    
    // Posición inicial
    let basePosition = 0;
    
    // Mostrar sección
    function showSection(id) {
        // Resetear todos los elementos
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = '';
            btn.style.position = '';
            btn.style.top = '';
        });
        
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.transform = '';
        });
        
        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => 
            btn.getAttribute('data-href') === id
        );
        
        if (!targetButton) return;
        
        // Calcular desplazamiento
        const targetIndex = Array.from(navButtons).indexOf(targetButton);
        const targetRect = targetButton.getBoundingClientRect();
        basePosition = targetRect.top;
        
        // Aplicar transformaciones
        navButtons.forEach((button, index) => {
            if (index < targetIndex) {
                // Elementos arriba del seleccionado
                const offset = (targetIndex - index) * -35; // 35px por elemento
                button.style.position = 'relative';
                button.style.top = `${offset}px`;
            } else if (index > targetIndex) {
                // Elementos abajo del seleccionado
                const offset = (index - targetIndex) * 35; // 35px por elemento
                button.style.position = 'relative';
                button.style.top = `${offset}px`;
            } else {
                // Elemento seleccionado
                button.classList.add('active');
            }
        });
        
        // Mostrar sección
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            sectionsContainer.style.top = `${targetRect.bottom + 20}px`;
        }
    }
    
    // Event listeners
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection(this.getAttribute('data-href'));
        });
    });
    
    homeBtn.addEventListener('click', function() {
        // Resetear todo
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = '';
            btn.style.position = '';
            btn.style.top = '';
        });
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        sectionsContainer.style.top = '';
    });
    
    // ... resto del código (vista previa de proyectos) ...
    
    // Inicializar
    showSection('studiokos');
});
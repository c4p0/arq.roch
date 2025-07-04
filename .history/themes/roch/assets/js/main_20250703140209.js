document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const sectionsContainer = document.querySelector('.sections-container');
    const navigation = document.getElementById('navigation');
    
    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    
    // Posiciones originales de los botones
    const originalPositions = [];
    navButtons.forEach(button => {
        originalPositions.push({
            top: button.offsetTop,
            left: button.offsetLeft
        });
    });
    
    // Animación para mover elementos
    function animateButtonMovement(targetIndex) {
        navButtons.forEach((button, index) => {
            // Eliminar animaciones previas
            button.style.animation = '';
            button.style.transform = '';
            
            // Calcular desplazamiento
            if (index < targetIndex) {
                // Botones superiores no se mueven
                button.style.transform = '';
            } else if (index > targetIndex) {
                // Botones inferiores se mueven como bloque
                const offset = index - targetIndex;
                button.style.setProperty('--offset', offset);
                button.style.animation = `moveDown 0.4s ease forwards`;
            } else {
                // Elemento seleccionado
                button.classList.add('active');
            }
        });
    }
    
    // Resetear posición de los botones
    function resetButtonPositions() {
        navButtons.forEach((button, index) => {
            button.style.animation = '';
            button.style.transform = '';
            button.classList.remove('active');
        });
    }
    
    // Mostrar sección
    function showSection(id) {
        // Ocultar todas las secciones
        sections.forEach(section => section.classList.remove('active'));
        
        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => 
            btn.getAttribute('data-href') === id
        );
        
        if (!targetButton) return;
        
        // Calcular índice del botón
        const targetIndex = Array.from(navButtons).indexOf(targetButton);
        
        // Aplicar animación a los botones
        animateButtonMovement(targetIndex);
        
        // Mostrar sección justo debajo del botón seleccionado
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Posicionar la sección
            const buttonRect = targetButton.getBoundingClientRect();
            targetSection.style.top = `${buttonRect.bottom + 10}px`;
            targetSection.style.left = `${buttonRect.left}px`;
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        resetButtonPositions();
    }
    
    // Event listeners
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-href');
            
            // Si ya está activo, ocultar
            if (this.classList.contains('active')) {
                hideAllSections();
            } else {
                showSection(sectionId);
            }
        });
    });
    
    // Botón home
    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            hideAllSections();
        });
    }
    
    // Vista previa de proyectos
    const projects = document.querySelectorAll('.project');
    const preview = document.getElementById('project_preview');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                preview.querySelector('.client').textContent = this.dataset.client || '';
                preview.querySelector('.categories').textContent = this.dataset.cats || '';
                preview.querySelector('.tags').textContent = this.dataset.tags || '';
                preview.querySelector('.status').textContent = this.dataset.status || '';
                preview.querySelector('.first-img').src = this.dataset.firstimg || '';
                
                preview.style.display = 'block';
            }
        });
        
        project.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                preview.style.display = 'none';
            }
        });
    });
});
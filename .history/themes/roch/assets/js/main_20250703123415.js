document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const sectionsContainer = document.querySelector('.sections-container');
    
    // Posición inicial
    let originalPositions = [];
    
    // Guardar posiciones originales
    navButtons.forEach(button => {
        originalPositions.push(button.getBoundingClientRect().top);
    });
    
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
        });
        
        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => 
            btn.getAttribute('data-href') === id
        );
        
        if (!targetButton) return;
        
        // Calcular desplazamiento
        const targetIndex = Array.from(navButtons).indexOf(targetButton);
        
        // Aplicar transformaciones a los botones
        navButtons.forEach((button, index) => {
            if (index < targetIndex) {
                // Elementos arriba del seleccionado
                const offset = (targetIndex - index) * -25; // 25px por elemento
                button.style.position = 'relative';
                button.style.top = `${offset}px`;
            } else if (index > targetIndex) {
                // Elementos abajo del seleccionado
                const offset = (index - targetIndex) * 25; // 25px por elemento
                button.style.position = 'relative';
                button.style.top = `${offset}px`;
            } else {
                // Elemento seleccionado
                targetButton.classList.add('active');
            }
        });
        
        // Mostrar sección justo debajo del botón seleccionado
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Posicionar el contenedor de secciones
            const targetRect = targetButton.getBoundingClientRect();
            sectionsContainer.style.top = `${targetRect.bottom}px`;
            sectionsContainer.style.left = `${targetRect.left}px`;
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
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
        sectionsContainer.style.left = '';
    }
    
    // Event listeners
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle: si ya está activo, ocultar
            if (this.classList.contains('active')) {
                hideAllSections();
            } else {
                showSection(this.getAttribute('data-href'));
            }
        });
    });
    
    homeBtn.addEventListener('click', function() {
        hideAllSections();
    });
    
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
    
    // Inicializar
    showSection('studiokos');
});
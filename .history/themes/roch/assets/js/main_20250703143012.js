document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navigation = document.getElementById('navigation');
    const app = document.getElementById('app');
    
    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    
    // Mostrar sección
    function showSection(id) {
        // Ocultar todas las secciones
        sections.forEach(section => section.classList.remove('active'));
        
        // Quitar clases de desplazamiento y activo
        navButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.remove('move-down-block');
            button.style.removeProperty('--move-down');
            button.style.transform = '';
        });
        
        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => 
            btn.getAttribute('data-href') === id
        );
        
        if (!targetButton) return;
        
        // Calcular índice del botón
        const targetIndex = Array.from(navButtons).indexOf(targetButton);
        
        // Marcar botón como activo
        targetButton.classList.add('active');
        
        // Mostrar sección
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Posicionar la sección justo debajo del botón seleccionado
            const buttonRect = targetButton.getBoundingClientRect();
            targetSection.style.top = `${buttonRect.bottom + 10}px`; // 10px de separación
            targetSection.style.left = `${buttonRect.left}px`;
        }
        
        // Calcular desplazamiento para los botones inferiores
        if (targetIndex < navButtons.length - 1) {
            // Obtener la posición del último botón
            const lastButton = navButtons[navButtons.length - 1];
            const lastButtonRect = lastButton.getBoundingClientRect();
            
            // Calcular espacio disponible hasta el fondo
            const viewportHeight = window.innerHeight;
            const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40; // 40px de margen
            
            // Calcular desplazamiento necesario
            const moveDown = Math.max(0, -spaceToBottom + 40); // 40px de espacio extra
            
            if (moveDown > 0) {
                // Aplicar desplazamiento a todos los botones inferiores como bloque
                const blockButtons = Array.from(navButtons).slice(targetIndex + 1);
                
                blockButtons.forEach(button => {
                    button.style.setProperty('--move-down', `${moveDown}px`);
                    button.classList.add('move-down-block');
                });
            }
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.remove('move-down-block');
            button.style.removeProperty('--move-down');
            button.style.transform = '';
        });
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
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navigation = document.getElementById('navigation');
    
    // Crear contenedor para botones inferiores
    const buttonBlock = document.createElement('div');
    buttonBlock.className = 'button-block';
    navigation.appendChild(buttonBlock);
    
    // Mover todos los botones excepto el primero al bloque
    navButtons.forEach((button, index) => {
        if (index > 0) {
            buttonBlock.appendChild(button);
        }
    });
    
    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    
    // Función para calcular desplazamiento
    function calculateMoveDistance() {
        const viewportHeight = window.innerHeight;
        const lastButton = buttonBlock.lastElementChild;
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        // Calcular espacio necesario para llegar al borde inferior
        const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40; // 40px de margen
        return Math.max(0, -spaceToBottom);
    }
    
    // Mostrar sección
    function showSection(id) {
        // Ocultar todas las secciones
        sections.forEach(section => section.classList.remove('active'));
        
        // Quitar estado activo
        navButtons.forEach(button => button.classList.remove('active'));
        
        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => 
            btn.getAttribute('data-href') === id
        );
        
        if (!targetButton) return;
        
        // Marcar botón como activo
        targetButton.classList.add('active');
        
        // Mostrar sección
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Posicionar la sección justo debajo del botón seleccionado
            const buttonRect = targetButton.getBoundingClientRect();
            targetSection.style.top = `${buttonRect.bottom}px`;
            targetSection.style.left = `${buttonRect.left}px`;
        }
        
        // Calcular y aplicar desplazamiento al bloque de botones
        const moveDistance = calculateMoveDistance();
        if (moveDistance > 0) {
            buttonBlock.style.transform = `translateY(${moveDistance}px)`;
        } else {
            buttonBlock.style.transform = 'translateY(0)';
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => button.classList.remove('active'));
        buttonBlock.style.transform = 'translateY(0)';
    }
    
    // Event listeners para botones de navegación
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
    
    // Recalcular desplazamiento al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (document.querySelector('.content-section.active')) {
            const moveDistance = calculateMoveDistance();
            buttonBlock.style.transform = moveDistance > 0 ? `translateY(${moveDistance}px)` : 'translateY(0)';
        }
    });
});
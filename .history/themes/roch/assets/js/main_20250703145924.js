document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navigation = document.getElementById('navigation');
    const app = document.getElementById('app');
    
    // Crear contenedor para botones inferiores
    const buttonBlock = document.createElement('div');
    buttonBlock.className = 'button-block';
    navigation.appendChild(buttonBlock);
    
    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => {
        button.classList.remove('active');
        // Mover todos los botones excepto el primero al bloque
        if(button !== navButtons[0]) {
            buttonBlock.appendChild(button);
        }
    });
    
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
        
        // Calcular índice del botón
        const targetIndex = Array.from(navButtons).indexOf(targetButton);
        
        // Marcar botón como activo
        targetButton.classList.add('active');
        
        // Mostrar sección
        const targetSection = document.getElementById(id);
        if (targetSection && targetButton) {
            targetSection.classList.add('active');

            // Obtener posición del botón relativo al viewport
            const buttonRect = targetButton.getBoundingClientRect();

            // Obtener posición relativa al contenedor principal (#app)
            const appRect = app.getBoundingClientRect();
            const left = buttonRect.left - appRect.left;
            const top = buttonRect.bottom - appRect.top;

            targetSection.style.left = `${left}px`;
            targetSection.style.top = `${top}px`;
        }
        
        // Calcular desplazamiento para el bloque de botones inferiores
        const viewportHeight = window.innerHeight;
        const buttonBlockRect = buttonBlock.getBoundingClientRect();
        const lastButton = buttonBlock.lastElementChild;
        const lastButtonRect = lastButton.getBoundingClientRect();

        // Espacio entre el último botón y el borde inferior
        const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40; // 40px margen inferior
        const moveDistance = Math.max(0, -spaceToBottom);

        if (moveDistance > 0) {
            buttonBlock.style.transform = `translateY(${moveDistance}px)`;
        } else {
            buttonBlock.style.transform = '';
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        buttonBlock.style.animation = '';
        buttonBlock.style.transform = '';
        sections.forEach(section => {
            section.style.left = '';
            section.style.top = '';
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
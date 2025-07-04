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
        navButtons.forEach(button => button.classList.remove('active'));

        // Encontrar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => btn.getAttribute('data-href') === id);
        if (!targetButton) return;
        const targetIndex = Array.from(navButtons).indexOf(targetButton);

        // Marcar botón como activo
        targetButton.classList.add('active');

        // Mostrar sección alineada al menú
        const targetSection = document.getElementById(id);
        if (targetSection && targetButton) {
            targetSection.classList.add('active');
            const buttonRect = targetButton.getBoundingClientRect();
            const navigationRect = navigation.getBoundingClientRect();
            const appRect = app.getBoundingClientRect();
            const left = navigationRect.left - appRect.left;
            const top = buttonRect.bottom - appRect.top;
            targetSection.style.left = `${left}px`;
            targetSection.style.top = `${top}px`;
        }

        // Mover el bloque de botones inferiores como un todo
        const firstLowerBtn = Array.from(buttonBlock.children).find(btn => {
            const navIdx = Array.from(navButtons).indexOf(btn);
            return navIdx > targetIndex;
        });
        if (firstLowerBtn) {
            const viewportHeight = window.innerHeight;
            const lastButton = buttonBlock.lastElementChild;
            const lastButtonRect = lastButton.getBoundingClientRect();
            const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40;
            const moveDistance = Math.max(0, -spaceToBottom);
            buttonBlock.style.transform = moveDistance > 0 ? `translateY(${moveDistance}px)` : '';
            buttonBlock.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
        } else {
            buttonBlock.style.transform = '';
            buttonBlock.style.transition = '';
        }
    }
    
    // Ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => button.classList.remove('active'));
        buttonBlock.style.transform = '';
        buttonBlock.style.transition = '';
        sections.forEach(section => {
            section.style.left = '';
            section.style.top = '';
        });
        Array.from(buttonBlock.children).forEach(btn => {
            btn.style.transform = '';
            btn.style.transition = '';
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
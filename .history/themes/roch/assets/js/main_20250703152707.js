document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('#navigation button');
    const blockButtons = document.querySelectorAll('.button-block button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navigation = document.getElementById('navigation');
    const buttonBlock = document.querySelector('.button-block');
    const app = document.getElementById('app');

    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    blockButtons.forEach(button => button.classList.remove('active'));

    function showSection(id) {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => button.classList.remove('active'));
        blockButtons.forEach(button => button.classList.remove('active'));

        // Buscar el botón objetivo
        let targetButton = Array.from(navButtons).find(btn => btn.getAttribute('data-href') === id)
            || Array.from(blockButtons).find(btn => btn.getAttribute('data-href') === id);
        if (!targetButton) return;
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

        // Mover el bloque de botones inferiores
        if (blockButtons.length > 0) {
            const lastButton = blockButtons[blockButtons.length - 1];
            const lastButtonRect = lastButton.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40;
            const moveDistance = Math.max(0, -spaceToBottom);

            buttonBlock.style.transform = moveDistance > 0 ? `translateY(${moveDistance}px)` : '';
            buttonBlock.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
        } else {
            buttonBlock.style.transform = '';
            buttonBlock.style.transition = '';
        }
    }

    function hideAllSections() {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => button.classList.remove('active'));
        blockButtons.forEach(button => button.classList.remove('active'));
        sections.forEach(section => {
            section.style.left = '';
            section.style.top = '';
        });
        buttonBlock.style.transform = '';
        buttonBlock.style.transition = '';
    }

    // Event listeners para navegación
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-href');
            if (this.classList.contains('active')) {
                hideAllSections();
            } else {
                showSection(sectionId);
            }
        });
    });
    blockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-href');
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

    // Vista previa de proyectos (igual que antes)
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
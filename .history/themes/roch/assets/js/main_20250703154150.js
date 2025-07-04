document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navigation = document.getElementById('navigation');
    const app = document.getElementById('app');

    // Estado inicial - todo oculto
    sections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(button => {
        button.classList.remove('active');
        button.style.transform = '';
        button.style.transition = '';
    });

    function showSection(id) {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(button => {
            button.classList.remove('active');
            button.style.transform = '';
            button.style.transition = '';
        });

        // Buscar el botón objetivo
        const targetButton = Array.from(navButtons).find(btn => btn.getAttribute('data-href') === id);
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

        // Mover solo los botones inferiores al seleccionado
        const btnIdx = Array.from(navButtons).indexOf(targetButton);
        if (btnIdx !== -1 && btnIdx < navButtons.length - 1) {
            const buttonsToMove = Array.from(navButtons).slice(btnIdx);
            const lastButton = buttonsToMove[buttonsToMove.length - 1];
            const viewportHeight = window.innerHeight;
            const lastButtonRect = lastButton.getBoundingClientRect();
            const spaceToBottom = viewportHeight - lastButtonRect.bottom - 40;
            const moveDistance = Math.max(0, -spaceToBottom);

            buttonsToMove.forEach(btn => {
                btn.style.transform = moveDistance > 0 ? `translateY(${moveDistance}px)` : '';
                btn.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
            });
        }
    }

    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.left = '';
            section.style.top = '';
        });
        navButtons.forEach(button => {
            button.classList.remove('active');
            button.style.transform = '';
            button.style.transition = '';
        });
    }

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
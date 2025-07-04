document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const homeBtn = document.getElementById('home');
    const navContainer = document.getElementById('navigation');
    
    // Mostrar sección
    function showSection(id) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Quitar clase activa de todos los botones
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Marcar botón como activo
            const activeButton = Array.from(navButtons).find(btn => 
                btn.getAttribute('data-href') === id
            );
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }
    
    // Event listeners
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection(this.getAttribute('data-href'));
        });
    });
    
    homeBtn.addEventListener('click', function() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
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
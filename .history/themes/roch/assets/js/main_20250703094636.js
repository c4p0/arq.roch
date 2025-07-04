document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre secciones
    const sections = document.querySelectorAll('.content-section');
    const buttons = document.querySelectorAll('button[data-href]');
    const homeBtn = document.getElementById('home');
    
    function showSection(id) {
        sections.forEach(section => {
            section.style.display = section.id === id ? 'block' : 'none';
        });
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            showSection(this.getAttribute('data-href'));
        });
    });
    
    homeBtn.addEventListener('click', function() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    });
    
    // Vista previa de proyectos
    const projects = document.querySelectorAll('.project');
    const preview = document.getElementById('project_preview');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            preview.querySelector('.client').textContent = this.dataset.client;
            preview.querySelector('.categories').textContent = this.dataset.cats;
            preview.querySelector('.tags').textContent = this.dataset.tags;
            preview.querySelector('.status').textContent = this.dataset.status;
            preview.querySelector('.first-img').src = this.dataset.firstimg;
            
            preview.style.display = 'block';
        });
        
        project.addEventListener('mouseleave', function() {
            preview.style.display = 'none';
        });
    });
});
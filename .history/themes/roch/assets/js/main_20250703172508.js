document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    const buttonBlock = document.querySelector('.button-block') || createButtonBlock();
    
    // Create button container if missing
    function createButtonBlock() {
        const block = document.createElement('div');
        block.className = 'button-block';
        navButtons.forEach((btn, i) => i > 0 && block.appendChild(btn));
        navigation.appendChild(block);
        return block;
    }

    // Calculate precise movement distance
    function calculateMoveDistance() {
        const viewportHeight = window.innerHeight;
        const lastButton = buttonBlock.lastElementChild;
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        return Math.max(0, (viewportHeight - 40) - lastButtonRect.bottom);
    }

    // Show active section
    function showSection(id) {
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        
        const targetButton = [...navButtons].find(btn => btn.dataset.href === id);
        if (!targetButton) return;
        
        targetButton.classList.add('active');
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.left = `${targetButton.offsetLeft}px`;
            
            // Move button block smoothly
            const moveDistance = calculateMoveDistance();
            buttonBlock.style.transform = `translateY(${moveDistance}px)`;
        }
    }

    // Reset all states
    function resetNavigation() {
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        buttonBlock.style.transform = 'translateY(0)';
    }

    // Event listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.href;
            btn.classList.contains('active') ? resetNavigation() : showSection(sectionId);
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
    
    // Recalcular desplazamiento al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (document.querySelector('.content-section.active')) {
            const activeButton = document.querySelector('#navigation button.active');
            if (activeButton) {
                moveButtons(activeButton);
            }
        }
    });
});
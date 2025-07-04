document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    
    // Create button container for all buttons except the first one
    const buttonBlock = document.createElement('div');
    buttonBlock.className = 'button-block';
    navigation.appendChild(buttonBlock);
    
    // Move all buttons except the first to the block
    navButtons.forEach((button, index) => {
        if (index > 0) {
            buttonBlock.appendChild(button);
        }
    });
    
    // State management
    let activeSection = null;
    
    // Calculate precise movement distance
    function calculateMoveDistance(activeIndex) {
        const viewportHeight = window.innerHeight;
        const lastButton = navButtons[navButtons.length - 1];
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        // Only move buttons below the active one
        const buttonsToMove = Array.from(buttonBlock.children).slice(activeIndex);
        if (buttonsToMove.length === 0) return 0;
        
        const lastButtonToMove = buttonsToMove[buttonsToMove.length - 1];
        const lastButtonToMoveRect = lastButtonToMove.getBoundingClientRect();
        
        return Math.max(0, (viewportHeight - 40) - lastButtonToMoveRect.bottom);
    }

    // Show active section
    function showSection(id) {
        // Hide all sections
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        
        // Find target button and its index
        const targetButton = [...navButtons].find(btn => btn.dataset.href === id);
        if (!targetButton) return;
        
        const buttonIndex = [...navButtons].indexOf(targetButton);
        targetButton.classList.add('active');
        activeSection = id;
        
        // Show target section
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Position content directly below the active button
            const buttonRect = targetButton.getBoundingClientRect();
            targetSection.style.top = `${buttonRect.bottom}px`;
            targetSection.style.left = `${buttonRect.left}px`;
            
            // Move only buttons below the active one
            const moveDistance = calculateMoveDistance(buttonIndex);
            buttonBlock.style.transform = `translateY(${moveDistance}px)`;
        }
    }

    // Reset all states
    function resetNavigation() {
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        buttonBlock.style.transform = 'translateY(0)';
        activeSection = null;
    }

    // Event listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.href;
            
            // Toggle section visibility
            if (activeSection === sectionId) {
                resetNavigation();
            } else {
                showSection(sectionId);
            }
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
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (activeSection) {
            const targetButton = [...navButtons].find(btn => 
                btn.dataset.href === activeSection
            );
            
            if (targetButton) {
                const buttonIndex = [...navButtons].indexOf(targetButton);
                const moveDistance = calculateMoveDistance(buttonIndex);
                buttonBlock.style.transform = `translateY(${moveDistance}px)`;
                
                // Reposition content
                const targetSection = document.getElementById(activeSection);
                if (targetSection) {
                    const buttonRect = targetButton.getBoundingClientRect();
                    targetSection.style.top = `${buttonRect.bottom}px`;
                    targetSection.style.left = `${buttonRect.left}px`;
                }
            }
        }
    });
});
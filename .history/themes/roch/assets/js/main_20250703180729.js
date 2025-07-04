document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    
    // Create button container for all buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    navigation.appendChild(buttonContainer);
    
    // Move all buttons to the container
    navButtons.forEach(button => {
        buttonContainer.appendChild(button);
    });
    
    // State management
    let activeSection = null;
    
    // Calculate precise movement distance
    function calculateMoveDistance(activeIndex) {
        const viewportHeight = window.innerHeight;
        const lastButton = navButtons[navButtons.length - 1];
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        // Calculate space needed to push last button to bottom
        const spaceNeeded = viewportHeight - 40 - lastButtonRect.bottom;
        return Math.max(0, spaceNeeded);
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
            if (buttonIndex < navButtons.length - 1) {
                const moveDistance = calculateMoveDistance(buttonIndex);
                buttonContainer.style.transform = `translateY(${moveDistance}px)`;
            } else {
                buttonContainer.style.transform = 'translateY(0)';
            }
        }
    }

    // Reset all states
    function resetNavigation() {
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        buttonContainer.style.transform = 'translateY(0)';
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
                const targetSection = document.getElementById(activeSection);
                
                if (targetSection) {
                    // Reposition content
                    const buttonRect = targetButton.getBoundingClientRect();
                    targetSection.style.top = `${buttonRect.bottom}px`;
                    targetSection.style.left = `${buttonRect.left}px`;
                    
                    // Recalculate movement
                    if (buttonIndex < navButtons.length - 1) {
                        const moveDistance = calculateMoveDistance(buttonIndex);
                        buttonContainer.style.transform = `translateY(${moveDistance}px)`;
                    } else {
                        buttonContainer.style.transform = 'translateY(0)';
                    }
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    
    // State management
    let activeSection = null;
    let animationTimeline = null;
    
    // Function to calculate the exact movement needed
    function calculateMoveDistance(activeIndex) {
        if (activeIndex === navButtons.length - 1) return 0; // Last button doesn't need movement
        
        const viewportHeight = window.innerHeight;
        const lastButton = navButtons[navButtons.length - 1];
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        // Calculate space needed to push last button to bottom
        const spaceNeeded = viewportHeight - 40 - lastButtonRect.bottom;
        return Math.max(0, spaceNeeded);
    }

    // Show active section with GSAP animations
    function showSection(id) {
        // Kill any existing animations
        if (animationTimeline) animationTimeline.kill();
        
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
        if (!targetSection) return;
        
        // Create new GSAP timeline
        animationTimeline = gsap.timeline({
            defaults: { duration: 0.8, ease: "power3.out" }
        });
        
        // Position content directly below the active button
        const buttonRect = targetButton.getBoundingClientRect();
        targetSection.style.top = `${buttonRect.bottom}px`;
        targetSection.style.left = `${buttonRect.left}px`;
        
        // Calculate movement for buttons below
        const moveDistance = calculateMoveDistance(buttonIndex);
        
        // Animate buttons below the active one
        if (buttonIndex < navButtons.length - 1) {
            // Create an array of buttons to move (all below the active one)
            const buttonsToMove = Array.from(navButtons).slice(buttonIndex + 1);
            
            animationTimeline.to(buttonsToMove, {
                y: moveDistance,
                stagger: 0.05
            }, 0);
        }
        
        // Animate the section content
        animationTimeline.fromTo(targetSection, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.2
        );
        
        // Show the section
        targetSection.classList.add('active');
    }

    // Reset all states
    function resetNavigation() {
        // Kill any existing animations
        if (animationTimeline) animationTimeline.kill();
        
        // Create new GSAP timeline for reset
        animationTimeline = gsap.timeline({
            defaults: { duration: 0.8, ease: "power3.out" }
        });
        
        // Animate all buttons back to original position
        animationTimeline.to(navButtons, {
            y: 0,
            stagger: 0.05
        }, 0);
        
        // Hide sections
        sections.forEach(s => {
            animationTimeline.to(s, {
                opacity: 0,
                y: 10,
                duration: 0.4,
                onComplete: () => s.classList.remove('active')
            }, 0);
        });
        
        // Remove active classes
        navButtons.forEach(b => b.classList.remove('active'));
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
                    const moveDistance = calculateMoveDistance(buttonIndex);
                    
                    // Update positions of buttons below
                    if (buttonIndex < navButtons.length - 1) {
                        const buttonsToMove = Array.from(navButtons).slice(buttonIndex + 1);
                        gsap.set(buttonsToMove, { y: moveDistance });
                    }
                }
            }
        }
    });
});
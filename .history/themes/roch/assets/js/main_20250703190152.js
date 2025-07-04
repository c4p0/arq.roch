document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    
    // Crear contenedor para botones inferiores
    const buttonsBelowContainer = document.createElement('div');
    buttonsBelowContainer.className = 'buttons-below-container';
    navigation.appendChild(buttonsBelowContainer);
    
    // State management
    let activeSection = null;
    let animationTimeline = null;
    
    // Función para calcular el movimiento necesario
    function calculateMoveDistance(activeIndex) {
        if (activeIndex === navButtons.length - 1) return 0;
        
        const viewportHeight = window.innerHeight;
        const lastButton = navButtons[navButtons.length - 1];
        const lastButtonRect = lastButton.getBoundingClientRect();
        
        const spaceNeeded = viewportHeight - 40 - lastButtonRect.bottom;
        return Math.max(0, spaceNeeded);
    }

    // Mostrar sección activa
    function showSection(id) {
        if (animationTimeline) animationTimeline.kill();
        
        // Ocultar todo
        sections.forEach(s => s.classList.remove('active'));
        navButtons.forEach(b => b.classList.remove('active'));
        
        // Encontrar botón objetivo
        const targetButton = [...navButtons].find(btn => btn.dataset.href === id);
        if (!targetButton) return;
        
        const buttonIndex = [...navButtons].indexOf(targetButton);
        targetButton.classList.add('active');
        activeSection = id;
        
        // Mostrar sección
        const targetSection = document.getElementById(id);
        if (!targetSection) return;
        
        // Crear timeline de animación
        animationTimeline = gsap.timeline({
            defaults: { duration: 0.8, ease: "power3.out" }
        });
        
        // Posicionar contenido debajo del botón activo
        const buttonRect = targetButton.getBoundingClientRect();
        targetSection.style.top = `${buttonRect.bottom}px`;
        targetSection.style.left = `${buttonRect.left}px`;
        
        // Calcular movimiento
        const moveDistance = calculateMoveDistance(buttonIndex);
        
        // Mover botones inferiores como un bloque sincronizado
        if (buttonIndex < navButtons.length - 1) {
            // Obtener botones inferiores
            const buttonsToMove = Array.from(navButtons).slice(buttonIndex + 1);
            
            // ANIMACIÓN CORREGIDA: Mover todos juntos como bloque
            animationTimeline.to(buttonsToMove, {
                y: moveDistance,
                duration: 0.8,
                ease: "power3.out"
            }, 0);
        }
        
        // Animar la sección de contenido
        animationTimeline.fromTo(targetSection, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.2
        );
        
        // Mostrar sección
        targetSection.classList.add('active');
    }

    // Resetear navegación
    function resetNavigation() {
        if (animationTimeline) animationTimeline.kill();
        
        animationTimeline = gsap.timeline({
            defaults: { duration: 0.8, ease: "power3.out" }
        });
        
        // Resetear posición de todos los botones
        animationTimeline.to(navButtons, {
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, 0);
        
        // Ocultar secciones
        sections.forEach(s => {
            animationTimeline.to(s, {
                opacity: 0,
                y: 10,
                duration: 0.4,
                onComplete: () => s.classList.remove('active')
            }, 0);
        });
        
        // Quitar clases activas
        navButtons.forEach(b => b.classList.remove('active'));
        activeSection = null;
    }

    // Event listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.href;
            
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
    
    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
        if (activeSection) {
            const targetButton = [...navButtons].find(btn => 
                btn.dataset.href === activeSection
            );
            
            if (targetButton) {
                const buttonIndex = [...navButtons].indexOf(targetButton);
                const targetSection = document.getElementById(activeSection);
                
                if (targetSection) {
                    // Reposicionar contenido
                    const buttonRect = targetButton.getBoundingClientRect();
                    targetSection.style.top = `${buttonRect.bottom}px`;
                    targetSection.style.left = `${buttonRect.left}px`;
                    
                    // Recalcular movimiento
                    const moveDistance = calculateMoveDistance(buttonIndex);
                    
                    // Actualizar posición de botones inferiores
                    if (buttonIndex < navButtons.length - 1) {
                        const buttonsToMove = Array.from(navButtons).slice(buttonIndex + 1);
                        gsap.set(buttonsToMove, { y: moveDistance });
                    }
                }
            }
        }
    });
});
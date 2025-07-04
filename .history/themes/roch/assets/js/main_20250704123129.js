document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navButtons = document.querySelectorAll('#navigation button');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    const logo = document.getElementById('logo');
    
    // Crear contenedor para botones inferiores
    const buttonsBelowContainer = document.createElement('div');
    buttonsBelowContainer.className = 'buttons-below-container';
    navigation.appendChild(buttonsBelowContainer);
    
    // State management
    let activeSection = null;
    let animationTimeline = null;


    // Función para manejar la visibilidad del logo
    function updateLogoVisibility() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            // Si hay una sección activa, ocultar el logo
            logo.style.opacity = '0';
            logo.style.pointerEvents = 'none';
        } else {
            // Si no hay sección activa, mostrar el logo
            logo.style.opacity = '1';
            logo.style.pointerEvents = 'all';
        }
    }

    // Añadir event listeners a los botones de navegación
    navigationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-href');
            
            // Alternar la sección clickeada
            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.toggle('active');
                } else {
                    section.classList.remove('active');
                }
            });

  
        });
 

    // También podrías añadir un click fuera del contenido para cerrarlo
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.content-section') && !e.target.closest('#navigation button')) {
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            updateLogoVisibility();
        }
    });

    // Inicializar visibilidad del logo
    updateLogoVisibility();
});
    
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
        
        // Posicionar contenido debajo del botón activo
        const buttonRect = targetButton.getBoundingClientRect();
        targetSection.style.top = `${buttonRect.bottom}px`;
        targetSection.style.left = `${buttonRect.left}px`;
        
        // Calcular movimiento
        const moveDistance = calculateMoveDistance(buttonIndex);
        
        // Crear timeline de animación con movimiento lineal y rápido
        animationTimeline = gsap.timeline();
        
        // Mover botones inferiores como un bloque sincronizado (LINEAL Y RÁPIDO)
        if (buttonIndex < navButtons.length - 1) {
            // Obtener botones inferiores
            const buttonsToMove = Array.from(navButtons).slice(buttonIndex + 1);
            
            // ANIMACIÓN LINEAL Y RÁPIDA (0.4 segundos)
            animationTimeline.to(buttonsToMove, {
                y: moveDistance,
                duration: 0.4, // Más rápido
                ease: "none"   // Movimiento lineal
            }, 0);
        }
        
        // Animar la sección de contenido (más rápido también)
        animationTimeline.fromTo(targetSection, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "none" },
            0.1
        );
        
        // Mostrar sección
        targetSection.classList.add('active');
    }

    // Resetear navegación
    function resetNavigation() {
        if (animationTimeline) animationTimeline.kill();
        
        animationTimeline = gsap.timeline();
        
        // Resetear posición de todos los botones (LINEAL Y RÁPIDO)
        animationTimeline.to(navButtons, {
            y: 0,
            duration: 0.4, // Más rápido
            ease: "none"   // Movimiento lineal
        }, 0);
        
        // Ocultar secciones
        sections.forEach(s => {
            animationTimeline.to(s, {
                opacity: 0,
                duration: 0.2,
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
// Inicializar Reveal.js
Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: 'slide',
    
    // Configuración adicional
    width: 1920,
    height: 1080,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0
});

// Configuración de Tailwind personalizada
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#1E3A8A',
                'secondary': '#10B981',
                'accent': '#F59E0B',
                'light': '#F3F4F6',
                'dark': '#1F2937'
            }
        }
    }
}


// Inicializar Reveal.js
Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: 'slide',
    
    // Configuración adicional
    width: 1920,
    height: 1080,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0,
    
    // Configuración de plugins
    plugins: []
});

// Configuración de Tailwind personalizada
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#1E3A8A',
                'secondary': '#10B981',
                'accent': '#F59E0B',
                'light': '#F3F4F6',
                'dark': '#1F2937'
            }
        }
    }
}

// API Key de Pexels
const PEXELS_API_KEY = '59ArUEH8Zpzl4LMcSJ47Flq09GQTMVONA3ypWJiMs8C6kXfxSR9zMMRC';

// Función para cargar imagen de Pexels
async function loadPexelsImage(query, elementId) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.large2x || data.photos[0].src.large;
            const element = document.getElementById(elementId);
            
            if (element) {
                // Pre-cargar la imagen
                const img = new Image();
                img.onload = function() {
                    element.style.backgroundImage = `url('${imageUrl}')`;
                    element.style.opacity = '0';
                    
                    // Fade in suave
                    setTimeout(() => {
                        element.style.transition = 'opacity 1s ease-in-out';
                        element.style.opacity = '1';
                    }, 100);
                };
                img.src = imageUrl;
            }
        }
    } catch (error) {
        console.error('Error cargando imagen de Pexels:', error);
        // Fallback a una imagen por defecto
        const element = document.getElementById(elementId);
        if (element) {
            element.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?renewable,energy,nature')`;
        }
    }
}

// Cargar imagen de fondo para la portada cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar imagen de fondo para la portada
    loadPexelsImage('renewable energy landscape', 'portada-bg');
    
    // Efecto parallax suave en el movimiento del mouse
    const portadaSlide = document.querySelector('.portada-slide');
    if (portadaSlide) {
        portadaSlide.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            const particles = portadaSlide.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                particle.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
        });
    }
    
    // Animación de los iconos de energía al hacer hover
    const energyIcons = document.querySelectorAll('.energy-icon-wrapper');
    energyIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationDelay = `${index * 0.1}s`;
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });
});

// Eventos de Reveal.js
Reveal.on('ready', event => {
    console.log('Presentación lista');
    
    // Reiniciar animaciones cuando se vuelve a la portada
    Reveal.on('slidechanged', event => {
        if (event.indexh === 0) {
            // Reiniciar animaciones de la portada
            const animatedElements = document.querySelectorAll('.portada-slide .animate__animated');
            animatedElements.forEach(el => {
                const animationClasses = Array.from(el.classList).filter(c => c.startsWith('animate__'));
                el.classList.remove(...animationClasses);
                
                // Forzar reflow
                void el.offsetWidth;
                
                // Volver a añadir las clases
                el.classList.add(...animationClasses);
            });
        }
    });
});

// Función helper para crear gráficos (la usaremos en diapositivas posteriores)
function createChart(canvasId, type, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "'Open Sans', sans-serif",
                        size: 14
                    }
                }
            }
        }
    };
    
    return new Chart(ctx, {
        type: type,
        data: data,
        options: { ...defaultOptions, ...options }
    });
}

// Función para animar números (la usaremos en diapositivas posteriores)
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString();
        }
    };
    
    window.requestAnimationFrame(step);
}

// Detectar el tamaño de pantalla y ajustar si es necesario
function adjustForScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    
    // Ajustar la configuración de Reveal si es necesario
    if (aspectRatio < 1.5) {
        // Pantallas más cuadradas
        Reveal.configure({
            width: 1080,
            height: 1080
        });
    } else if (aspectRatio > 2) {
        // Pantallas ultra-wide
        Reveal.configure({
            width: 2560,
            height: 1080
        });
    }
}

// Ejecutar ajuste al cargar y al cambiar tamaño
window.addEventListener('load', adjustForScreenSize);
window.addEventListener('resize', adjustForScreenSize);

// Prevenir el zoom con gestos en dispositivos táctiles
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Log para debugging
console.log('Script de presentación cargado correctamente');


// ===== FUNCIONALIDAD PARA DIAPOSITIVA 2: ÍNDICE =====

// Función para manejar la navegación desde el índice
function initializeIndexNavigation() {
    // Obtener todas las tarjetas del índice
    const indexCards = document.querySelectorAll('.index-card');
    
    indexCards.forEach(card => {
        // Obtener el número de diapositiva del atributo data-slide
        const targetSlide = card.getAttribute('data-slide');
        
        if (targetSlide) {
            // Añadir evento de click
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Convertir a número y restar 1 (Reveal.js usa índice base 0)
                const slideIndex = parseInt(targetSlide) - 1;
                
                // Navegar a la diapositiva
                Reveal.slide(slideIndex, 0);
                
                // Efecto visual de feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Cambiar cursor al pasar sobre la tarjeta
            card.style.cursor = 'pointer';
            
            // Añadir tooltip
            card.setAttribute('title', `Ir a diapositiva ${targetSlide}`);
        }
    });
}

// Función para animar los números cuando la diapositiva está activa
function animateIndexNumbers() {
    const indexSlide = document.querySelector('.indice-slide');
    if (!indexSlide) return;
    
    // Observer para detectar cuando la diapositiva es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('present')) {
                // Animar las tarjetas secuencialmente
                const cards = entry.target.querySelectorAll('.index-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Forzar reflow
                        void card.offsetWidth;
                        
                        // Aplicar animación
                        card.style.transition = 'all 0.5s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(indexSlide);
}

// Función para resaltar la sección actual en el índice
function highlightCurrentSection() {
    Reveal.on('slidechanged', event => {
        const currentSlideNumber = event.indexh + 1;
        const indexCards = document.querySelectorAll('.index-card');
        
        indexCards.forEach(card => {
            const cardSlide = parseInt(card.getAttribute('data-slide'));
            
            // Determinar si esta tarjeta corresponde a la sección actual
            if (cardSlide <= currentSlideNumber) {
                // Buscar la siguiente tarjeta para determinar el rango
                const nextCard = card.nextElementSibling;
                const nextSlide = nextCard ? parseInt(nextCard.getAttribute('data-slide')) : Infinity;
                
                if (currentSlideNumber < nextSlide) {
                    card.classList.add('current-section');
                } else {
                    card.classList.remove('current-section');
                }
            } else {
                card.classList.remove('current-section');
            }
        });
    });
}

// Función para añadir efecto de ripple al hacer click
function addRippleEffect() {
    const indexCards = document.querySelectorAll('.index-card');
    
    indexCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Crear elemento ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Calcular posición
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Aplicar estilos
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Añadir al DOM
            this.appendChild(ripple);
            
            // Remover después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Función para manejar el scroll suave en dispositivos móviles
function handleMobileScroll() {
    const indexSlide = document.querySelector('.indice-slide > div');
    if (!indexSlide) return;
    
    let isScrolling = false;
    
    indexSlide.addEventListener('scroll', () => {
        if (!isScrolling) {
            indexSlide.style.scrollBehavior = 'smooth';
        }
        
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            isScrolling = false;
        }, 100);
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que Reveal.js esté listo
    Reveal.on('ready', () => {
        initializeIndexNavigation();
        animateIndexNumbers();
        highlightCurrentSection();
        addRippleEffect();
        handleMobileScroll();
    });
});

// CSS adicional para el efecto ripple (añadir al style.css)
const rippleStyles = `
    .index-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .index-card.current-section {
        border-color: var(--color-primary);
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
    }
    
    .index-card.current-section .index-number {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

// Inyectar estilos del ripple
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Función helper para debugging
function logNavigationEvent(slideNumber) {
    console.log(`Navegando a diapositiva ${slideNumber}`);
}

// Añadir listener para teclas de navegación rápida
document.addEventListener('keydown', (e) => {
    // Solo funciona cuando estamos en la diapositiva de índice
    if (Reveal.getCurrentSlide().classList.contains('indice-slide')) {
        const keyMap = {
            '1': 3,  // Introducción
            '2': 4,  // Biomasa
            '3': 7,  // Geotérmica
            '4': 10, // Mareomotriz
            '5': 13, // Olas
            '6': 15  // Solar Térmica
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            Reveal.slide(keyMap[e.key] - 1, 0);
            logNavigationEvent(keyMap[e.key]);
        }
    }
});



// ===== FUNCIONALIDAD PARA DIAPOSITIVA 3: INTRODUCCIÓN =====

// Función para animar los contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación cuando la diapositiva sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Función para crear el gráfico del mix energético
function createMixEnergeticoChart() {
    const canvas = document.getElementById('mixEnergeticoChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Datos del mix energético global 2024
    const data = {
        labels: [
            'Carbón',
            'Gas Natural',
            'Petróleo',
            'Nuclear',
            'Hidroeléctrica',
            'Eólica',
            'Solar',
            'Otras Renovables'
        ],
        datasets: [{
            data: [27, 23, 31, 4, 6, 5, 2, 2],
            backgroundColor: [
                '#4B5563', // Carbón - gris oscuro
                '#60A5FA', // Gas - azul claro
                '#1F2937', // Petróleo - negro
                '#FBBF24', // Nuclear - amarillo
                '#3B82F6', // Hidro - azul
                '#10B981', // Eólica - verde
                '#F59E0B', // Solar - naranja
                '#8B5CF6'  // Otras - púrpura
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                        family: "'Open Sans', sans-serif"
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        return data.labels.map((label, i) => ({
                            text: `${label}: ${data.datasets[0].data[i]}%`,
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: false,
                            index: i
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '%';
                    }
                }
            }
        }
    };
    
    // Crear el gráfico
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

// Función para animar las barras de potencial
function animatePotentialBars() {
    const bars = document.querySelectorAll('.potential-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progressBar = bar.querySelector('.bg-gradient-to-r');
                const value = bar.getAttribute('data-value');
                
                setTimeout(() => {
                    progressBar.style.width = value + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => observer.observe(bar));
}

// Función para cargar la imagen de introducción
async function loadIntroImage() {
    const imageContainer = document.getElementById('intro-image');
    if (!imageContainer) return;
    
    // Añadir clase de carga
    imageContainer.classList.add('loading');
    
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=renewable+energy+future+technology&per_page=1&orientation=landscape', {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.large;
            
            // Pre-cargar la imagen
            const img = new Image();
            img.onload = function() {
                imageContainer.style.backgroundImage = `url('${imageUrl}')`;
                imageContainer.classList.remove('loading');
                
                // Fade in
                imageContainer.style.opacity = '0';
                setTimeout(() => {
                    imageContainer.style.transition = 'opacity 0.5s ease-in-out';
                    imageContainer.style.opacity = '1';
                }, 100);
            };
            img.onerror = function() {
                // Fallback a Unsplash si falla
                loadFallbackImage(imageContainer);
            };
            img.src = imageUrl;
        } else {
            loadFallbackImage(imageContainer);
        }
    } catch (error) {
        console.error('Error cargando imagen:', error);
        loadFallbackImage(imageContainer);
    }
}

// Función fallback para cargar imagen de Unsplash
function loadFallbackImage(container) {
    const fallbackUrl = 'https://source.unsplash.com/1920x1080/?renewable,energy,technology,future';
    container.style.backgroundImage = `url('${fallbackUrl}')`;
    container.classList.remove('loading');
}

// Función para manejar la navegación del botón
function setupIntroNavigation() {
    const nextButton = document.querySelector('.introduccion-slide button');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            Reveal.next();
        });
    }
}

// Inicializar cuando la diapositiva esté activa
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('introduccion-slide')) {
        // Pequeño delay para asegurar que todo esté renderizado
        setTimeout(() => {
            animateCounters();
            createMixEnergeticoChart();
            animatePotentialBars();
            loadIntroImage();
        }, 100);
    }
});

// Inicializar también cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Si la diapositiva 3 es la actual al cargar
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('introduccion-slide')) {
        setTimeout(() => {
            animateCounters();
            createMixEnergeticoChart();
            animatePotentialBars();
            loadIntroImage();
        }, 500);
    }
    
    setupIntroNavigation();
});

// Función helper para formatear números grandes
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Añadir efecto parallax suave al scroll
document.addEventListener('DOMContentLoaded', () => {
    const introSlide = document.querySelector('.introduccion-slide > div');
    if (introSlide) {
        introSlide.addEventListener('scroll', () => {
            const scrolled = introSlide.scrollTop;
            const parallaxElements = introSlide.querySelectorAll('.bg-gradient-to-br');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
});



// ===== FUNCIONALIDAD PARA DIAPOSITIVA 4: BIOMASA PARTE 1 =====

// Función para dibujar el ciclo del carbono
function drawCarbonCycle() {
    const canvas = document.getElementById('carbonCycleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Ajustar el tamaño del canvas
    canvas.width = width;
    canvas.height = height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // Función para dibujar flecha curva
    function drawCurvedArrow(fromAngle, toAngle, text, color) {
        ctx.save();
        
        // Dibujar arco
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, fromAngle, toAngle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Dibujar punta de flecha
        const arrowX = centerX + radius * Math.cos(toAngle);
        const arrowY = centerY + radius * Math.sin(toAngle);
        
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(toAngle + Math.PI/2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, -15);
        ctx.lineTo(8, -15);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
        
        // Añadir texto
        const textAngle = (fromAngle + toAngle) / 2;
        const textX = centerX + (radius + 30) * Math.cos(textAngle);
        const textY = centerY + (radius + 30) * Math.sin(textAngle);
        
        ctx.font = '14px Open Sans';
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, textX, textY);
        
        ctx.restore();
    }
    
    // Función para dibujar nodo
    function drawNode(angle, icon, label, bgColor) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Círculo de fondo
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Icono (usando emoji como alternativa)
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, x, y);
        
        // Label
        ctx.font = '12px Open Sans';
        ctx.fillStyle = '#374151';
        ctx.fillText(label, x, y + 50);
    }
    
    // Dibujar el ciclo
    const nodes = [
        { angle: -Math.PI/2, icon: '🌱', label: 'Plantas', color: '#10B981' },
        { angle: 0, icon: '🔥', label: 'Combustión', color: '#F59E0B' },
        { angle: Math.PI/2, icon: '💨', label: 'CO₂', color: '#3B82F6' },
        { angle: Math.PI, icon: '☀️', label: 'Fotosíntesis', color: '#8B5CF6' }
    ];
    
    // Dibujar flechas
    drawCurvedArrow(-Math.PI/2 + 0.2, -0.2, 'Biomasa', '#10B981');
    drawCurvedArrow(0.2, Math.PI/2 - 0.2, 'Emisión', '#F59E0B');
    drawCurvedArrow(Math.PI/2 + 0.2, Math.PI - 0.2, 'Absorción', '#3B82F6');
    drawCurvedArrow(Math.PI + 0.2, -Math.PI/2 - 0.2, 'Crecimiento', '#8B5CF6');
    
    // Dibujar nodos
    nodes.forEach(node => {
        drawNode(node.angle, node.icon, node.label, node.color);
    });
    
    // Texto central
    ctx.font = 'bold 16px Montserrat';
    ctx.fillStyle = '#1F2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Ciclo Neutro', centerX, centerY - 10);
    ctx.font = '14px Open Sans';
    ctx.fillText('de Carbono', centerX, centerY + 10);
}

// Función para animar las tarjetas al hacer hover
function initializeBiomassCards() {
    const cards = document.querySelectorAll('.biomass-type-card');
    
    cards.forEach((card, index) => {
        // Efecto de entrada escalonado
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
        
        // Añadir interactividad
        card.addEventListener('click', function() {
            // Efecto de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Mostrar más información (preparado para futuras diapositivas)
            const type = this.querySelector('h4').textContent;
            console.log(`Clicked on: ${type}`);
        });
    });
}

// Función para animar los elementos de características
function animateFeatures() {
    const features = document.querySelectorAll('.biomasa-slide-1 .fa-check-circle');
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'scale(0)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.3s ease-out';
            feature.style.opacity = '1';
            feature.style.transform = 'scale(1)';
        }, 800 + (index * 150));
    });
}

// Función para el contador de estadísticas
function animateBiomassStats() {
    const stats = [
        { element: '.fa-globe', value: '10%', label: 'energía primaria' },
        { element: '.fa-users', value: '2.4B', label: 'personas' }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(`.biomasa-slide-1 ${stat.element}`);
        if (element && element.parentElement) {
            // Animar el número
            const span = element.parentElement.querySelector('span');
            if (span && span.textContent.includes(stat.value)) {
                const originalText = span.textContent;
                span.style.opacity = '0';
                
                setTimeout(() => {
                    span.style.transition = 'opacity 0.5s ease-in';
                    span.style.opacity = '1';
                }, 1000);
            }
        }
    });
}

// Función para manejar el resize del canvas
function handleCanvasResize() {
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target.id === 'carbonCycleCanvas') {
                drawCarbonCycle();
            }
        }
    });
    
    const canvas = document.getElementById('carbonCycleCanvas');
    if (canvas) {
        resizeObserver.observe(canvas.parentElement);
    }
}

// Inicializar cuando la diapositiva esté activa
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('biomasa-slide-1')) {
        setTimeout(() => {
            drawCarbonCycle();
            initializeBiomassCards();
            animateFeatures();
            animateBiomassStats();
            handleCanvasResize();
        }, 100);
    }
});

// También inicializar si la diapositiva ya está activa al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('biomasa-slide-1')) {
        setTimeout(() => {
            drawCarbonCycle();
            initializeBiomassCards();
            animateFeatures();
            animateBiomassStats();
            handleCanvasResize();
        }, 500);
    }
});

// Función para tooltip en las tarjetas
function addBiomassTooltips() {
    const tooltipData = {
        'Biomasa Natural': 'Representa el 5% del total de biomasa utilizada globalmente',
        'Biomasa Residual': 'Puede reducir hasta 80% las emisiones comparado con combustibles fósiles',
        'Cultivos Energéticos': 'Producen entre 10-25 toneladas de biomasa seca por hectárea/año',
        'Biomasa Animal': 'El biogás de residuos animales puede generar 0.5-0.8 kWh por kg'
    };
    
    const cards = document.querySelectorAll('.biomass-type-card');
    cards.forEach(card => {
        const title = card.querySelector('h4').textContent;
        if (tooltipData[title]) {
            card.setAttribute('title', tooltipData[title]);
        }
    });
}

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', addBiomassTooltips);



// ===== FUNCIONALIDAD PARA DIAPOSITIVA 5: BIOMASA - PROCESOS DE CONVERSIÓN =====

// Función para animar las barras de eficiencia
function animateEfficiencyBars() {
    const bars = document.querySelectorAll('.biomasa-slide-2 .efficiency-bar');
    
    bars.forEach((bar, index) => {
        const efficiency = bar.getAttribute('data-efficiency');
        
        // Resetear la barra
        bar.style.width = '0%';
        
        // Animar después de un delay
        setTimeout(() => {
            bar.style.width = efficiency + '%';
        }, 500 + (index * 200));
    });
}

// Función para crear el gráfico comparativo
function createProcessComparisonChart() {
    const canvas = document.getElementById('processComparisonChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Datos comparativos
    const data = {
        labels: ['Combustión Directa', 'Gasificación', 'Digestión Anaerobia'],
        datasets: [
            {
                label: 'Eficiencia Mínima (%)',
                data: [20, 35, 50],
                backgroundColor: 'rgba(251, 146, 60, 0.5)',
                borderColor: 'rgba(251, 146, 60, 1)',
                borderWidth: 2
            },
            {
                label: 'Eficiencia Máxima (%)',
                data: [40, 50, 65],
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2
            },
            {
                label: 'Temperatura (°C/10)',
                data: [90, 110, 4.5],
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                yAxisID: 'y1'
            }
        ]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 11,
                        family: "'Open Sans', sans-serif"
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            if (context.datasetIndex === 2) {
                                label += (context.parsed.y * 10) + '°C';
                            } else {
                                label += context.parsed.y + '%';
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Eficiencia (%)',
                    font: {
                        size: 11
                    }
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Temperatura (°C/10)',
                    font: {
                        size: 11
                    }
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    };
    
    // Crear el gráfico
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

// Función para animar los valores de temperatura
function animateTemperatures() {
    const tempElements = document.querySelectorAll('.biomasa-slide-2 .text-2xl');
    
    tempElements.forEach((element, index) => {
        const originalText = element.textContent;
        const numbers = originalText.match(/\d+/g);
        
        if (numbers) {
            const minTemp = parseInt(numbers[0]);
            const maxTemp = numbers[1] ? parseInt(numbers[1]) : minTemp;
            
            // Animación de contador
            let currentMin = 0;
            let currentMax = 0;
            const duration = 1500;
            const steps = 30;
            const incrementMin = minTemp / steps;
            const incrementMax = maxTemp / steps;
            
            const interval = setInterval(() => {
                currentMin += incrementMin;
                currentMax += incrementMax;
                
                if (currentMin >= minTemp) {
                    currentMin = minTemp;
                    currentMax = maxTemp;
                    clearInterval(interval);
                }
                
                if (numbers[1]) {
                    element.textContent = `${Math.floor(currentMin)}-${Math.floor(currentMax)}°C`;
                } else {
                    element.textContent = `${Math.floor(currentMin)}°C`;
                }
            }, duration / steps);
        }
    });
}

// Función para añadir interactividad a las tarjetas
function initializeProcessCards() {
    const cards = document.querySelectorAll('.process-card');
    
    cards.forEach((card, index) => {
        // Tooltip con información adicional
        const tooltips = {
            0: 'La combustión directa es el método más simple y antiguo, ideal para calefacción y generación eléctrica a pequeña escala.',
            1: 'La gasificación permite producir combustibles líquidos y químicos, con mayor flexibilidad de uso final.',
            2: 'La digestión anaerobia es ideal para residuos húmedos y produce fertilizante como subproducto valioso.'
        };
        
        card.setAttribute('title', tooltips[index]);
        
        // Efecto de click para mostrar más detalles
        card.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Log para futura funcionalidad
            const processName = this.querySelector('h3').textContent;
            console.log(`Proceso seleccionado: ${processName}`);
        });
    });
}

// Función para animar los iconos de productos
function animateProductIcons() {
    const icons = document.querySelectorAll('.process-card .space-y-2 .fas');
    
    icons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease-out';
            icon.style.opacity = '1';
            icon.style.transform = 'translateX(0)';
        }, 1000 + (index * 100));
    });
}

// Función para comparación interactiva
function setupProcessComparison() {
    const cards = document.querySelectorAll('.process-card');
    let selectedProcesses = [];
    
    cards.forEach((card, index) => {
        const compareButton = document.createElement('button');
        compareButton.className = 'mt-3 w-full text-xs bg-gray-100 hover:bg-gray-200 rounded py-1 transition-colors';
        compareButton.textContent = 'Comparar';
        compareButton.style.display = 'none'; // Oculto por defecto
        
        // Añadir botón a la tarjeta
        card.appendChild(compareButton);
        
        compareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (selectedProcesses.includes(index)) {
                selectedProcesses = selectedProcesses.filter(i => i !== index);
                card.classList.remove('ring-2', 'ring-green-500');
                compareButton.textContent = 'Comparar';
            } else {
                selectedProcesses.push(index);
                card.classList.add('ring-2', 'ring-green-500');
                compareButton.textContent = 'Seleccionado';
            }
            
            // Si hay 2 o más seleccionados, mostrar comparación
            if (selectedProcesses.length >= 2) {
                console.log('Comparando procesos:', selectedProcesses);
                // Aquí se podría mostrar una comparación detallada
            }
        });
    });
}

// Función para el dato clave animado
function animateKeyFact() {
    const keyFact = document.querySelector('.biomasa-slide-2 .font-bold.text-green-700');
    if (keyFact) {
        const originalText = keyFact.textContent;
        const number = parseInt(originalText);
        
        let current = 0;
        const duration = 2000;
        const increment = number / 50;
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(interval);
            }
            keyFact.textContent = Math.floor(current) + '%';
        }, duration / 50);
    }
}

// Inicializar cuando la diapositiva esté activa
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('biomasa-slide-2')) {
        setTimeout(() => {
            animateEfficiencyBars();
            createProcessComparisonChart();
            animateTemperatures();
            initializeProcessCards();
            animateProductIcons();
            setupProcessComparison();
            animateKeyFact();
        }, 100);
    }
});

// También inicializar si la diapositiva ya está activa al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('biomasa-slide-2')) {
        setTimeout(() => {
            animateEfficiencyBars();
            createProcessComparisonChart();
            animateTemperatures();
            initializeProcessCards();
            animateProductIcons();
            setupProcessComparison();
            animateKeyFact();
        }, 500);
    }
});

// Función helper para formatear números con separadores
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Añadir efecto parallax suave al scroll
document.addEventListener('DOMContentLoaded', () => {
    const slide = document.querySelector('.biomasa-slide-2 > div');
    if (slide) {
        slide.addEventListener('scroll', () => {
            const scrolled = slide.scrollTop;
            const cards = slide.querySelectorAll('.process-card');
            
            cards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
        });
    }
});



// ===== FUNCIONALIDAD PARA DIAPOSITIVA 6: BIOMASA - ANÁLISIS Y CASOS DE ÉXITO =====

// Función para animar los contadores de proyección
function animateProjectionCounters() {
    const counters = document.querySelectorAll('.biomasa-slide-3 .counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Función para animar las ventajas
function animateAdvantages() {
    const advantages = document.querySelectorAll('.advantage-item');
    
    advantages.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 150));
    });
}

// Función para animar los casos de éxito
function animateSuccessCases() {
    const cases = document.querySelectorAll('.success-case');
    
    cases.forEach((caseItem, index) => {
        // Animar entrada
        caseItem.style.opacity = '0';
        caseItem.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            caseItem.style.transition = 'all 0.6s ease-out';
            caseItem.style.opacity = '1';
            caseItem.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
        
        // Animar números dentro de cada caso
        const numbers = caseItem.querySelectorAll('.font-semibold');
        numbers.forEach(num => {
            const text = num.textContent;
            const match = text.match(/(\d+(?:\.\d+)?)/);
            
            if (match) {
                const value = parseFloat(match[1]);
                const suffix = text.replace(match[0], '');
                let current = 0;
                
                const animateNumber = () => {
                    const increment = value / 50;
                    current += increment;
                    
                    if (current < value) {
                        num.textContent = (text.includes('.') ? current.toFixed(1) : Math.floor(current)) + suffix;
                        requestAnimationFrame(animateNumber);
                    } else {
                        num.textContent = text;
                    }
                };
                
                setTimeout(animateNumber, 1000 + (index * 200));
            }
        });
    });
}

// Función para los retos interactivos
function setupChallengeInteraction() {
    const challenges = document.querySelectorAll('.challenge-item');
    
    challenges.forEach((challenge, index) => {
        // Animación de entrada
        challenge.style.opacity = '0';
        challenge.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            challenge.style.transition = 'all 0.4s ease-out';
            challenge.style.opacity = '1';
            challenge.style.transform = 'scale(1)';
        }, 500 + (index * 100));
        
        // Interacción al click
        challenge.addEventListener('click', function() {
            const badge = this.querySelector('.bg-orange-200');
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);
            
            // Mostrar más info (preparado para futuras funcionalidades)
            console.log('Reto seleccionado:', this.querySelector('h4').textContent);
        });
    });
}

// Función para crear un mini gráfico de tendencia
function createTrendVisualization() {
    const projectionDiv = document.querySelector('.biomasa-slide-3 .bg-gradient-to-r.from-green-100');
    if (!projectionDiv) return;
    
    // Crear un pequeño canvas para mostrar tendencia
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 60;
    canvas.style.width = '100%';
    canvas.style.height = '60px';
    canvas.style.marginTop = '10px';
    canvas.style.opacity = '0';
    
    projectionDiv.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Dibujar línea de tendencia simple
    setTimeout(() => {
        canvas.style.transition = 'opacity 0.5s ease-in';
        canvas.style.opacity = '1';
        
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Puntos de la tendencia
        const points = [
            {x: 20, y: 50},
            {x: 60, y: 45},
            {x: 100, y: 35},
            {x: 140, y: 20},
            {x: 180, y: 10}
        ];
        
        // Dibujar línea
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point, index) => {
            if (index > 0) {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
        
        // Añadir puntos
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#10B981';
            ctx.fill();
        });
    }, 2000);
}

// Función para tooltips informativos
function addInfoTooltips() {
    const tooltips = {
        'Carbono Neutral': 'El CO₂ emitido se compensa con el absorbido durante el crecimiento',
        'Gestión de Residuos': 'Convierte residuos problemáticos en recursos valiosos',
        'Generación de Empleo': 'Incluye empleos en agricultura, logística, operación y mantenimiento',
        'Almacenable': 'A diferencia de solar/eólica, la biomasa se puede almacenar y usar cuando se necesite'
    };
    
    document.querySelectorAll('.advantage-item h4').forEach(title => {
        if (tooltips[title.textContent]) {
            title.parentElement.setAttribute('title', tooltips[title.textContent]);
        }
    });
}

// Función para animar el indicador de madurez
function animateTechMaturity() {
    const bars = document.querySelectorAll('.biomasa-slide-3 .w-2.h-6');
    bars.forEach((bar, index) => {
        if (index < 4) {
            bar.classList.add('bg-green-500');
            bar.classList.remove('bg-gray-300');
        }
    });
}

// Inicializar cuando la diapositiva esté activa
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('biomasa-slide-3')) {
        setTimeout(() => {
            animateProjectionCounters();
            animateAdvantages();
            animateSuccessCases();
            setupChallengeInteraction();
            createTrendVisualization();
            addInfoTooltips();
            animateTechMaturity();
        }, 100);
    }
});

// También inicializar si la diapositiva ya está activa al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('biomasa-slide-3')) {
        setTimeout(() => {
            animateProjectionCounters();
            animateAdvantages();
            animateSuccessCases();
            setupChallengeInteraction();
            createTrendVisualization();
            addInfoTooltips();
            animateTechMaturity();
        }, 500);
    }
});

// Navegación al siguiente tema
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.biomasa-slide-3 button');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            Reveal.next();
        });
    }
});



// Función para comparación visual entre países
function createCountryComparison() {
    const cases = document.querySelectorAll('.success-case');
    const comparisonData = [];
    
    cases.forEach(caseElement => {
        const country = caseElement.querySelector('h4').textContent.split(',')[1]?.trim() || '';
        const stats = caseElement.querySelectorAll('.font-semibold');
        
        stats.forEach(stat => {
            const value = stat.textContent;
            const label = stat.nextElementSibling?.textContent || '';
            comparisonData.push({ country, value, label });
        });
    });
    
    // Log para futura visualización comparativa
    console.log('Datos de comparación:', comparisonData);
}

// Función para efecto parallax en scroll
function setupParallaxEffect() {
    const slide = document.querySelector('.biomasa-slide-3 > div');
    if (!slide) return;
    
    slide.addEventListener('scroll', () => {
        const scrolled = slide.scrollTop;
        
        // Parallax en las tarjetas de casos de éxito
        const cases = slide.querySelectorAll('.success-case');
        cases.forEach((caseElement, index) => {
            const speed = 0.5 + (index * 0.1);
            caseElement.style.transform = `translateY(${scrolled * speed * 0.05}px)`;
        });
        
        // Parallax en el fondo
        const bgPattern = slide.parentElement.querySelector('.absolute.inset-0');
        if (bgPattern) {
            bgPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Función para resaltar datos importantes
function highlightKeyData() {
    // Resaltar porcentajes y números clave
    const keyNumbers = document.querySelectorAll('.biomasa-slide-3 .font-bold.text-green-700, .biomasa-slide-3 .font-bold.text-blue-700, .biomasa-slide-3 .font-bold.text-purple-700');
    
    keyNumbers.forEach((number, index) => {
        number.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.textShadow = '0 0 10px rgba(0,0,0,0.2)';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    });
}

// Función para crear efecto de progreso en las soluciones
function animateSolutionProgress() {
    const solutions = document.querySelectorAll('.challenge-item');
    
    solutions.forEach((solution, index) => {
        const badge = solution.querySelector('.bg-orange-200');
        if (badge) {
            // Crear barra de progreso visual
            const progressBar = document.createElement('div');
            progressBar.className = 'w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden';
            
            const progress = document.createElement('div');
            progress.className = 'h-full bg-orange-400 rounded-full transition-all duration-1000';
            progress.style.width = '0%';
            
            progressBar.appendChild(progress);
            solution.appendChild(progressBar);
            
            // Animar según el tipo de badge
            setTimeout(() => {
                const progressValues = {
                    'Mitigable': '90%',
                    'Gestionable': '80%',
                    'Controlable': '85%',
                    'Recuperable': '75%'
                };
                
                const badgeText = badge.textContent;
                progress.style.width = progressValues[badgeText] || '70%';
            }, 1500 + (index * 200));
        }
    });
}

// Función para mostrar/ocultar detalles adicionales
function setupExpandableContent() {
    const advantages = document.querySelectorAll('.advantage-item');
    
    advantages.forEach(advantage => {
        // Crear contenedor de detalles expandibles
        const details = document.createElement('div');
        details.className = 'mt-2 text-xs text-gray-500 overflow-hidden transition-all duration-300';
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        
        // Contenido adicional según la ventaja
        const additionalInfo = {
            'Carbono Neutral': 'Certificado por protocolos internacionales como ISO 14064',
            'Gestión de Residuos': 'Reduce costos de disposición final en 60-80%',
            'Generación de Empleo': 'Principalmente en zonas rurales, promoviendo desarrollo local',
            'Almacenable': 'Pellets pueden almacenarse por años sin pérdida significativa de energía'
        };
        
        const title = advantage.querySelector('h4').textContent;
        details.textContent = additionalInfo[title] || '';
        
        advantage.appendChild(details);
        
        // Toggle al hacer click
        advantage.addEventListener('click', function() {
            const isExpanded = details.style.maxHeight !== '0px';
            
            if (isExpanded) {
                details.style.maxHeight = '0';
                details.style.opacity = '0';
            } else {
                details.style.maxHeight = '50px';
                details.style.opacity = '1';
            }
        });
    });
}

// Función para sincronizar animaciones
function synchronizeAnimations() {
    // Coordinar todas las animaciones para una entrada fluida
    const timeline = [
        { element: '.biomasa-slide-3 h2', delay: 0 },
        { element: '.advantage-item', delay: 300 },
        { element: '.challenge-item', delay: 600 },
        { element: '.success-case', delay: 900 },
        { element: '.projection-stat', delay: 1200 }
    ];
    
    timeline.forEach(item => {
        const elements = document.querySelectorAll(item.element);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${item.delay + (index * 100)}ms`;
        });
    });
}

// Función para guardar estadísticas de interacción
function trackInteractions() {
    let interactions = {
        ventajasHover: 0,
        retosClick: 0,
        casosHover: 0,
        tiempoEnSlide: 0
    };
    
    const startTime = Date.now();
    
    // Rastrear hovers y clicks
    document.querySelectorAll('.advantage-item').forEach(item => {
        item.addEventListener('mouseenter', () => interactions.ventajasHover++);
    });
    
    document.querySelectorAll('.challenge-item').forEach(item => {
        item.addEventListener('click', () => interactions.retosClick++);
    });
    
    document.querySelectorAll('.success-case').forEach(item => {
        item.addEventListener('mouseenter', () => interactions.casosHover++);
    });
    
    // Calcular tiempo en la diapositiva al salir
    Reveal.on('slidechanged', event => {
        if (!event.currentSlide.classList.contains('biomasa-slide-3')) {
            interactions.tiempoEnSlide = Math.floor((Date.now() - startTime) / 1000);
            console.log('Interacciones en Biomasa:', interactions);
        }
    });
}

// Ejecutar todas las funciones adicionales
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('biomasa-slide-3')) {
        setTimeout(() => {
            createCountryComparison();
            setupParallaxEffect();
            highlightKeyData();
            animateSolutionProgress();
            setupExpandableContent();
            synchronizeAnimations();
            trackInteractions();
        }, 1500);
    }
});

// Función para exportar datos de la diapositiva
function exportSlideData() {
    const data = {
        ventajas: [],
        retos: [],
        casos: [],
        proyecciones: {}
    };
    
    // Recopilar datos
    document.querySelectorAll('.advantage-item').forEach(item => {
        data.ventajas.push({
            titulo: item.querySelector('h4').textContent,
            descripcion: item.querySelector('p').textContent
        });
    });
    
    document.querySelectorAll('.challenge-item').forEach(item => {
        data.retos.push({
            reto: item.querySelector('h4').textContent,
            solucion: item.querySelector('p').textContent
        });
    });
    
    document.querySelectorAll('.success-case').forEach(item => {
        data.casos.push({
            pais: item.querySelector('h4').textContent,
            descripcion: item.querySelector('.text-sm.text-gray-600').textContent,
            metricas: Array.from(item.querySelectorAll('.font-semibold')).map(el => el.textContent)
        });
    });
    
    console.log('Datos de la presentación:', data);
    return data;
}

// Hacer disponible la función de exportación globalmente
window.exportBiomasaData = exportSlideData;



// ===== FUNCIONALIDAD PARA DIAPOSITIVA 7: GEOTÉRMICA - PRINCIPIOS Y TIPOS =====

// Función para dibujar el gradiente térmico
function drawThermalGradient() {
    const canvas = document.getElementById('gradientChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Ajustar tamaño del canvas
    canvas.width = width;
    canvas.height = height;
    
    // Crear gradiente de temperatura
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#3B82F6');      // Azul - superficie fría
    gradient.addColorStop(0.3, '#10B981');    // Verde - transición
    gradient.addColorStop(0.5, '#F59E0B');    // Naranja - medio
    gradient.addColorStop(0.7, '#EF4444');    // Rojo - caliente
    gradient.addColorStop(1, '#991B1B');      // Rojo oscuro - muy caliente
    
    // Dibujar el gradiente
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar la curva de temperatura
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    
    // Puntos de la curva (profundidad vs temperatura)
    const points = [
        { depth: 0, temp: 15 },      // Superficie
        { depth: 1, temp: 40 },      // 1 km
        { depth: 3, temp: 90 },      // 3 km
        { depth: 5, temp: 140 },     // 5 km
        { depth: 7, temp: 190 },     // 7 km
        { depth: 10, temp: 300 }     // 10 km
    ];
    
    // Escalar puntos al canvas
    points.forEach((point, index) => {
        const x = (point.temp / 300) * width;
        const y = (point.depth / 10) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Dibujar punto
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.stroke();
    
    // Añadir etiquetas
    ctx.fillStyle = '#374151';
    ctx.font = '11px Open Sans';
    ctx.shadowBlur = 0;
    
    // Etiquetas de profundidad
    ctx.textAlign = 'left';
    ctx.fillText('0 km', 5, 15);
    ctx.fillText('5 km', 5, height / 2);
    ctx.fillText('10 km', 5, height - 5);
    
    // Animación de partículas de calor
    animateHeatParticles(ctx, width, height);
}

// Función para animar partículas de calor
function animateHeatParticles(ctx, width, height) {
    const particles = [];
    const particleCount = 20;
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function animate() {
        // Limpiar solo las partículas (preservar el gradiente)
        particles.forEach(particle => {
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#FCD34D';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Mover partícula hacia arriba
            particle.y -= particle.speed;
            particle.x += Math.sin(particle.y * 0.01) * 0.5;
            
            // Reiniciar si sale del canvas
            if (particle.y < 0) {
                particle.y = height;
                particle.x = Math.random() * width;
            }
        });
        
        ctx.globalAlpha = 1;
    }
    
    // Animar cada 100ms
    setInterval(animate, 100);
}

// Función para animar los contadores
function animateGeothermalCounters() {
    const counters = document.querySelectorAll('.geotermica-slide-1 .counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Observer para iniciar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Función para animar las barras de recursos
function animateResourceBars() {
    const resourceTypes = document.querySelectorAll('.resource-type');
    
    resourceTypes.forEach((type, index) => {
        const bar = type.querySelector('.bg-red-600, .bg-orange-500, .bg-blue-500');
        if (bar) {
            // Obtener el ancho del porcentaje
            const width = bar.style.width;
            
            // Resetear y animar
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500 + (index * 200));
        }
        
        // Añadir efecto de temperatura al hover
        type.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.filter = 'drop-shadow(0 0 10px currentColor)';
            }
        });
        
        type.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.filter = 'none';
            }
        });
    });
}

// Función para las tarjetas de tecnología
function initializeTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach((card, index) => {
        // Animación de entrada escalonada
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 150));
        
        // Información adicional al click
        card.addEventListener('click', function() {
            const techName = this.querySelector('h5').textContent;
            const techInfo = {
                'Vapor Seco': 'Utiliza vapor directamente del reservorio. Ejemplos: The Geysers (USA), Larderello (Italia)',
                'Flash': 'Separa agua caliente en vapor y líquido. Más del 60% de plantas geotérmicas mundiales',
                'Ciclo Binario': 'Usa fluido secundario con punto de ebullición bajo. Ideal para recursos de temperatura media',
                'EGS': 'Enhanced Geothermal Systems - Inyecta agua en roca seca caliente. Potencial de 100+ GW'
            };
            
            console.log(`${techName}: ${techInfo[techName]}`);
            
            // Efecto visual de selección
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Función para animar las zonas de potencial
function animatePotentialZones() {
    const zones = document.querySelectorAll('.potential-zone');
    let totalPercentage = 0;
    
    zones.forEach((zone, index) => {
        // Extraer porcentaje
        const percentText = zone.querySelector('.text-xs.text-gray-600').textContent;
        const percent = parseInt(percentText);
        totalPercentage += percent;
        
        // Animación de entrada
        zone.style.opacity = '0';
        zone.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            zone.style.transition = 'all 0.5s ease-out';
            zone.style.opacity = '1';
            zone.style.transform = 'translateX(0)';
        }, 1500 + (index * 100));
        
        // Crear mini gráfico de barras al lado
        zone.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.w-2.h-2');
            const originalBg = dot.style.backgroundColor;
            
            // Crear barra visual temporal
            const bar = document.createElement('div');
            bar.style.position = 'absolute';
            bar.style.right = '0';
            bar.style.top = '50%';
            bar.style.transform = 'translateY(-50%)';
            bar.style.height = '4px';
            bar.style.width = '0%';
            bar.style.backgroundColor = originalBg || dot.className.includes('bg-red-600') ? '#dc2626' : 
                                       dot.className.includes('bg-orange-500') ? '#f97316' :
                                       dot.className.includes('bg-yellow-500') ? '#eab308' : '#3b82f6';
            bar.style.transition = 'width 0.3s ease-out';
            bar.style.borderRadius = '2px';
            
            this.style.position = 'relative';
            this.appendChild(bar);
            
            setTimeout(() => {
                bar.style.width = percentText;
            }, 10);
        });
        
        zone.addEventListener('mouseleave', function() {
            const bar = this.querySelector('div[style*="position: absolute"]');
            if (bar) {
                bar.style.width = '0%';
                setTimeout(() => bar.remove(), 300);
            }
        });
    });
    
    // Mostrar total restante
    console.log(`Potencial identificado: ${totalPercentage}%, Resto del mundo: ${100 - totalPercentage}%`);
}

// Función para crear efecto de pulsación en el mapa
function createMapPulseEffect() {
    const zones = document.querySelectorAll('.potential-zone');
    
    zones.forEach((zone, index) => {
        const dot = zone.querySelector('.w-2.h-2');
        
        // Crear pulso
        setInterval(() => {
            const pulse = document.createElement('div');
            pulse.style.position = 'absolute';
            pulse.style.width = '8px';
            pulse.style.height = '8px';
            pulse.style.borderRadius = '50%';
            pulse.style.backgroundColor = dot.style.backgroundColor || '#dc2626';
            pulse.style.opacity = '0.5';
            pulse.style.pointerEvents = 'none';
            
            dot.style.position = 'relative';
            dot.appendChild(pulse);
            
            // Animar pulso
            pulse.animate([
                { transform: 'scale(1)', opacity: 0.5 },
                { transform: 'scale(3)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => pulse.remove();
        }, 3000 + (index * 500));
    });
}

// Función para tooltip informativo
function addGeothermalTooltips() {
    const tooltips = {
        'Alta Entalpía': 'Recursos ideales para generación eléctrica a gran escala',
        'Media Entalpía': 'Perfectos para calefacción distrital y procesos industriales',
        'Baja Entalpía': 'Ampliamente disponibles, ideales para uso directo',
        'Cinturón de Fuego': 'Anillo del Pacífico con alta actividad volcánica',
        'Rift Africano': 'Gran valle tectónico con enorme potencial geotérmico',
        'Mediterráneo': 'Zona de convergencia de placas tectónicas',
        'Islandia': 'Líder mundial en uso geotérmico per cápita'
    };
    
    Object.keys(tooltips).forEach(key => {
        const elements = document.querySelectorAll(`h4:contains("${key}"), span:contains("${key}")`);
        elements.forEach(el => {
            if (el.textContent.includes(key)) {
                el.setAttribute('title', tooltips[key]);
            }
        });
    });
}

// Inicializar todo cuando la diapositiva esté activa
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('geotermica-slide-1')) {
        setTimeout(() => {
            drawThermalGradient();
            animateGeothermalCounters();
            animateResourceBars();
            initializeTechCards();
            animatePotentialZones();
            createMapPulseEffect();
            addGeothermalTooltips();
        }, 100);
    }
});

// También inicializar si la diapositiva ya está activa
document.addEventListener('DOMContentLoaded', () => {
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('geotermica-slide-1')) {
        setTimeout(() => {
            drawThermalGradient();
            animateGeothermalCounters();
            animateResourceBars();
            initializeTechCards();
            animatePotentialZones();
            createMapPulseEffect();
            addGeothermalTooltips();
        }, 500);
    }
});

// Función helper para el selector :contains
if (!document.querySelectorAll.__proto__.contains) {
    NodeList.prototype.contains = function(text) {
        return Array.from(this).filter(el => el.textContent.includes(text));
    };
}



// Diapositiva 8: Tecnologías de Generación Geotérmica
function initGeothermalTechSlide() {
    // Diagrama de Planta de Vapor Seco
    const dryStreamCanvas = document.getElementById('dryStreamDiagram');
    if (dryStreamCanvas) {
        const ctx = dryStreamCanvas.getContext('2d');
        drawDryStreamPlant(ctx, dryStreamCanvas);
    }

    // Diagrama de Planta Flash
    const flashCanvas = document.getElementById('flashPlantDiagram');
    if (flashCanvas) {
        const ctx = flashCanvas.getContext('2d');
        drawFlashPlant(ctx, flashCanvas);
    }

    // Diagrama de Ciclo Binario
    const binaryCanvas = document.getElementById('binaryCycleDiagram');
    if (binaryCanvas) {
        const ctx = binaryCanvas.getContext('2d');
        drawBinaryCycle(ctx, binaryCanvas);
    }

    // Gráfico de comparación de eficiencias
    const efficiencyChart = document.getElementById('efficiencyComparisonChart');
    if (efficiencyChart) {
        new Chart(efficiencyChart, {
            type: 'bar',
            data: {
                labels: ['Vapor Seco', 'Flash Simple', 'Flash Doble', 'Flash Triple', 'Ciclo Binario'],
                datasets: [{
                    label: 'Eficiencia (%)',
                    data: [20, 10, 15, 25, 12],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(251, 146, 60, 0.9)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(59, 130, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgb(239, 68, 68)',
                        'rgb(251, 146, 60)',
                        'rgb(251, 146, 60)',
                        'rgb(251, 146, 60)',
                        'rgb(59, 130, 246)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Eficiencia por Tecnología',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Gráfico de comparación de costos
    const costChart = document.getElementById('costComparisonChart');
    if (costChart) {
        new Chart(costChart, {
            type: 'line',
            data: {
                labels: ['2010', '2015', '2020', '2024', '2030*'],
                datasets: [{
                    label: 'Vapor Seco',
                    data: [0.08, 0.07, 0.06, 0.05, 0.04],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3
                }, {
                    label: 'Flash',
                    data: [0.10, 0.08, 0.07, 0.06, 0.05],
                    borderColor: 'rgb(251, 146, 60)',
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                    tension: 0.3
                }, {
                    label: 'Ciclo Binario',
                    data: [0.12, 0.10, 0.08, 0.07, 0.06],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'LCOE ($/kWh) - Evolución y Proyección',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 10,
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.15,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Función para dibujar planta de vapor seco
function drawDryStreamPlant(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const w = canvas.width;
    const h = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, w, h);
    
    // Pozo de producción
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.9);
    ctx.lineTo(w * 0.2, h * 0.4);
    ctx.stroke();
    
    // Flecha de vapor
    drawArrow(ctx, w * 0.2, h * 0.4, w * 0.4, h * 0.3, '#DC2626');
    
    // Turbina (círculo)
    ctx.fillStyle = '#7F1D1D';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.3, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Generador (rectángulo)
    ctx.fillStyle = '#991B1B';
    ctx.fillRect(w * 0.6, h * 0.25, 60, 40);
    
    // Condensador
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.4, h * 0.5, 80, 40);
    
    // Pozo de reinyección
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.8, h * 0.6);
    ctx.lineTo(w * 0.8, h * 0.9);
    ctx.stroke();
    
    // Etiquetas
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Vapor', w * 0.25, h * 0.35);
    ctx.fillText('Turbina', w * 0.45, h * 0.2);
    ctx.fillText('Generador', w * 0.58, h * 0.2);
    ctx.fillText('Condensador', w * 0.38, h * 0.65);
    ctx.fillText('Reinyección', w * 0.72, h * 0.95);
    
    // Título
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#DC2626';
    ctx.fillText('PLANTA DE VAPOR SECO', w * 0.3, h * 0.1);
}

// Función para dibujar planta flash
function drawFlashPlant(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Pozo de producción
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.9);
    ctx.lineTo(w * 0.15, h * 0.4);
    ctx.stroke();
    
    // Separador flash (triángulo)
    ctx.fillStyle = '#FB923C';
    ctx.beginPath();
    ctx.moveTo(w * 0.3, h * 0.3);
    ctx.lineTo(w * 0.25, h * 0.45);
    ctx.lineTo(w * 0.35, h * 0.45);
    ctx.closePath();
    ctx.fill();
    
    // Líneas de vapor y agua
    drawArrow(ctx, w * 0.3, h * 0.3, w * 0.45, h * 0.25, '#EA580C'); // Vapor
    drawArrow(ctx, w * 0.3, h * 0.45, w * 0.3, h * 0.6, '#3B82F6'); // Agua
    
    // Turbina
    ctx.fillStyle = '#C2410C';
    ctx.beginPath();
    ctx.arc(w * 0.55, h * 0.25, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Generador
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(w * 0.65, h * 0.2, 50, 35);
    
    // Condensador
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.45, h * 0.45, 70, 35);
    
    // Torre de enfriamiento
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.7, h * 0.55);
    ctx.quadraticCurveTo(w * 0.72, h * 0.7, w * 0.75, h * 0.75);
    ctx.lineTo(w * 0.8, h * 0.75);
    ctx.quadraticCurveTo(w * 0.83, h * 0.7, w * 0.85, h * 0.55);
    ctx.stroke();
    
    // Etiquetas
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 11px Arial';
    ctx.fillText('Separador', w * 0.22, h * 0.5);
    ctx.fillText('Flash', w * 0.25, h * 0.52);
    ctx.fillText('Vapor', w * 0.35, h * 0.22);
    ctx.fillText('Turbina', w * 0.5, h * 0.15);
    ctx.fillText('Torre', w * 0.73, h * 0.82);
    
    // Título
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#EA580C';
    ctx.fillText('PLANTA FLASH', w * 0.35, h * 0.1);
}

// Función para dibujar ciclo binario
function drawBinaryCycle(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Circuito primario (geotérmico)
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    // Pozo de producción
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.8);
    ctx.lineTo(w * 0.1, h * 0.4);
    ctx.stroke();
    
    // Intercambiador de calor (rectángulo con divisiones)
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(w * 0.25, h * 0.35, 100, 60);
    ctx.strokeStyle = '#6B7280';
    ctx.strokeRect(w * 0.25, h * 0.35, 100, 60);
    
    // Divisiones del intercambiador
    for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(w * 0.25 + (i * 20), h * 0.35);
        ctx.lineTo(w * 0.25 + (i * 20), h * 0.35 + 60);
        ctx.stroke();
    }
    
    // Circuito secundario (fluido de trabajo)
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    
    // Línea del fluido secundario
    ctx.beginPath();
    ctx.moveTo(w * 0.25 + 100, h * 0.4);
    ctx.lineTo(w * 0.5, h * 0.3);
    ctx.stroke();
    
    // Turbina del ciclo binario
    ctx.setLineDash([]);
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(w * 0.6, h * 0.3, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Generador
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(w * 0.7, h * 0.25, 50, 35);
    
    // Condensador del ciclo binario
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.5, h * 0.5, 80, 35);
    
    // Bomba
    ctx.fillStyle = '#6B7280';
    ctx.beginPath();
    ctx.arc(w * 0.35, h * 0.6, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Flechas de flujo
    drawArrow(ctx, w * 0.1, h * 0.4, w * 0.25, h * 0.4, '#DC2626'); // Entrada agua caliente
    drawArrow(ctx, w * 0.25 + 100, h * 0.5, w * 0.9, h * 0.8, '#DC2626'); // Salida agua fría
    drawArrow(ctx, w * 0.5, h * 0.3, w * 0.55, h * 0.3, '#3B82F6'); // Vapor al turbina
    drawArrow(ctx, w * 0.65, h * 0.3, w * 0.7, h * 0.3, '#3B82F6'); // Turbina a generador
    
    // Etiquetas
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 11px Arial';
    ctx.fillText('Agua', w * 0.05, h * 0.35);
    ctx.fillText('Geotérmica', w * 0.02, h * 0.37);
    ctx.fillText('Intercambiador', w * 0.24, h * 0.32);
    ctx.fillText('de Calor', w * 0.26, h * 0.34);
    ctx.fillText('Fluido', w * 0.4, h * 0.25);
    ctx.fillText('Secundario', w * 0.38, h * 0.27);
    ctx.fillText('Turbina', w * 0.55, h * 0.2);
    ctx.fillText('Generador', w * 0.68, h * 0.2);
    ctx.fillText('Condensador', w * 0.48, h * 0.62);
    ctx.fillText('Bomba', w * 0.32, h * 0.68);
    
    // Leyenda
    ctx.font = '10px Arial';
    ctx.fillStyle = '#DC2626';
    ctx.fillText('— Circuito Geotérmico', w * 0.05, h * 0.95);
    ctx.fillStyle = '#3B82F6';
    ctx.fillText('- - - Circuito Binario', w * 0.35, h * 0.95);
    
    // Título
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#3B82F6';
    ctx.fillText('PLANTA DE CICLO BINARIO', w * 0.3, h * 0.1);
}

// Función auxiliar para dibujar flechas
function drawArrow(ctx, fromX, fromY, toX, toY, color) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    
    // Línea principal
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Cabeza de flecha
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}

// Animación de barras de eficiencia (similar a diapositivas anteriores)
function animateGeothermalEfficiencyBars() {
    const efficiencyBars = document.querySelectorAll('.geotermica-slide-2 .efficiency-bar');
    efficiencyBars.forEach(bar => {
        const efficiency = bar.dataset.efficiency;
        setTimeout(() => {
            bar.style.width = efficiency + '%';
        }, 500);
    });
}

// Función para animar los contadores de la diapositiva 8
function animateGeothermalTechCounters() {
    const counters = document.querySelectorAll('.geotermica-slide-2 .counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Efecto hover para las tarjetas de innovación
function initGeothermalInnovationCards() {
    const innovationItems = document.querySelectorAll('.innovation-item');
    
    innovationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Inicialización cuando se muestra la diapositiva 8
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('geotermica-slide-2')) {
        setTimeout(() => {
            initGeothermalTechSlide();
            animateGeothermalEfficiencyBars();
            animateGeothermalTechCounters();
            initGeothermalInnovationCards();
        }, 300);
    }
});

// También inicializar si la diapositiva ya está visible al cargar
Reveal.on('ready', event => {
    if (event.currentSlide.classList.contains('geotermica-slide-2')) {
        initGeothermalTechSlide();
        animateGeothermalEfficiencyBars();
        animateGeothermalTechCounters();
        initGeothermalInnovationCards();
    }
});

// Redimensionar canvas cuando cambie el tamaño de la ventana
window.addEventListener('resize', () => {
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide && currentSlide.classList.contains('geotermica-slide-2')) {
        initGeothermalTechSlide();
    }
});



// Diapositiva 9: Análisis Integral Geotérmico
function initGeothermalAnalysisSlide() {
    // Animar barra de crecimiento
    animateGeothermalGrowthBar();
    
    // Inicializar gráficos de comparación
    initCapacityFactorRadar();
    initLCOEComparison();
    initEmissionsComparison();
    initLifespanComparison();
    
    // Animar contadores
    animateGeothermalAnalysisCounters();
    
    // Efectos hover para tarjetas
    initGeothermalCardEffects();
}

// Animar barra de crecimiento proyectado
function animateGeothermalGrowthBar() {
    const growthBar = document.querySelector('.geothermal-growth-bar');
    if (growthBar) {
        setTimeout(() => {
            growthBar.style.width = '87%';
        }, 500);
    }
}

// Gráfico radar de factor de capacidad
function initCapacityFactorRadar() {
    const canvas = document.getElementById('capacityFactorRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Disponibilidad', 'Confiabilidad', 'Predictibilidad'],
            datasets: [{
                label: 'Geotérmica',
                data: [95, 98, 99],
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgb(239, 68, 68)',
                pointBackgroundColor: 'rgb(239, 68, 68)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(239, 68, 68)'
            }, {
                label: 'Solar',
                data: [25, 70, 60],
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                borderColor: 'rgb(251, 191, 36)',
                pointBackgroundColor: 'rgb(251, 191, 36)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(251, 191, 36)'
            }, {
                label: 'Eólica',
                data: [35, 75, 50],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Gráfico de comparación LCOE
function initLCOEComparison() {
    const canvas = document.getElementById('lcoeComparison');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Geotérmica', 'Carbón', 'Gas Natural'],
            datasets: [{
                data: [75, 95, 85],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                    'rgba(156, 163, 175, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': $' + context.parsed + '/MWh';
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de comparación de emisiones
function initEmissionsComparison() {
    const canvas = document.getElementById('emissionsComparison');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Gráfico de barras horizontales mini
    const data = {
        geothermal: 20,
        solar: 48,
        wind: 11,
        coal: 820,
        gas: 490
    };
    
    // Dibujar manualmente para mejor control
    canvas.width = 120;
    canvas.height = 120;
    
    ctx.clearRect(0, 0, 120, 120);
    
    // Dibujar barras
    const barHeight = 20;
    const maxValue = 820;
    const colors = ['#DC2626', '#F59E0B', '#3B82F6', '#6B7280', '#9CA3AF'];
    const labels = ['Geo', 'Solar', 'Eólica', 'Carbón', 'Gas'];
    const values = [20, 48, 11, 820, 490];
    
    values.forEach((value, index) => {
        const barWidth = (value / maxValue) * 100;
        const y = index * (barHeight + 5) + 10;
        
        // Barra
        ctx.fillStyle = colors[index];
        ctx.fillRect(10, y, barWidth, barHeight);
        
        // Etiqueta
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.fillText(labels[index], 10, y - 2);
    });
}

// Gráfico de comparación de vida útil
function initLifespanComparison() {
    const canvas = document.getElementById('lifespanComparison');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Geotérmica', 'Solar', 'Eólica', 'Hidro'],
            datasets: [{
                data: [65, 25, 20, 80],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(251, 191, 36, 0.6)',
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(16, 185, 129, 0.6)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' años';
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}

// Animar contadores
function animateGeothermalAnalysisCounters() {
    const counters = document.querySelectorAll('.geotermica-slide-3 .counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación con un pequeño retraso
        setTimeout(updateCounter, 300);
    });
}

// Efectos interactivos para tarjetas
function initGeothermalCardEffects() {
    // Efecto parallax suave en casos de éxito
    const successCards = document.querySelectorAll('.success-case-card');
    successCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Animación de entrada escalonada para ventajas
    const advantageCards = document.querySelectorAll('.geotermica-slide-3 .advantage-card');
    advantageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100 * index);
    });
    
    // Animación de entrada para desafíos
    const challengeCards = document.querySelectorAll('.challenge-solution-card');
    challengeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index + 400);
    });
    
    // Efecto de pulso en mini casos al hover
    const miniCases = document.querySelectorAll('.mini-case');
    miniCases.forEach(miniCase => {
        miniCase.addEventListener('mouseenter', function() {
            const flag = this.querySelector('span');
            flag.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        miniCase.addEventListener('mouseleave', function() {
            const flag = this.querySelector('span');
            flag.style.animation = 'none';
        });
    });
}

// Animación de pulso para banderas
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Función para animar las barras de comparación mini
function animateComparisonMiniBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.comparison-mini-bar .bg-blue-500, .comparison-mini-bar .bg-gray-400');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        if (bar.classList.contains('bg-blue-500')) {
                            bar.style.width = '10%';
                        } else {
                            bar.style.width = '60%';
                        }
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const comparisonBars = document.querySelectorAll('.comparison-mini-bar');
    comparisonBars.forEach(bar => observer.observe(bar));
}

// Efecto de revelado progresivo para estadísticas
function revealStats() {
    const stats = document.querySelectorAll('.stat-mini');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.4s ease-out';
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
        }, 100 * index + 500);
    });
}

// Función para crear efecto de onda en click
function createRippleEffect() {
    const clickableCards = document.querySelectorAll('.success-case-card, .advantage-card, .challenge-solution-card');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// CSS para efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Inicialización cuando se muestra la diapositiva 9
Reveal.on('slidechanged', event => {
    if (event.currentSlide.classList.contains('geotermica-slide-3')) {
        setTimeout(() => {
            initGeothermalAnalysisSlide();
            animateComparisonMiniBars();
            revealStats();
            createRippleEffect();
        }, 300);
    }
});

// También inicializar si la diapositiva ya está visible al cargar
Reveal.on('ready', event => {
    if (event.currentSlide.classList.contains('geotermica-slide-3')) {
        initGeothermalAnalysisSlide();
        animateComparisonMiniBars();
        revealStats();
        createRippleEffect();
    }
});

// Función para manejar el resize de los gráficos
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentSlide = Reveal.getCurrentSlide();
        if (currentSlide && currentSlide.classList.contains('geotermica-slide-3')) {
            // Destruir y recrear los gráficos para ajustar al nuevo tamaño
            Chart.helpers.each(Chart.instances, (instance) => {
                instance.destroy();
            });
            initGeothermalAnalysisSlide();
        }
    }, 250);
});

// Función para exportar datos (opcional - para interactividad futura)
function exportGeothermalData() {
    const data = {
        advantages: {
            capacityFactor: '90-95%',
            landFootprint: '1-8 ha/MW',
            lifespan: '50-80 years',
            emissions: '10-30 g CO₂/kWh'
        },
        globalLeaders: {
            iceland: { heating: '90%', electricity: '30%', capacity: '755 MW' },
            kenya: { electricityMix: '47%', capacity: '963 MW', target2030: '5 GW' },
            newZealand: { electricity: '18%', capacity: '1 GW', tourism: '$1B/year' },
            philippines: { capacity: '1.9 GW', rank: '2nd global' },
            indonesia: { potential: '29 GW', status: 'Largest potential' }
        },
        projection2030: {
            globalCapacity: '30 GW',
            growth: '+87% vs 2024'
        }
    };
    
    console.log('Geothermal Energy Analysis Data:', data);
    return data;
}


// ===== FUNCIONES PARA DIAPOSITIVAS DE ENERGÍA MAREOMOTRIZ =====

// Función para inicializar las diapositivas de mareomotriz cuando se activen
function initTidalSlides(slideIndex) {
    // Determinar qué diapositiva de mareomotriz es
    if (slideIndex === 9) { // Diapositiva 10 (índice 9)
        initTidalSlide1();
    } else if (slideIndex === 10) { // Diapositiva 11 (índice 10)
        initTidalSlide2();
    } else if (slideIndex === 11) { // Diapositiva 12 (índice 11)
        initTidalSlide3();
    }
}

// ===== DIAPOSITIVA 10: PRINCIPIOS Y FUNDAMENTOS =====
function initTidalSlide1() {
    console.log('Inicializando diapositiva 10: Energía Mareomotriz - Principios');
    
    // Animar contadores
    animateTidalCounters();
    
    // Crear gráfico de potencial mareomotriz
    createTidalPotentialChart();
    
    // Crear visualización del ciclo de mareas
    createTidalCycleVisualization();
    
    // Cargar imagen de fondo con Pexels
    loadTidalBackgroundImage();
}

// Función para animar contadores específicos de mareomotriz
function animateTidalCounters() {
    const counters = document.querySelectorAll('.mareomotriz-slide-1 .counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, 0, target, 2000);
    });
}

// Crear gráfico de potencial mareomotriz
function createTidalPotentialChart() {
    const canvas = document.getElementById('tidalPotentialChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Explotable', 'Técnicamente viable', 'Teórico no viable'],
            datasets: [{
                data: [300, 500, 400],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(6, 182, 212, 0.6)',
                    'rgba(156, 163, 175, 0.4)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(6, 182, 212, 1)',
                    'rgba(156, 163, 175, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' TWh/año';
                        }
                    }
                }
            }
        }
    });
}

// Crear visualización del ciclo de mareas
function createTidalCycleVisualization() {
    const canvas = document.getElementById('tidalCycleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar onda sinusoidal para representar las mareas
    let time = 0;
    const amplitude = height / 3;
    const centerY = height / 2;
    
    function drawTidalWave() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo gradiente
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.1)');
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar línea central
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar onda
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const y = centerY + Math.sin((x / width) * Math.PI * 2 + time) * amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Dibujar área bajo la curva
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        
        for (let x = 0; x < width; x++) {
            const y = centerY + Math.sin((x / width) * Math.PI * 2 + time) * amplitude;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, centerY);
        ctx.closePath();
        ctx.fill();
        
        // Animar
        time += 0.02;
        requestAnimationFrame(drawTidalWave);
    }
    
    drawTidalWave();
}

// ===== DIAPOSITIVA 11: PROYECTOS EMBLEMÁTICOS =====
function initTidalSlide2() {
    console.log('Inicializando diapositiva 11: Proyectos Mareomotrices');
    
    // Animar contadores
    const counters = document.querySelectorAll('.mareomotriz-slide-2 .counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, 0, target, 2000);
    });
    
    // Crear diagramas de proyectos
    createLaRanceDiagram();
    createSihwaDiagram();
    
    // Crear gráficos de comparación
    createTechComparisonChart();
    createCostEfficiencyChart();
}

// Diagrama de La Rance
function createLaRanceDiagram() {
    const canvas = document.getElementById('laRanceDiagram');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Dibujar esquema simplificado de la planta
    ctx.clearRect(0, 0, width, height);
    
    // Fondo
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar presa
    ctx.fillStyle = '#64748b';
    ctx.fillRect(width/3, height/2 - 20, width/3, 40);
    
    // Dibujar turbinas
    const turbineCount = 6;
    const turbineWidth = (width/3) / turbineCount;
    
    for (let i = 0; i < turbineCount; i++) {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(width/3 + turbineWidth * i + turbineWidth/2, height/2, 10, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Etiquetas
    ctx.fillStyle = '#1f2937';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Océano', width/6, height/2);
    ctx.fillText('Estuario', 5*width/6, height/2);
    ctx.fillText('24 Turbinas Bulbo', width/2, height - 20);
}

// Diagrama de Sihwa
function createSihwaDiagram() {
    const canvas = document.getElementById('sihwaDiagram');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Fondo
    ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar lago
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.beginPath();
    ctx.ellipse(width/2, height/2, width/3, height/3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Dibujar barrera
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(width/2, height/2, width/3, -Math.PI/4, Math.PI/4);
    ctx.stroke();
    
    // Turbinas en la barrera
    ctx.fillStyle = '#06b6d4';
    for (let i = 0; i < 5; i++) {
        const angle = -Math.PI/4 + (Math.PI/2) * i / 4;
        const x = width/2 + Math.cos(angle) * width/3;
        const y = height/2 + Math.sin(angle) * height/3;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Etiquetas
    ctx.fillStyle = '#1f2937';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Lago Sihwa', width/2, height/2);
    ctx.fillText('Mar Amarillo', width - 60, height/2);
}

// Gráfico de comparación de tecnologías
function createTechComparisonChart() {
    const canvas = document.getElementById('techComparisonChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Eficiencia', 'Madurez', 'Costo', 'Impacto Ambiental', 'Potencial'],
            datasets: [{
                label: 'Presas',
                data: [80, 95, 40, 30, 70],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }, {
                label: 'Turbinas',
                data: [70, 60, 70, 80, 85],
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                borderColor: 'rgba(6, 182, 212, 1)',
                borderWidth: 2
            }, {
                label: 'Lagunas',
                data: [75, 40, 60, 90, 90],
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                borderColor: 'rgba(20, 184, 166, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: {
                            size: 10
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de costo-eficiencia
function createCostEfficiencyChart() {
    const canvas = document.getElementById('costEfficiencyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Proyectos Actuales',
                data: [
                    {x: 0.18, y: 240, name: 'La Rance'},
                    {x: 0.15, y: 254, name: 'Sihwa'},
                    {x: 0.12, y: 20, name: 'Annapolis'},
                    {x: 0.16, y: 1.7, name: 'Jiangxia'}
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                pointRadius: 8
            }, {
                label: 'Proyectos Futuros',
                data: [
                    {x: 0.10, y: 320, name: 'Swansea Bay'},
                    {x: 0.08, y: 398, name: 'MeyGen'},
                    {x: 0.09, y: 2500, name: 'Fundy'}
                ],
                backgroundColor: 'rgba(6, 182, 212, 0.8)',
                borderColor: 'rgba(6, 182, 212, 1)',
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'LCOE ($/kWh)',
                        font: {
                            size: 12
                        }
                    },
                    min: 0.05,
                    max: 0.20
                },
                y: {
                    title: {
                        display: true,
                        text: 'Capacidad (MW)',
                        font: {
                            size: 12
                        }
                    },
                    type: 'logarithmic'
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {                             size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return point.name + ': ' + point.y + ' MW @ $' + point.x + '/kWh';
                        }
                    }
                }
            }
        }
    });
}

// ===== DIAPOSITIVA 12: DESAFÍOS Y FUTURO =====
function initTidalSlide3() {
    console.log('Inicializando diapositiva 12: Desafíos y Futuro Mareomotriz');
    
    // Crear gráfico de proyecciones
    createTidalProjectionChart();
    
    // Animar barras de progreso de mercados
    animateMarketBars();
    
    // Efectos hover para cards
    initializeTidalCardEffects();
}

// Gráfico de proyecciones futuras
function createTidalProjectionChart() {
    const canvas = document.getElementById('tidalProjectionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2026', '2028', '2030', '2035', '2040', '2045', '2050'],
            datasets: [{
                label: 'Capacidad Instalada (GW)',
                data: [0.53, 2, 5, 15, 35, 60, 85, 120],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Escenario Conservador',
                data: [0.53, 1.5, 3, 8, 20, 35, 50, 70],
                borderColor: 'rgba(156, 163, 175, 1)',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Capacidad (GW)',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    cornerRadius: 4,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    }
                }
            }
        }
    });
}

// Animar barras de mercados
function animateMarketBars() {
    const marketBars = document.querySelectorAll('.mareomotriz-slide-3 .market-item .bg-blue-600, .mareomotriz-slide-3 .market-item .bg-cyan-600, .mareomotriz-slide-3 .market-item .bg-teal-600, .mareomotriz-slide-3 .market-item .bg-indigo-600');
    
    marketBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, 200 * index);
    });
}

// Efectos para cards de mareomotriz
function initializeTidalCardEffects() {
    // Efecto hover para tech-type cards
    const techCards = document.querySelectorAll('.tech-type');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
    
    // Efecto para challenge cards
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Efecto para solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Función para cargar imagen de fondo con Pexels
async function loadTidalBackgroundImage() {
    const PEXELS_API_KEY = '59ArUEH8Zpzl4LMcSJ47Flq09GQTMVONA3ypWJiMs8C6kXfxSR9zMMRC';
    
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=ocean+waves+tidal&per_page=5', {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            // Seleccionar una imagen aleatoria
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            const photo = data.photos[randomIndex];
            
            // Aplicar la imagen como fondo
            const tidalSlides = document.querySelectorAll('.mareomotriz-slide-1, .mareomotriz-slide-2, .mareomotriz-slide-3');
            tidalSlides.forEach(slide => {
                const bgDiv = slide.querySelector('.absolute.inset-0.opacity-5');
                if (bgDiv) {
                    bgDiv.style.backgroundImage = `url(${photo.src.large}), ${bgDiv.style.backgroundImage}`;
                    bgDiv.style.backgroundSize = 'cover';
                    bgDiv.style.backgroundPosition = 'center';
                    bgDiv.style.backgroundBlendMode = 'multiply';
                }
            });
        }
    } catch (error) {
        console.error('Error cargando imagen de Pexels:', error);
    }
}

// Función auxiliar para animar contadores (reutilizable)
function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== INTEGRACIÓN CON REVEAL.JS =====

// Detectar cuando se muestra una diapositiva de mareomotriz
Reveal.on('slidechanged', event => {
    const currentSlide = event.currentSlide;
    
    // Verificar si es una diapositiva de mareomotriz
    if (currentSlide.classList.contains('mareomotriz-slide-1')) {
        initTidalSlide1();
    } else if (currentSlide.classList.contains('mareomotriz-slide-2')) {
        initTidalSlide2();
    } else if (currentSlide.classList.contains('mareomotriz-slide-3')) {
        initTidalSlide3();
    }
});

// También inicializar si ya estamos en una diapositiva de mareomotriz al cargar
document.addEventListener('DOMContentLoaded', function() {
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide) {
        if (currentSlide.classList.contains('mareomotriz-slide-1')) {
            setTimeout(() => initTidalSlide1(), 500);
        } else if (currentSlide.classList.contains('mareomotriz-slide-2')) {
            setTimeout(() => initTidalSlide2(), 500);
        } else if (currentSlide.classList.contains('mareomotriz-slide-3')) {
            setTimeout(() => initTidalSlide3(), 500);
        }
    }
});

// ===== AJUSTES DE TAMAÑO DE FUENTE =====

// Función para ajustar tamaños de fuente en las diapositivas de mareomotriz
function adjustTidalFontSizes() {
    // Ajustar títulos principales
    const mainTitles = document.querySelectorAll('.mareomotriz-slide-1 h2, .mareomotriz-slide-2 h2, .mareomotriz-slide-3 h2');
    mainTitles.forEach(title => {
        // Cambiar de text-3xl md:text-4xl lg:text-5xl a tamaños más pequeños
        title.classList.remove('text-5xl', 'lg:text-5xl');
        title.classList.add('text-3xl', 'md:text-4xl', 'lg:text-4xl');
    });
    
    // Ajustar subtítulos
    const subTitles = document.querySelectorAll('.mareomotriz-slide-1 h3, .mareomotriz-slide-2 h3, .mareomotriz-slide-3 h3');
    subTitles.forEach(subtitle => {
        subtitle.classList.remove('text-xl');
        subtitle.classList.add('text-lg');
    });
    
    // Ajustar h4
    const h4Titles = document.querySelectorAll('.mareomotriz-slide-1 h4, .mareomotriz-slide-2 h4, .mareomotriz-slide-3 h4');
    h4Titles.forEach(h4 => {
        if (!h4.classList.contains('text-sm')) {
            h4.classList.add('text-base');
        }
    });
}

// Ejecutar ajustes de fuente al cargar
document.addEventListener('DOMContentLoaded', adjustTidalFontSizes);

// ===== FUNCIONES DE UTILIDAD ADICIONALES =====

// Función para mostrar información adicional al hacer clic en elementos
function showTidalInfo(type) {
    const infoData = {
        'presa': {
            title: 'Presas de Marea',
            content: 'Las presas de marea son estructuras similares a las presas hidroeléctricas convencionales, pero diseñadas para aprovechar el movimiento de las mareas. Funcionan permitiendo que el agua entre durante la marea alta y luego la liberan a través de turbinas durante la marea baja.'
        },
        'turbina': {
            title: 'Turbinas de Corriente',
            content: 'Las turbinas de corriente mareomotriz funcionan de manera similar a las turbinas eólicas, pero bajo el agua. Aprovechan las corrientes de marea sin necesidad de construir barreras, lo que reduce significativamente el impacto ambiental.'
        },
        'laguna': {
            title: 'Lagunas de Marea',
            content: 'Las lagunas de marea son embalses artificiales construidos en la costa que capturan agua durante la marea alta. Ofrecen la ventaja de poder generar energía en ambas direcciones del flujo de marea y pueden integrarse con otros usos como recreación y conservación.'
        }
    };
    
    // Aquí podrías mostrar un modal o tooltip con la información
    console.log('Información adicional:', infoData[type]);
}

// Event listeners para elementos interactivos
document.addEventListener('DOMContentLoaded', function() {
    // Hacer clickables las cards de tecnología
    document.querySelectorAll('.tech-type').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent.toLowerCase();
            if (title.includes('presa')) showTidalInfo('presa');
            else if (title.includes('turbina')) showTidalInfo('turbina');
            else if (title.includes('laguna')) showTidalInfo('laguna');
        });
    });
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.tidalEnergy = {
    initSlide1: initTidalSlide1,
    initSlide2: initTidalSlide2,
    initSlide3: initTidalSlide3,
    adjustFontSizes: adjustTidalFontSizes
};

console.log('✅ JavaScript de Energía Mareomotriz cargado correctamente');
                            



// ===== FUNCIONES PARA DIAPOSITIVAS DE SOLAR TÉRMICA =====

// Inicializar diapositivas de solar térmica
function initSolarTermicaSlides(slideIndex) {
    if (slideIndex === 14) { // Diapositiva 15
        initSolarSlide1();
    } else if (slideIndex === 15) { // Diapositiva 16
        initSolarSlide2();
    } else if (slideIndex === 16) { // Diapositiva 17
        initSolarSlide3();
    }
}

// Diapositiva 15: Fundamentos
function initSolarSlide1() {
    // Animar contadores
    animateCounters('.solar-termica-slide-1 .counter');
    
    // Crear gráfico de capacidad global
    createCSPGlobalChart();
}

// Diapositiva 16: Proyectos
function initSolarSlide2() {
    // Efectos hover para proyectos
    initProjectHoverEffects();
}

// Diapositiva 17: Futuro
function initSolarSlide3() {
    // Crear gráfico de proyecciones
    createCSPProjectionChart();
    
    // Animar barras de mercados
    animateMarketBars('.solar-termica-slide-3');
}

// Gráfico de capacidad global CSP
function createCSPGlobalChart() {
    const canvas = document.getElementById('cspGlobalChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['España', 'USA', 'China', 'India', 'Marruecos', 'Otros'],
            datasets: [{
                label: 'Capacidad Instalada (MW)',
                data: [2300, 1738, 538, 225, 530, 469],
                backgroundColor: [
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(220, 38, 38, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(156, 163, 175, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'MW',
                        font: { size: 11 }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Gráfico de proyecciones CSP
function createCSPProjectionChart() {
    const canvas = document.getElementById('cspProjectionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2030', '2035', '2040', '2045', '2050'],
            datasets: [{
                label: 'Capacidad CSP (GW)',
                data: [6.8, 100, 250, 450, 650, 800],
                borderColor: 'rgba(251, 191, 36, 1)',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'GW',
                        font: { size: 11 }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Efectos hover para proyectos
function initProjectHoverEffects() {
    const projects = document.querySelectorAll('.project-showcase');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función auxiliar para animar contadores
function animateCounters(selector) {
    const counters = document.querySelectorAll(selector);
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (target - start) * progress;
            
            if (target % 1 !== 0) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Integración con Reveal.js
Reveal.on('slidechanged', event => {
    const currentSlide = event.currentSlide;
    
    if (currentSlide.classList.contains('solar-termica-slide-1')) {
        initSolarSlide1();
    } else if (currentSlide.classList.contains('solar-termica-slide-2')) {
        initSolarSlide2();
    } else if (currentSlide.classList.contains('solar-termica-slide-3')) {
        initSolarSlide3();
    }
});

// Inicializar si ya estamos en una diapositiva solar
document.addEventListener('DOMContentLoaded', function() {
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide) {
        if (currentSlide.classList.contains('solar-termica-slide-1')) {
            setTimeout(() => initSolarSlide1(), 500);
        } else if (currentSlide.classList.contains('solar-termica-slide-2')) {
            setTimeout(() => initSolarSlide2(), 500);
        } else if (currentSlide.classList.contains('solar-termica-slide-3')) {
            setTimeout(() => initSolarSlide3(), 500);
        }
    }
});
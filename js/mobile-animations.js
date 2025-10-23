// Shanghai Advent Calendar - Mobile Animations Spectacular
// Animaciones móviles flipantes para impresionar a los amigos

(function() {
    'use strict';
    
    // Configuración de animaciones
    const ANIMATION_CONFIG = {
        // Efectos de partículas
        particles: {
            enabled: true,
            count: 30,
            colors: ['#DC143C', '#FFD700', '#FFFFFF', '#8B0000'],
            speed: 2
        },
        
        // Efectos de confeti
        confetti: {
            enabled: true,
            count: 50,
            colors: ['#DC143C', '#FFD700', '#FFFFFF', '#8B0000', '#228B22'],
            duration: 3000
        },
        
        // Efectos de shake
        shake: {
            enabled: true,
            intensity: 10,
            duration: 500
        },
        
        // Efectos de zoom
        zoom: {
            enabled: true,
            scale: 1.1,
            duration: 300
        }
    };
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Efectos de partículas flotantes
    function createFloatingParticles() {
        if (!ANIMATION_CONFIG.particles.enabled || !isMobile) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < ANIMATION_CONFIG.particles.count; i++) {
            setTimeout(() => {
                createParticle(particleContainer);
            }, i * 100);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        const color = ANIMATION_CONFIG.particles.colors[Math.floor(Math.random() * ANIMATION_CONFIG.particles.colors.length)];
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endY = -10;
        const duration = Math.random() * 3 + 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 10px ${color};
            animation: floatUp ${duration}s linear forwards;
        `;
        
        container.appendChild(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Efecto de confeti espectacular
    function createConfettiExplosion(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        if (!ANIMATION_CONFIG.confetti.enabled) return;
        
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < ANIMATION_CONFIG.confetti.count; i++) {
            setTimeout(() => {
                createConfettiPiece(confettiContainer, x, y);
            }, i * 20);
        }
        
        // Remover contenedor después de la animación
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.parentNode.removeChild(confettiContainer);
            }
        }, ANIMATION_CONFIG.confetti.duration);
    }
    
    function createConfettiPiece(container, startX, startY) {
        const piece = document.createElement('div');
        const color = ANIMATION_CONFIG.confetti.colors[Math.floor(Math.random() * ANIMATION_CONFIG.confetti.colors.length)];
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * 360;
        const velocity = Math.random() * 200 + 100;
        const gravity = 0.5;
        
        piece.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${startX}px;
            top: ${startY}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            box-shadow: 0 0 5px ${color};
        `;
        
        container.appendChild(piece);
        
        // Animación física del confeti
        let x = startX;
        let y = startY;
        let vx = Math.cos(angle * Math.PI / 180) * velocity;
        let vy = Math.sin(angle * Math.PI / 180) * velocity;
        let rotation = 0;
        
        const animate = () => {
            x += vx * 0.016;
            y += vy * 0.016;
            vy += gravity;
            rotation += 5;
            
            piece.style.left = x + 'px';
            piece.style.top = y + 'px';
            piece.style.transform = `rotate(${rotation}deg)`;
            
            if (y < window.innerHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                if (piece.parentNode) {
                    piece.parentNode.removeChild(piece);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Efecto de shake para elementos
    function shakeElement(element) {
        if (!ANIMATION_CONFIG.shake.enabled) return;
        
        const intensity = ANIMATION_CONFIG.shake.intensity;
        const duration = ANIMATION_CONFIG.shake.duration;
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const x = (Math.random() - 0.5) * intensity * (1 - progress);
                const y = (Math.random() - 0.5) * intensity * (1 - progress);
                
                element.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(shake);
            } else {
                element.style.transform = 'translate(0, 0)';
            }
        };
        
        shake();
    }
    
    // Efecto de zoom para elementos
    function zoomElement(element) {
        if (!ANIMATION_CONFIG.zoom.enabled) return;
        
        const scale = ANIMATION_CONFIG.zoom.scale;
        const duration = ANIMATION_CONFIG.zoom.duration;
        
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration);
    }
    
    // Efecto de pulso dorado
    function pulseGold(element) {
        element.style.animation = 'pulseGold 1s ease-in-out infinite';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 3000);
    }
    
    // Efecto de ondas expansivas
    function createRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid #FFD700;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
            animation: ripple 1s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
    
    // Efecto de estrella brillante
    function createShiningStar() {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: 30px;
            pointer-events: none;
            z-index: 9997;
            animation: starShine 2s ease-in-out forwards;
        `;
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 2000);
    }
    
    // Efecto de dragón volador
    function createFlyingDragon() {
        const dragon = document.createElement('div');
        dragon.innerHTML = '🐉';
        dragon.style.cssText = `
            position: fixed;
            left: -50px;
            top: ${Math.random() * (window.innerHeight - 100)}px;
            font-size: 40px;
            pointer-events: none;
            z-index: 9996;
            animation: dragonFly 4s ease-in-out forwards;
        `;
        
        document.body.appendChild(dragon);
        
        setTimeout(() => {
            if (dragon.parentNode) {
                dragon.parentNode.removeChild(dragon);
            }
        }, 4000);
    }
    
    // Efecto de farolillos chinos flotantes
    function createFloatingLanterns() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const lantern = document.createElement('div');
                lantern.innerHTML = '🏮';
                lantern.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight + 20}px;
                    font-size: 25px;
                    pointer-events: none;
                    z-index: 9995;
                    animation: lanternFloat 6s ease-in-out forwards;
                `;
                
                document.body.appendChild(lantern);
                
                setTimeout(() => {
                    if (lantern.parentNode) {
                        lantern.parentNode.removeChild(lantern);
                    }
                }, 6000);
            }, i * 500);
        }
    }
    
    // Añadir estilos CSS para las animaciones
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes pulseGold {
                0%, 100% {
                    box-shadow: 0 0 5px #FFD700;
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700;
                    transform: scale(1.05);
                }
            }
            
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
            
            @keyframes starShine {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes dragonFly {
                0% {
                    transform: translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(calc(100vw + 50px)) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes lanternFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            /* Efectos de hover mejorados para móvil */
            .day-card.available:active {
                transform: scale(0.95) !important;
                transition: transform 0.1s ease !important;
            }
            
            .day-card.available:active::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                border-radius: 50%;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            }
            
            /* Efectos de vibración para móvil */
            .vibrate {
                animation: vibrate 0.3s ease-in-out;
            }
            
            @keyframes vibrate {
                0%, 100% { transform: translate(0); }
                25% { transform: translate(-2px, 2px); }
                50% { transform: translate(2px, -2px); }
                75% { transform: translate(-2px, -2px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Event listeners para efectos interactivos
    function addInteractiveEffects() {
        // Efecto al tocar días disponibles
        document.addEventListener('touchstart', function(e) {
            const dayCard = e.target.closest('.day-card.available');
            if (dayCard) {
                shakeElement(dayCard);
                zoomElement(dayCard);
                pulseGold(dayCard);
                
                // Crear efecto de ondas
                const rect = dayCard.getBoundingClientRect();
                createRippleEffect(rect.left + rect.width/2, rect.top + rect.height/2);
                
                // Vibración del dispositivo (si está disponible)
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }
                
                // Sonido de click
                if (window.playSound) {
                    window.playSound('click');
                }
            }
        });
        
        // Efecto al hacer scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (Math.abs(currentScrollY - lastScrollY) > 50) {
                // Crear estrella brillante ocasionalmente
                if (Math.random() < 0.1) {
                    createShiningStar();
                }
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Efecto al abrir un día
        document.addEventListener('click', function(e) {
            const dayLink = e.target.closest('a[href*="/day/"]');
            if (dayLink) {
                // Explosión de confeti
                const rect = dayLink.getBoundingClientRect();
                createConfettiExplosion(rect.left + rect.width/2, rect.top + rect.height/2);
                
                // Dragón volador
                setTimeout(() => {
                    createFlyingDragon();
                    if (window.playSound) {
                        window.playSound('dragon');
                    }
                }, 500);
            }
        });
    }
    
    // Efectos automáticos
    function startAutomaticEffects() {
        // Partículas flotantes cada 8 segundos
        setInterval(createFloatingParticles, 8000);
        
        // Farolillos flotantes cada 12 segundos
        setInterval(createFloatingLanterns, 12000);
        
        // Estrella brillante cada 6 segundos
        setInterval(createShiningStar, 6000);
        
        // Dragón volador cada 20 segundos
        setInterval(createFlyingDragon, 20000);
        
        // Fuegos artificiales ocasionales
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% de probabilidad
                if (window.launchFireworks) {
                    window.launchFireworks(1);
                }
            }
        }, 30000);
    }
    
    // Inicializar cuando el DOM esté listo
    function init() {
        if (isMobile) {
            addAnimationStyles();
            addInteractiveEffects();
            startAutomaticEffects();
            
            // Efecto inicial de bienvenida
            setTimeout(() => {
                createConfettiExplosion();
                createFlyingDragon();
            }, 1000);
        }
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exportar funciones para uso externo
    window.ShanghaiAnimations = {
        createConfettiExplosion,
        createFloatingParticles,
        shakeElement,
        zoomElement,
        pulseGold,
        createRippleEffect,
        createShiningStar,
        createFlyingDragon,
        createFloatingLanterns
    };
    
})();

// Shanghai Advent Journey - Countdown Timer
// Actualiza cada segundo el countdown hasta el 25 de diciembre de 2025

(function() {
    'use strict';
    
    // Fecha objetivo: 25 de diciembre de 2025
    const TARGET_DATE = new Date('2025-12-25T00:00:00Z');
    
    // Función para actualizar el countdown
    function updateCountdown() {
        const now = new Date();
        const timeDiff = TARGET_DATE - now;
        
        if (timeDiff <= 0) {
            // ¡Ya es el día del viaje!
            updateDisplay(0, 0, 0, 0, true);
            return;
        }
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        updateDisplay(days, hours, minutes, seconds, false);
    }
    
    // Función para actualizar la visualización
    function updateDisplay(days, hours, minutes, seconds, isTripDay) {
        // Buscar elementos por ID o clase
        const dayElement = document.querySelector('[data-countdown="days"]');
        const hourElement = document.querySelector('[data-countdown="hours"]');
        const minuteElement = document.querySelector('[data-countdown="minutes"]');
        const secondElement = document.querySelector('[data-countdown="seconds"]');
        
        if (dayElement) dayElement.textContent = days;
        if (hourElement) hourElement.textContent = hours;
        if (minuteElement) minuteElement.textContent = minutes;
        if (secondElement) secondElement.textContent = seconds;
        
        // Añadir efecto de parpadeo cuando quedan pocos segundos
        if (seconds <= 10 && !isTripDay) {
            if (secondElement) {
                secondElement.style.animation = 'pulse 0.5s infinite';
            }
        } else {
            if (secondElement) {
                secondElement.style.animation = 'none';
            }
        }
    }
    
    // Función para añadir efectos visuales
    function addVisualEffects() {
        // Añadir efecto de confeti cuando llegue el día
        const now = new Date();
        const timeDiff = TARGET_DATE - now;
        
        if (timeDiff <= 0) {
            createConfetti();
        }
    }
    
    // Función para crear efecto de confeti
    function createConfetti() {
        const colors = ['#DC143C', '#FFD700', '#1a1a1a', '#8B0000'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.zIndex = '9999';
                confetti.style.borderRadius = '50%';
                confetti.style.animation = 'fall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                // Remover después de la animación
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    // Añadir estilos CSS para las animaciones
    function addCountdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .countdown-number {
                transition: all 0.3s ease;
            }
            
            .countdown-number:hover {
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar cuando el DOM esté listo
    function init() {
        addCountdownStyles();
        updateCountdown();
        addVisualEffects();
        
        // Actualizar cada segundo
        setInterval(updateCountdown, 1000);
        
        // Actualizar efectos visuales cada minuto
        setInterval(addVisualEffects, 60000);
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
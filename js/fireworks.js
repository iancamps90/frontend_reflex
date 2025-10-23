// Shanghai Advent Calendar - Fireworks Effects
// Efectos de fuegos artificiales espectaculares

(function() {
    'use strict';
    
    class Fireworks {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.animationId = null;
            this.isActive = false;
        }
        
        init() {
            // Crear canvas para fuegos artificiales
            this.canvas = document.createElement('canvas');
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 10000;
                background: transparent;
            `;
            
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            
            document.body.appendChild(this.canvas);
            
            // Redimensionar canvas cuando cambie el tamaño de ventana
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        createFirework(x, y, color = '#FFD700') {
            const particleCount = 50;
            const colors = ['#FFD700', '#DC143C', '#FFFFFF', '#8B0000', '#228B22'];
            
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 2 + Math.random() * 3;
                const life = 60 + Math.random() * 40;
                
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    life: life,
                    maxLife: life,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 2 + Math.random() * 3,
                    gravity: 0.1
                });
            }
        }
        
        update() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const particle = this.particles[i];
                
                // Actualizar posición
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += particle.gravity;
                
                // Reducir vida
                particle.life--;
                
                // Dibujar partícula
                const alpha = particle.life / particle.maxLife;
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
                
                // Eliminar partícula si se acaba la vida
                if (particle.life <= 0) {
                    this.particles.splice(i, 1);
                }
            }
            
            if (this.particles.length > 0) {
                this.animationId = requestAnimationFrame(() => this.update());
            } else {
                this.isActive = false;
            }
        }
        
        launch(x = null, y = null) {
            if (this.isActive) return;
            
            this.isActive = true;
            
            // Posición aleatoria si no se especifica
            if (x === null) x = Math.random() * this.canvas.width;
            if (y === null) y = Math.random() * this.canvas.height * 0.6;
            
            this.createFirework(x, y);
            this.update();
        }
        
        launchMultiple(count = 3) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.launch();
                }, i * 500);
            }
        }
        
        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }
    
    // Crear instancia global
    window.ShanghaiFireworks = new Fireworks();
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ShanghaiFireworks.init();
        });
    } else {
        window.ShanghaiFireworks.init();
    }
    
    // Función para lanzar fuegos artificiales desde otros scripts
    window.launchFireworks = (count = 1) => {
        if (count === 1) {
            window.ShanghaiFireworks.launch();
        } else {
            window.ShanghaiFireworks.launchMultiple(count);
        }
    };
    
})();

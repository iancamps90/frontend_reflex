// Shanghai Advent Calendar - Sound Effects
// Efectos de sonido para las animaciones

(function() {
    'use strict';
    
    class SoundEffects {
        constructor() {
            this.sounds = {};
            this.enabled = true;
            this.volume = 0.3;
        }
        
        init() {
            // Crear sonidos usando Web Audio API
            this.createSounds();
            
            // Verificar si el usuario ha interactuado con la página
            this.setupUserInteraction();
        }
        
        createSounds() {
            // Crear contexto de audio
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Crear sonidos sintéticos
            this.sounds = {
                // Sonido de confeti
                confetti: () => this.createTone(800, 0.1, 'sine'),
                
                // Sonido de dragón
                dragon: () => this.createTone(200, 0.5, 'sawtooth'),
                
                // Sonido de estrella
                star: () => this.createTone(1200, 0.2, 'triangle'),
                
                // Sonido de farolillo
                lantern: () => this.createTone(400, 0.3, 'square'),
                
                // Sonido de fuegos artificiales
                fireworks: () => this.createExplosionSound(),
                
                // Sonido de click
                click: () => this.createTone(600, 0.05, 'sine'),
                
                // Sonido de vibración
                vibration: () => this.createVibrationSound()
            };
        }
        
        createTone(frequency, duration, type = 'sine') {
            if (!this.enabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        }
        
        createExplosionSound() {
            if (!this.enabled || !this.audioContext) return;
            
            // Crear múltiples tonos para simular explosión
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const frequency = 100 + Math.random() * 200;
                    this.createTone(frequency, 0.3, 'sawtooth');
                }, i * 50);
            }
        }
        
        createVibrationSound() {
            if (!this.enabled || !this.audioContext) return;
            
            // Crear sonido de vibración
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        }
        
        setupUserInteraction() {
            // Habilitar audio después de la primera interacción del usuario
            const enableAudio = () => {
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('touchstart', enableAudio);
            };
            
            document.addEventListener('click', enableAudio);
            document.addEventListener('touchstart', enableAudio);
        }
        
        play(soundName) {
            if (this.sounds[soundName]) {
                this.sounds[soundName]();
            }
        }
        
        setVolume(volume) {
            this.volume = Math.max(0, Math.min(1, volume));
        }
        
        toggle() {
            this.enabled = !this.enabled;
            return this.enabled;
        }
    }
    
    // Crear instancia global
    window.ShanghaiSounds = new SoundEffects();
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ShanghaiSounds.init();
        });
    } else {
        window.ShanghaiSounds.init();
    }
    
    // Función para reproducir sonidos desde otros scripts
    window.playSound = (soundName) => {
        if (window.ShanghaiSounds) {
            window.ShanghaiSounds.play(soundName);
        }
    };
    
})();

import { useEffect, useRef, type FC } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const HeroCanvas: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let particles: Particle[] = [];
        let animationFrameId: number;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = (Math.random() * 0.5) - 0.25;
                this.speedY = (Math.random() * 0.5) - 0.25;
                this.color = `rgba(139, 92, 246, ${Math.random() * 0.8 + 0.2})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.01;
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.size = Math.random() * 1.5 + 1;
                }
            }
            draw() {
                ctx!.fillStyle = this.color;
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.closePath();
            }
        }

        const setup = () => {
            const hero = document.querySelector('#hero');
            if (!hero || !canvas) return;
            width = canvas.width = (hero as HTMLElement).offsetWidth;
            height = canvas.height = (hero as HTMLElement).offsetHeight;
            particles = [];
            const particleCount = Math.floor(width / 30);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx!.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        
        setup();
        animate();

        window.addEventListener('resize', setup);

        return () => {
            window.removeEventListener('resize', setup);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="hero-canvas" className="absolute top-0 left-0 w-full h-full z-0 opacity-30" style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 70%)' }}></canvas>;
};

export const Hero: FC = () => {
    const smoothScrollTo = useSmoothScroll();
    const heroTitle = "Soluciones E-Commerce para Productos y Servicios Especializados";

    const handleScrollClick = (selector: string) => {
        smoothScrollTo(selector);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };
    
    const titleVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
    };

    return (
        <section 
            id="hero"
            className="relative min-h-screen flex items-center text-center py-20 lg:py-24 pt-24 overflow-hidden"
        >
            <div 
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse 70% 50% at 50% 100%, hsla(258, 82%, 58%, 0.25) 0px, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 10% 20%, hsla(320, 82%, 58%, 0.25) 0px, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 90% 20%, hsla(258, 82%, 58%, 0.2) 0px, transparent 60%)
                    `
                }}
            />
            <HeroCanvas />

            <div className="relative z-10 container mx-auto px-6">
                <motion.div 
                    className="max-w-4xl mx-auto bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 shadow-lg shadow-black/30"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-tightest"
                        style={{ textShadow: '0px 0px 20px rgba(0,0,0,0.5)' }}
                        variants={titleVariants}
                    >
                        {heroTitle.split(" ").map((word, wordIndex) => (
                            <motion.span key={`word-${wordIndex}`} variants={wordVariants} className="inline-block mr-4">
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-[#A3A3A3] font-light"
                        variants={itemVariants}
                    >
                        Transformamos procesos de venta complejos en experiencias de usuario fluidas, permitiendo la venta de servicios y productos de alto valor directamente en línea.
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-wrap justify-center gap-4"
                        variants={itemVariants}
                    >
                        <button onClick={() => handleScrollClick('#contact')} className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] active:scale-95 bg-[length:200%_auto] hover:bg-[right_center]">
                            Agendar una Consulta
                        </button>
                        <button onClick={() => handleScrollClick('#portfolio')} className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-white/5 hover:bg-white/10 border border-[#222222] hover:border-pink-400/50 transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95">
                            Ver Proyectos
                        </button>
                    </motion.div>
                </motion.div>
            </div>
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-5"></div>
        </section>
    );
};
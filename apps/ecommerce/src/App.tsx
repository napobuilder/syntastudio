import { useState, useEffect, useRef, useCallback, type FC, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import evaImage from './assets/eva.webp';
import voiceAcademyImage from './assets/voiceacademy1.webp';

// --- Tipos y Interfaces ---
interface ASSETS_TYPE {
    logoMask: string;
    founderPhoto: string;
}

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

interface ProjectCardProps {
    imgSrc: string;
    title: string;
    href: string;
    children: ReactNode;
}

interface FloatingLabelInputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OptionButtonProps {
    group: 'budget' | 'service';
    value: string;
    onClick: (group: 'budget' | 'service', value: string) => void;
    isSelected: boolean;
}

interface FormData {
    budget: string;
    service: string;
    name: string;
    email: string;
}

interface Message {
    type: 'success' | 'error';
    text: string;
}

// --- Assets Optimizados y Generalizados ---
const ASSETS: ASSETS_TYPE = {
    logoMask: 'https://i.imgur.com/vgnuj55.png',
    founderPhoto: 'https://i.imgur.com/kDRy846.png',
};

// --- Iconos ---
const CodeBracketIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

const CpuChipIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
);

const SwatchIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.158 0a.079.079 0 01.079-.079h.008a.079.079 0 01.079.079v.008a.079.079 0 01-.079.079h-.008a.079.079 0 01-.079-.079V8.25z" />
    </svg>
);

const CubeIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

// --- Hooks Personalizados ---
const useSmoothScroll = () => {
    const smoothScrollTo = useCallback((selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, []);
    return smoothScrollTo;
};

// --- Componentes de UI y Layout ---
const ScrollReveal: FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
};

const Header: FC = () => {
    const smoothScrollTo = useSmoothScroll();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
        e.preventDefault();
        smoothScrollTo(selector);
    }
    
    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="fixed top-6 left-0 right-0 z-50"
        >
            <nav className="w-[90%] max-w-4xl mx-auto bg-black/40 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 flex justify-between items-center shadow-lg shadow-black/30">
                <a href="#" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-x-2 text-2xl font-bold text-white">
                    <div 
                        className="h-8 w-8 flex-shrink-0"
                        style={{
                            backgroundColor: '#8B5CF6',
                            backgroundImage: 'linear-gradient(to right, #a855f7, #f472b6, #8b5cf6)',
                            maskImage: `url(${ASSETS.logoMask})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${ASSETS.logoMask})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                        }}
                    ></div>
                    <span className="flex items-baseline text-xl md:text-2xl">
                        <span>Synta</span>
                        <span className="ml-1 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-500 text-transparent bg-clip-text">Studio</span>
                    </span>
                </a>
                <div className="flex-shrink-0">
                    <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 bg-[length:200%_auto] hover:bg-[right_center] text-xs py-1.5 px-3 md:text-sm md:py-2 md:px-5">
                        Comenzar un Proyecto
                    </a>
                </div>
            </nav>
        </motion.header>
    );
};

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

const Footer: FC = () => (
    <footer className="bg-black border-t border-[#222222] py-8">
        <div className="container mx-auto px-6 text-center text-[#A3A3A3]">
            <p>&copy; {new Date().getFullYear()} Synta Studio. Todos los derechos reservados.</p>
        </div>
    </footer>
);

// --- Componentes de Secciones de la Página ---
const Hero: FC = () => {
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
                delayChildren: 0.5, // Delay the start of the first child
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
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-20"></div>
        </section>
    );
};

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, children }) => (
    <div className="h-full bg-[#111111] border border-[#222222] p-8 rounded-lg text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col">
        <div>
            {icon}
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        </div>
        <p className="text-[#A3A3A3] mt-2 font-light flex-grow">{children}</p>
    </div>
);

const Services: FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    const services = [
        { title: "Plataformas E-Commerce", icon: <CodeBracketIcon />, content: "Tiendas online y sistemas de venta a medida con pasarelas de pago seguras e inventario sincronizado." },
        { title: "Automatización con IA", icon: <CpuChipIcon />, content: "Asistentes virtuales que guían a tus clientes, califican leads y automatizan tareas repetitivas 24/7." },
        { title: "Diseño Centrado en Conversión", icon: <SwatchIcon />, content: "Interfaces diseñadas no solo para ser atractivas, sino para guiar al usuario hacia la compra o el contacto." },
        { title: "Herramientas de Gestión", icon: <CubeIcon />, content: "Software interno para administrar clientes (CRM), reservas o inventario de forma centralizada y eficiente." }
    ];

    return (
        <section id="services" className="py-20 lg:py-24 relative z-10 bg-[#000000] border-t border-b border-[#222222]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Soluciones para Crecer Tu Negocio</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Tecnología enfocada en resultados comerciales tangibles.</p>
                    </ScrollReveal>
                </div>
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {services.map((service, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <ServiceCard title={service.title} icon={service.icon}>
                                {service.content}
                            </ServiceCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ProjectCard: FC<ProjectCardProps> = ({ imgSrc, title, href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full bg-[#111111] border border-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col group">
        <div className="overflow-hidden">
            <motion.img 
                src={imgSrc} 
                alt={`${title} Project`} 
                className="w-full h-64 object-cover flex-shrink-0" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-[#A3A3A3] font-light">{children}</p>
        </div>
    </a>
);

const Portfolio: FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section id="portfolio" className="py-20 lg:py-24 relative z-10 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Casos de Éxito</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Resultados reales para clientes con necesidades únicas.</p>
                    </ScrollReveal>
                </div>
                <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={itemVariants}>
                        <ProjectCard
                            imgSrc={voiceAcademyImage}
                            title="Voice Academy"
                            href="https://voiceacademy-temporal.netlify.app/"
                        >
                            Plataforma de e-commerce para la venta de cursos online de doblaje profesional. Facilita la compra y acceso a contenido formativo para actores de voz.
                        </ProjectCard>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ProjectCard
                            imgSrc={evaImage}
                            title="Plataforma Psiquiátrica Dra. Guevara"
                            href="https://draevaguevara.com"
                        >
                           Creamos una plataforma digital para una reconocida psiquiatra, automatizando la captación de pacientes. Los usuarios completan tests psicométricos en línea y los resultados se envían directamente al WhatsApp de la doctora, agendando una consulta de forma automática.
                        </ProjectCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const About: FC = () => (
    <section id="about" className="py-20 lg:py-24 relative z-10 bg-[#000000]">
        <div className="container mx-auto px-6">
            <ScrollReveal>
                <div className="bg-[#111111] border border-[#222222] rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-shrink-0">
                        <motion.img 
                            src={ASSETS.founderPhoto} 
                            alt="Foto del fundador, Napoleon Baca" 
                            className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-[#222222]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xl md:text-2xl text-[#A3A3A3] font-light" style={{ lineHeight: 1.6 }}>
                            "Mi pasión es usar la tecnología para construir puentes directos entre un negocio y sus clientes. Traduzco tus objetivos comerciales en plataformas digitales que no solo funcionan, sino que venden."
                        </p>
                        <div className="flex items-center justify-center md:justify-start mt-4">
                            <p className="text-lg font-bold text-white">— Napoleon Baca</p>
                            <a href="https://www.linkedin.com/in/napoleonbaca/" target="_blank" rel="noopener noreferrer" className="ml-3 text-white hover:text-pink-400 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => (
    <div className="w-full">
        <div className="relative w-full h-1 bg-[#222222] rounded-full mb-8">
            <motion.div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 rounded-full"
                animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
        </div>
    </div>
);

const ContactForm: FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<FormData>({ budget: '', service: '', name: '', email: '' });
    const [message, setMessage] = useState<Message | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalSteps = 3;

    const handleOptionSelect = (group: 'budget' | 'service', value: string) => {
        setDirection(1);
        setFormData(prev => ({ ...prev, [group]: value }));
        setTimeout(() => {
            if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
        }, 300);
    };

    const handleBack = () => {
        setDirection(-1);
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            setMessage({ type: 'error', text: 'Por favor, completa tu nombre y email.' });
            return;
        }
        setIsSubmitting(true);

        fetch('https://formspree.io/f/mjkobbze', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) {
                setMessage({ type: 'success', text: `¡Gracias, ${formData.name}! Tu solicitud ha sido enviada.` });
                setTimeout(() => {
                    setCurrentStep(1);
                    setFormData({ budget: '', service: '', name: '', email: '' });
                    setMessage(null);
                    setIsSubmitting(false);
                }, 4000);
            } else {
                setMessage({ type: 'error', text: 'Oops! Hubo un problema al enviar tu formulario.' });
                setIsSubmitting(false);
            }
        }).catch(() => {
            setMessage({ type: 'error', text: 'Oops! Hubo un problema al enviar tu formulario.' });
            setIsSubmitting(false);
        });
    };

    const formVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const OptionButton: FC<OptionButtonProps> = ({ group, value, onClick, isSelected }) => (
        <button
            type="button"
            onClick={() => onClick(group, value)}
            className={`p-4 rounded-lg transition-all duration-200 w-full text-white transform active:scale-95 ${isSelected ? 'border-pink-400 bg-pink-500/10 ring-2 ring-pink-400' : 'bg-[#111111] border border-[#222222] hover:border-pink-400/50 hover:bg-[#1a1a1a]'}`}
        >
            {value}
        </button>
    );

    const FloatingLabelInput: FC<FloatingLabelInputProps> = ({ id, type, placeholder, value, onChange }) => (
        <div className="relative">
            <input
                id={id}
                type={type}
                placeholder=" " 
                className="peer w-full p-3 bg-[#111111] border border-[#222222] text-white rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
                value={value}
                onChange={onChange}
                required
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#111111] px-2 left-1 peer-focus:px-2 peer-focus:text-pink-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
                {placeholder}
            </label>
        </div>
    );

    return (
        <ScrollReveal>
            <div 
                className="max-w-2xl mx-auto p-6 sm:p-10 border border-[#222222] rounded-lg"
                style={{
                    backgroundColor: '#0a0a0a',
                    backgroundImage: `
                        radial-gradient(at 20% 80%, hsla(258, 82%, 58%, 0.2) 0px, transparent 50%),
                        radial-gradient(at 80% 10%, hsla(320, 82%, 58%, 0.25) 0px, transparent 50%)
                    `
                }}
            >
                <form onSubmit={handleSubmit}>
                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    <div className="relative overflow-hidden" style={{ minHeight: '220px' }}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={formVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                className="absolute w-full"
                            >
                                {currentStep === 1 && (
                                    <div>
                                        <label className="block text-lg font-semibold mb-4 text-center text-white">¿Cuál es tu presupuesto?</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
                                            {[
                                                '$500 - $1.5k',
                                                '$1.5k - $4k',
                                                '$4k - $8k',
                                                '$8k+'
                                            ].map(val => <OptionButton key={val} group="budget" value={val} onClick={handleOptionSelect} isSelected={formData.budget === val} />)}
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div>
                                        <label className="block text-lg font-semibold mb-4 text-center text-white">¿Qué servicio te interesa más?</label>
                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            {[
                                                'Plataforma E-Commerce',
                                                'Automatización con IA',
                                                'Diseño y Conversión',
                                                'Software de Gestión'
                                            ].map(val => <OptionButton key={val} group="service" value={val} onClick={handleOptionSelect} isSelected={formData.service === val} />)}
                                        </div>
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div>
                                        <label className="block text-lg font-semibold mb-4 text-center text-white">¡Casi listos!</label>
                                        <div className="space-y-6 px-1">
                                            <FloatingLabelInput id="name" type="text" placeholder="Tu Nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                            <FloatingLabelInput id="email" type="email" placeholder="Tu Mejor Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center h-14">
                        <AnimatePresence>
                            {currentStep > 1 && (
                                <motion.button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-transparent hover:bg-gray-700/50 text-gray-400 hover:text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-300 flex items-center gap-x-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Atrás
                                </motion.button>
                            )}
                        </AnimatePresence>
                        <div className="flex-grow" />
                        <AnimatePresence>
                            {currentStep === totalSteps && (
                                <motion.button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none bg-[length:200%_auto] hover:bg-[right_center]"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
                {message && <div className={`mt-2 text-center text-sm transition-opacity duration-300 ${message && message.text ? 'opacity-100' : 'opacity-0'} ${message && message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</div>}
            </div>
        </ScrollReveal>
    );
};

const Contact: FC = () => (
    <section id="contact" className="py-20 lg:py-24 relative z-10 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Hagamos Realidad Tu Proyecto</h2>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                    <p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Completa los siguientes pasos para agendar una consulta estratégica gratuita y sin compromiso.</p>
                </ScrollReveal>
            </div>
            <ContactForm />
        </div>
    </section>
);

// --- Componente Principal App ---
export default function App() {
    return (
        <div className="bg-gradient-to-b from-black via-[#050505] to-black antialiased">
            <Header />
            <main>
                <Hero />
                <Services />
                <Portfolio />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
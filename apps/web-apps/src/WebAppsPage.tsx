import { useEffect, useRef, useCallback, type FC, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ContactForm } from './components/ContactForm';
import { ScrollReveal } from './components/ScrollReveal';

// Re-exporting for simplicity, will be properly structured later
export { ContactForm, ScrollReveal };

// --- Types ---
interface ASSETS_TYPE {
    logoMask: string;
    founderPhoto: string;
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

// --- Assets ---
const ASSETS: ASSETS_TYPE = {
    logoMask: 'https://i.imgur.com/vgnuj55.png',
    founderPhoto: 'https://i.imgur.com/kDRy846.png',
};

// --- Icons ---
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

// --- Hooks ---
const useSmoothScroll = () => {
    const smoothScrollTo = useCallback((selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return smoothScrollTo;
};

// --- Components ---

const HeroCanvas: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let width = 0, height = 0, particles: Particle[] = [], animationFrameId: number;
        class Particle { x=0; y=0; size=0; speedX=0; speedY=0; color=''; constructor() { this.reset(); } update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.1) this.size -= 0.01; if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset(); } reset() { this.x = Math.random() * width; this.y = Math.random() * height; this.size = Math.random() * 1.5 + 1; this.speedX = (Math.random() * 0.5) - 0.25; this.speedY = (Math.random() * 0.5) - 0.25; this.color = `rgba(139, 92, 246, ${Math.random() * 0.8 + 0.2})`; } draw() { ctx!.fillStyle = this.color; ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx!.fill(); } }
        const setup = () => { const hero = document.querySelector('#hero'); if (!hero || !canvas) return; width = canvas.width = (hero as HTMLElement).offsetWidth; height = canvas.height = (hero as HTMLElement).offsetHeight; particles = Array.from({ length: Math.floor(width / 30) }, () => new Particle()); };
        const animate = () => { ctx!.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
        setup(); animate(); window.addEventListener('resize', setup);
        return () => { window.removeEventListener('resize', setup); cancelAnimationFrame(animationFrameId); };
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

const Hero: FC = () => {
    const smoothScrollTo = useSmoothScroll();
    const heroTitle = "Desarrollo de Aplicaciones Web y Soluciones con IA";
    const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } } };
    const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    const titleVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
    const wordVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
    return (
        <section id="hero" className="relative min-h-screen flex items-center text-center py-20 lg:py-24 pt-24 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0" style={{ backgroundImage: `radial-gradient(ellipse 70% 50% at 50% 100%, hsla(258, 82%, 58%, 0.25) 0px, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 20%, hsla(320, 82%, 58%, 0.25) 0px, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 20%, hsla(258, 82%, 58%, 0.2) 0px, transparent 60%)` }} />
            <HeroCanvas />
            <div className="relative z-10 container mx-auto px-6">
                <motion.div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 shadow-lg shadow-black/30" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-tightest" style={{ textShadow: '0px 0px 20px rgba(0,0,0,0.5)' }} variants={titleVariants}>
                        {heroTitle.split(" ").map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-4">{word}</motion.span>)}
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-[#A3A3A3] font-light" variants={itemVariants}>
                        Transformamos tus ideas en software robusto, escalable y centrado en el usuario. Desde webs corporativas hasta complejas integraciones de IA.
                    </motion.p>
                    <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
                        <button onClick={() => smoothScrollTo('#contact')} className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] active:scale-95 bg-[length:200%_auto] hover:bg-[right_center]">Agendar una Consulta</button>
                        <button onClick={() => smoothScrollTo('#portfolio')} className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-white/5 hover:bg-white/10 border border-[#222222] hover:border-pink-400/50 transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95">Ver Proyectos</button>
                    </motion.div>
                </motion.div>
            </div>
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-20"></div>
        </section>
    );
};

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, children }) => (
    <div className="h-full bg-[#111111] border border-[#222222] p-8 rounded-lg text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col">
        <div>{icon}<h3 className="text-xl font-bold mb-3 text-white">{title}</h3></div>
        <p className="text-[#A3A3A3] mt-2 font-light flex-grow">{children}</p>
    </div>
);

const Services: FC = () => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };
    const services = [
        { title: "Desarrollo Full-Stack", icon: <CodeBracketIcon />, content: "Aplicaciones web completas utilizando tecnologías modernas como React, Zustand y Node.js para un rendimiento excepcional." },
        { title: "Integración de IA", icon: <CpuChipIcon />, content: "Potenciamos tus apps con modelos como Gemini para crear experiencias inteligentes y automatizar procesos." },
        { title: "Diseño UX/UI", icon: <SwatchIcon />, content: "Interfaces intuitivas y atractivas diseñadas para ofrecer una experiencia de usuario fluida y memorable." },
        { title: "Micro-SaaS a Medida", icon: <CubeIcon />, content: "Conceptualizamos y construimos productos de nicho, listos para generar ingresos recurrentes." }
    ];
    return (
        <section id="services" className="py-20 lg:py-24 relative z-10 bg-[#000000] border-t border-b border-[#222222]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal><h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Nuestros Servicios</h2></ScrollReveal>
                    <ScrollReveal delay={0.15}><p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Soluciones a medida para cada etapa de tu proyecto.</p></ScrollReveal>
                </div>
                <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    {services.map((service, i) => <motion.div key={i} variants={itemVariants}><ServiceCard title={service.title} icon={service.icon}>{service.content}</ServiceCard></motion.div>)}
                </motion.div>
            </div>
        </section>
    );
};

const ProjectCard: FC<ProjectCardProps> = ({ imgSrc, title, href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full bg-[#111111] border border-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col group">
        <div className="overflow-hidden"><motion.img src={imgSrc} alt={`${title} Project`} className="w-full h-64 object-cover flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: 'easeOut' }} /></div>
        <div className="p-8 flex flex-col flex-grow"><h3 className="text-2xl font-bold mb-3 text-white">{title}</h3><p className="text-[#A3A3A3] font-light">{children}</p></div>
    </a>
);

const Portfolio: FC = () => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };
    return (
        <section id="portfolio" className="py-20 lg:py-24 relative z-10 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal><h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Proyectos Destacados</h2></ScrollReveal>
                    <ScrollReveal delay={0.15}><p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Una muestra de nuestro trabajo en acción.</p></ScrollReveal>
                </div>
                <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div variants={itemVariants}><ProjectCard imgSrc="https://i.imgur.com/uR2cM5n.png" title="NeuroMetric" href="#">Una plataforma SaaS de nicho diseñada para modernizar la práctica psiquiátrica. Automatiza la recolección de datos del paciente a través de formularios interactivos y provee diagnósticos preliminares asistidos por IA, optimizando el tiempo del especialista.</ProjectCard></motion.div>
                    <motion.div variants={itemVariants}><ProjectCard imgSrc="https://i.imgur.com/4t9eAZn.png" title="AgentDeck" href="#">Un laboratorio de 'Context Engineering' para la API de Gemini. Esta herramienta interna permite a los desarrolladores construir, probar y colaborar en una librería de agentes de IA, acelerando radicalmente el ciclo de desarrollo de aplicaciones inteligentes.</ProjectCard></motion.div>
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
                    <div className="flex-shrink-0"><motion.img src={ASSETS.founderPhoto} alt="Foto del fundador, Napoleon Baca" className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-[#222222]" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: 'easeOut' }} /></div>
                    <div className="text-center md:text-left">
                        <p className="text-xl md:text-2xl text-[#A3A3A3] font-light" style={{ lineHeight: 1.6 }}>"Soy un desarrollador full-stack que usa la IA como su co-piloto de ingeniería. Mediante el 'Context Engineering', traduzco visiones complejas en software excepcional, a una velocidad que redefine lo que es posible."</p>
                        <div className="flex items-center justify-center md:justify-start mt-4">
                            <p className="text-lg font-bold text-white">— Napoleon Baca</p>
                            <a href="https://www.linkedin.com/in/napoleonbaca/" target="_blank" rel="noopener noreferrer" className="ml-3 text-white hover:text-pink-400 transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Contact: FC = () => (
    <section id="contact" className="py-20 lg:py-24 relative z-10 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <ScrollReveal><h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Hagamos Realidad Tu Proyecto</h2></ScrollReveal>
                <ScrollReveal delay={0.15}><p className="text-lg mt-4 max-w-2xl mx-auto text-[#A3A3A3] font-light">Completa los siguientes pasos para agendar una consulta estratégica gratuita y sin compromiso.</p></ScrollReveal>
            </div>
            <ContactForm />
        </div>
    </section>
);

export default function WebAppsPage() {
    return (
        <div className="bg-gradient-to-b from-black via-[#050505] to-black antialiased">
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
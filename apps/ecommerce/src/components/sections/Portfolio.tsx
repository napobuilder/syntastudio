import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { ProjectCardProps } from '../../types';
import voiceAcademyImage from '../../assets/voiceacademy1.webp';
import evaImage from '../../assets/eva.webp';

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

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

export const Portfolio: FC = () => {
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
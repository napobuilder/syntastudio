import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { ServiceCardProps } from '../../types';
import { CodeBracketIcon, CpuChipIcon, SwatchIcon, CubeIcon } from '../icons/PageIcons';

const ScrollReveal = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        className={className}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, children }) => (
    <div className="h-full bg-[#111111] border border-[#222222] p-8 rounded-lg text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col">
        <div>
            {icon}
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        </div>
        <p className="text-[#A3A3A3] mt-2 font-light flex-grow">{children}</p>
    </div>
);

export const Services: FC = () => {
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
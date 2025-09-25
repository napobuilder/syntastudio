import { motion } from 'framer-motion';
import type { FC } from 'react';

const ASSETS = {
    founderPhoto: 'https://i.imgur.com/kDRy846.png',
};

const ScrollReveal = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
    >
        {children}
    </motion.div>
);

export const About: FC = () => (
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
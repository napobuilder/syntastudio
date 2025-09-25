import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { AppSwitcher, type App } from '../AppSwitcher';

const ASSETS = {
    logoMask: 'https://i.imgur.com/vgnuj55.png',
};

interface HeaderProps {
    apps: App[];
    currentAppUrl: string;
}

export const Header: FC<HeaderProps> = ({ apps, currentAppUrl }) => {
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
            <nav className="w-[90%] max-w-4xl mx-auto bg-black/40 backdrop-blur-lg border border-white/20 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg shadow-black/30">
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
                    <span className="hidden sm:flex items-baseline text-xl md:text-2xl">
                        <span>Synta</span>
                        <span className="ml-1 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-500 text-transparent bg-clip-text">Studio</span>
                    </span>
                </a>
                <div className="flex-shrink-0 flex items-center gap-x-2 sm:gap-x-4">
                    <AppSwitcher apps={apps} currentAppUrl={currentAppUrl} />
                    <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 bg-[length:200%_auto] hover:bg-[right_center] text-xs py-1.5 px-3 md:text-sm md:py-2 md:px-5">
                        Comenzar un Proyecto
                    </a>
                </div>
            </nav>
        </motion.header>
    );
};
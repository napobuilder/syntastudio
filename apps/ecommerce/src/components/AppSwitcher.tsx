import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export interface App {
  name: string;
  url: string;
  description: string;
}

interface AppSwitcherProps {
  apps: App[];
  currentAppUrl: string;
}

// --- Icon Components ---
const GridIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3Z" /><path d="M20 3H14C13.4477 3 13 3.44772 13 4V10C13 10.5523 13.4477 11 14 11H20C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3Z" /><path d="M10 13H4C3.44772 13 3 13.4477 3 14V20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13Z" /><path d="M20 13H14C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13Z" /></svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

const XMarkIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

// --- Main Component ---
export const AppSwitcher: FC<AppSwitcherProps> = ({ apps, currentAppUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 640px)');
    const switcherRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false);
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // --- Desktop Popover Menu ---
    const PopoverMenu = () => {
        // Close on click outside for desktop only
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const panelVariants: Variants = { hidden: { opacity: 0, scale: 0.95, y: -10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }, exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } } };

        return (
            <motion.div
                id="app-switcher-panel"
                role="menu"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-72 origin-top-right bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl focus:outline-none z-50"
            >
                <div className="py-2" role="none">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Switch to</p>
                    {apps.map((app) => (
                        <a key={app.name} href={app.url} role="menuitem" className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                            <div>
                                <p className="font-medium">{app.name}</p>
                                <p className="text-xs text-gray-400">{app.description}</p>
                            </div>
                            {app.url === currentAppUrl && <CheckIcon className="h-5 w-5 text-pink-400" />}
                        </a>
                    ))}
                </div>
            </motion.div>
        );
    };

    // --- Mobile Full-Screen Modal ---
    const FullScreenModal = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-black z-[100] flex flex-col p-4"
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Switch to</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="flex flex-col gap-y-2">
                {apps.map((app) => (
                    <a key={app.name} href={app.url} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${app.url === currentAppUrl ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}>
                        <div>
                            <p className="font-semibold text-white text-lg">{app.name}</p>
                            <p className="text-gray-400">{app.description}</p>
                        </div>
                        {app.url === currentAppUrl && <CheckIcon className="h-6 w-6 text-pink-400" />}
                    </a>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div ref={switcherRef} className="relative">
            <nav aria-label="App switcher">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-colors"
                >
                    <span className="sr-only">Open app switcher</span>
                    <GridIcon className="h-5 w-5" />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (isMobile ? <FullScreenModal /> : <PopoverMenu />)}
            </AnimatePresence>
        </div>
    );
};
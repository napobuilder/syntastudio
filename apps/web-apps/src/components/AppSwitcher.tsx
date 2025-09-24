import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- Types ---
interface App {
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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3Z" />
        <path d="M20 3H14C13.4477 3 13 3.44772 13 4V10C13 10.5523 13.4477 11 14 11H20C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3Z" />
        <path d="M10 13H4C3.44772 13 3 13.4477 3 14V20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13Z" />
        <path d="M20 13H14C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13Z" />
    </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


// --- Main Component ---
export const AppSwitcher: FC<AppSwitcherProps> = ({ apps, currentAppUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const switcherRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [switcherRef]);

    const panelVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } }
    };

    return (
        <div ref={switcherRef} className="relative">
            <nav aria-label="App switcher">
                <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls="app-switcher-panel"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-colors"
                >
                    <span className="sr-only">Open app switcher</span>
                    <GridIcon className="h-5 w-5" />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="app-switcher-panel"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="app-switcher-button"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-72 origin-top-right bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl focus:outline-none z-50"
                    >
                        <div className="py-2" role="none">
                            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Switch to</p>
                            {apps.map((app) => {
                                const isCurrent = app.url === currentAppUrl;
                                return (
                                    <a
                                        key={app.name}
                                        href={app.url}
                                        role="menuitem"
                                        className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                                    >
                                        <div>
                                            <p className="font-medium">{app.name}</p>
                                            <p className="text-xs text-gray-400">{app.description}</p>
                                        </div>
                                        {isCurrent && <CheckIcon className="h-5 w-5 text-pink-400" />}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
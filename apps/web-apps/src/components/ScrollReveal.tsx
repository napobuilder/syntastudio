import { type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

// --- Tipos y Interfaces ---
interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

// --- Componentes de UI y Layout ---
export const ScrollReveal: FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
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

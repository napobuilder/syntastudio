import type { FC } from 'react';

export const Footer: FC = () => (
    <footer className="bg-black border-t border-[#222222] py-8">
        <div className="container mx-auto px-6 text-center text-[#A3A3A3]">
            <p>&copy; {new Date().getFullYear()} Synta Studio. Todos los derechos reservados.</p>
        </div>
    </footer>
);
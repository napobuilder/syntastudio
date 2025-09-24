
import { useState, type FC, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

// --- Tipos y Interfaces ---
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

const OptionButton: FC<OptionButtonProps> = ({ group, value, onClick, isSelected }) => (
    <button
        type="button"
        onClick={() => onClick(group, value)}
        className={`p-4 rounded-lg transition-all duration-200 w-full text-white transform active:scale-95 ${isSelected ? 'border-pink-400 bg-pink-500/10 ring-2 ring-pink-400' : 'bg-[#111111] border border-[#222222] hover:border-pink-400/50 hover:bg-[#1a1a1a]'}`}
    >
        {value}
    </button>
);


// --- Componente del Formulario (CORREGIDO) ---
export const ContactForm: FC = () => {
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
                                                '$1k - $2k',
                                                '$2k - $5k',
                                                '$5k - $10k',
                                                '$10k+'
                                            ].map(val => <OptionButton key={val} group="budget" value={val} onClick={handleOptionSelect} isSelected={formData.budget === val} />)}
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div>
                                        <label className="block text-lg font-semibold mb-4 text-center text-white">¿Qué servicio te interesa más?</label>
                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            {[
                                                'Desarrollo Full-Stack',
                                                'Integración de IA',
                                                'Diseño UX/UI',
                                                'Micro-SaaS'
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

                    <motion.div layout className="mt-8 flex items-center justify-between h-14">
                        <div className="flex-grow flex justify-start">
                            {currentStep > 1 && (
                                <motion.button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-transparent hover:bg-gray-700/50 text-gray-400 hover:text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-300 flex items-center gap-x-1"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Atrás
                                </motion.button>
                            )}
                        </div>

                        <div className="flex-grow flex justify-end">
                            <AnimatePresence>
                                {currentStep === totalSteps && (
                                    <motion.button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="text-white font-semibold py-3 px-8 rounded-full text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </form>
                {message && <div className={`mt-2 text-center text-sm transition-opacity duration-300 ${message.text ? 'opacity-100' : 'opacity-0'} ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</div>}
            </div>
        </ScrollReveal>
    );
};

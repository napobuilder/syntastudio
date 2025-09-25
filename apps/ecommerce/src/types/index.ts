import type { ReactNode } from 'react';

export interface ASSETS_TYPE {
    logoMask: string;
    founderPhoto: string;
}

export interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

export interface ProjectCardProps {
    imgSrc: string;
    title: string;
    href: string;
    children: ReactNode;
}

export interface FloatingLabelInputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface OptionButtonProps {
    group: 'budget' | 'service';
    value: string;
    onClick: (group: 'budget' | 'service', value: string) => void;
    isSelected: boolean;
}

export interface FormData {
    budget: string;
    service: string;
    name: string;
    email: string;
}

export interface Message {
    type: 'success' | 'error';
    text: string;
}

export interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

import type { ReactNode } from 'react';

export interface ASSETS_TYPE {
    logoMask: string;
    founderPhoto: string;
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

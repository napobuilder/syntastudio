import { useCallback } from 'react';

export const useSmoothScroll = () => {
    const smoothScrollTo = useCallback((selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, []);
    return smoothScrollTo;
};

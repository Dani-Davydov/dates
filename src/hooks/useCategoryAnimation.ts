import { useCallback } from 'react';
import { gsap } from 'gsap';

export const useCategoryAnimation = () => {
    const animateElements = useCallback(async (elements: (HTMLElement | null)[], isAnimating: boolean) => {
        if (isAnimating || elements.length === 0) return null;

        const validElements = elements.filter((el): el is HTMLElement => el !== null);

        if (validElements.length === 0) return null;

        // Анимация скрытия
        await gsap.to(validElements, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.1
        });

        // Возвращаем функцию для показа
        return () => gsap.to(validElements, {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.1
        });
    }, []);

    return { animateElements };
};
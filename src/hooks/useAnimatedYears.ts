import { useRef } from 'react';
import { useYearAnimation } from './useYearAnimation';

export const useAnimatedYears = (minYear: number, maxYear: number) => {
    const minYearRef = useRef<HTMLDivElement>(null); // Используем HTMLDivElement
    const maxYearRef = useRef<HTMLDivElement>(null);

    useYearAnimation(minYearRef, minYear);
    useYearAnimation(maxYearRef, maxYear);

    return { minYearRef, maxYearRef };
};
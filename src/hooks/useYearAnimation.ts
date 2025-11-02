import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useYearAnimation = (
    yearRef: React.RefObject<HTMLDivElement | null>, // Используем HTMLElement вместо HTMLDivElement
    currentYear: number
) => {
    const prevYearRef = useRef(currentYear);

    useEffect(() => {
        if (currentYear !== prevYearRef.current && yearRef.current) {
            const yearObj = { val: prevYearRef.current };

            gsap.fromTo(
                yearObj,
                { val: prevYearRef.current },
                {
                    val: currentYear,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (yearRef.current) {
                            yearRef.current.textContent = Math.round(yearObj.val).toString();
                        }
                    },
                    onComplete: () => {
                        prevYearRef.current = currentYear;
                    }
                }
            );
        } else if (yearRef.current) {
            yearRef.current.textContent = currentYear.toString();
            prevYearRef.current = currentYear;
        }
    }, [currentYear, yearRef]);
};
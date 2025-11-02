import {MaxAndMinYear} from "../../maxAndMinYear/MaxAndMinYear";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {useCurrentCategory} from "../../../contexts/currentDateCategoryContext";

export const MobileYears = () => {
    const { minYear, maxYear } = useCurrentCategory();

    const minYearRef = useRef<HTMLDivElement | null>(null);
    const maxYearRef = useRef<HTMLDivElement | null>(null);

    const prevMinYearRef = useRef(minYear);
    const prevMaxYearRef = useRef(maxYear);

    useEffect(() => {
        if (minYear !== prevMinYearRef.current && minYearRef.current) {
            const minObj = { val: prevMinYearRef.current };

            gsap.fromTo(
                minObj,
                { val: prevMinYearRef.current },
                {
                    val: minYear,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (minYearRef.current) {
                            minYearRef.current.textContent = Math.round(minObj.val).toString();
                        }
                    },
                    onComplete: () => {
                        prevMinYearRef.current = minYear;
                    }
                }
            );
        } else if (minYearRef.current) {
            minYearRef.current.textContent = minYear.toString();
            prevMinYearRef.current = minYear;
        }
    }, [minYear]);

    useEffect(() => {
        if (maxYear !== prevMaxYearRef.current && maxYearRef.current) {
            const maxObj = { val: prevMaxYearRef.current };

            gsap.fromTo(
                maxObj,
                { val: prevMaxYearRef.current },
                {
                    val: maxYear,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (maxYearRef.current) {
                            maxYearRef.current.textContent = Math.round(maxObj.val).toString();
                        }
                    },
                    onComplete: () => {
                        prevMaxYearRef.current = maxYear;
                    }
                }
            );
        } else if (maxYearRef.current) {
            maxYearRef.current.textContent = maxYear.toString();
            prevMaxYearRef.current = maxYear;
        }
    }, [maxYear]);

    return (
        <>
            <MaxAndMinYear minYearRef={minYearRef} maxYearRef={maxYearRef} />
        </>
    )
}
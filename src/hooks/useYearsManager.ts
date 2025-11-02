import { useCallback } from "react";

type DateList = {
    id: number;
    year: number;
    description: string;
    category: string;
}

export const useYearsManager = (setMinYear: (year: number) => void, setMaxYear: (year: number) => void) => {
    const updateYears = useCallback((datesList: DateList[]) => {
        if (datesList.length > 0) {
            const years = datesList.map(item => item.year);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            setMinYear(minYear);
            setMaxYear(maxYear);
        }
    }, [setMinYear, setMaxYear]);

    return { updateYears };
};
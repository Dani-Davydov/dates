import { useState, useCallback } from "react";
import historicalData from "../dates.json";

type DateList = {
    id: number;
    year: number;
    description: string;
    category: string;
}

export const useCategoryData = (currentCategory: string) => {
    const [displayedDatesList, setDisplayedDatesList] = useState<DateList[]>([]);
    const [displayedCategory, setDisplayedCategory] = useState('');

    const filteredDatesList = historicalData.historicalEvents.filter(
        date => date.category === currentCategory
    );

    const updateDisplayedData = useCallback((newData: DateList[], category: string) => {
        setDisplayedDatesList(newData);
        setDisplayedCategory(category);
    }, []);

    const shouldUpdateData = useCallback(() => {
        return JSON.stringify(displayedDatesList) !== JSON.stringify(filteredDatesList);
    }, [displayedDatesList, filteredDatesList]);

    return {
        displayedDatesList,
        displayedCategory,
        filteredDatesList,
        updateDisplayedData,
        shouldUpdateData
    };
};
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

type CurrentElementContextType = {
    currentCategory: string;
    setCurrentCategory: Dispatch<SetStateAction<string>>;
    minYear: number;
    setMinYear: Dispatch<SetStateAction<number>>;
    maxYear: number;
    setMaxYear: Dispatch<SetStateAction<number>>;
}

export const CurrentDateCategoryContext = createContext<CurrentElementContextType | undefined>(undefined);

export const useCurrentCategory = (): CurrentElementContextType => {
    const context = useContext(CurrentDateCategoryContext);
    if (!context) {
        throw new Error('useCurrentElement must be used within a CurrentElementContextProvider');
    }
    return context;
};

type ContextProp = {
    children: React.ReactNode;
}

export const CurrentCategoryContextProvider = ({ children }: ContextProp) => {
    const [currentCategory, setCurrentCategory] = useState('');
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(0);

    return (
        <CurrentDateCategoryContext.Provider value={{ currentCategory, setCurrentCategory, minYear, setMinYear, maxYear, setMaxYear }}>
            {children}
        </CurrentDateCategoryContext.Provider>
    );
};

export default CurrentCategoryContextProvider;
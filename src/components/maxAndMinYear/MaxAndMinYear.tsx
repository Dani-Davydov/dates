import React from "react";
import "./maxAndMinYear.scss"
import {useCurrentCategory} from "../../contexts/currentDateCategoryContext";

type props = {
    minYearRef: React.RefObject<HTMLDivElement | null>;
    maxYearRef: React.RefObject<HTMLDivElement | null>;
}

export const MaxAndMinYear = ({minYearRef, maxYearRef}: props) => {
    const { minYear, maxYear } = useCurrentCategory();

    return (
        <div className="years">
            <div className="yearsItem min-year" ref={minYearRef}>
                {minYear}
            </div>
            <div className="yearsItem max-year" ref={maxYearRef}>
                {maxYear}
            </div>
        </div>
    )
}
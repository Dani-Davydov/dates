import React from "react";
import "./maxAndMinYear.scss"
import {useCurrentCategory} from "../../contexts/currentDateCategoryContext";

type Props = {
    minYearRef: React.RefObject<HTMLDivElement | null>;
    maxYearRef: React.RefObject<HTMLDivElement | null>;
}

export const MaxAndMinYear: React.FC<Props> = ({minYearRef, maxYearRef}) => {
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
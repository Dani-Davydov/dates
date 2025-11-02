import { MaxAndMinYear } from "../../maxAndMinYear/MaxAndMinYear";
import { useCurrentCategory } from "../../../contexts/currentDateCategoryContext";
import { useAnimatedYears } from "../../../hooks/useAnimatedYears";

export const MobileYears = () => {
    const { minYear, maxYear } = useCurrentCategory();
    const { minYearRef, maxYearRef } = useAnimatedYears(minYear, maxYear);

    return <MaxAndMinYear minYearRef={minYearRef} maxYearRef={maxYearRef} />;
}
import {CustomCircularSwiper} from "../../components/timelineCircle/timeLineSwiper";
import CurrentCategoryContextProvider from "../../contexts/currentDateCategoryContext";
import React from "react";
import './deskTop.scss'
import {DatesCards} from "../../components/datesCards/DatesCards";

const DesktopApp = () => {
    return (
        <div className="deskTop-app">
            <CurrentCategoryContextProvider>
                <div className="title-of-page">Исторические <br /> даты</div>
                <CustomCircularSwiper/>
                <DatesCards/>
                <div className="borders"></div>
            </CurrentCategoryContextProvider>
        </div>
    );
};

export default DesktopApp;
import React from "react";
import './mobileApp.scss'
import {SimpleSwiper} from "../../components/mobileComponents/mobileSwiper/MobileSwiper";
import CurrentCategoryContextProvider from "../../contexts/currentDateCategoryContext";
import {DatesCards} from "../../components/datesCards/DatesCards";
import {MobileYears} from "../../components/mobileComponents/mobileYears/MobileYears";

export const MobileApp: React.FC = () => {
    return (
        <div className="mobile-app">
            <CurrentCategoryContextProvider>
                <div className="title-of-page">Исторические <br/> даты</div>
                <MobileYears/>
                <DatesCards isMobile={true}/>
                <SimpleSwiper/>
            </CurrentCategoryContextProvider>
        </div>
    )
}
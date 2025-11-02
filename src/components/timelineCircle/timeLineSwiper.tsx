import { useState, useEffect } from 'react';
import './timeLineSwiper.scss';
import { useCurrentCategory } from "../../contexts/currentDateCategoryContext";
import { MaxAndMinYear } from "../maxAndMinYear/MaxAndMinYear";
import { useAnimatedYears } from "../../hooks/useAnimatedYears";

const TIMELINE_PERIODS = [
    { id: 1, text: 'Музыка' },
    { id: 2, text: 'Кино' },
    { id: 3, text: 'Театр' },
    { id: 4, text: 'Наука' },
    { id: 5, text: 'Литература' },
    { id: 6, text: 'Игры' }
];

export const CustomCircularSwiper = () => {
    const { setCurrentCategory, minYear, maxYear } = useCurrentCategory();
    const [currentElement, setCurrentElement] = useState(0);

    const { minYearRef, maxYearRef } = useAnimatedYears(minYear, maxYear);
    const totalPeriods = TIMELINE_PERIODS.length;
    const angleStep = 360 / totalPeriods;

    const RADIUS = 268;
    const INITIAL_ROTATION_OFFSET = 300;

    useEffect(() => {
        setCurrentCategory(TIMELINE_PERIODS[currentElement].text);
    }, [currentElement, setCurrentCategory]);

    const rotationAngle = -currentElement * angleStep + INITIAL_ROTATION_OFFSET;

    const handleNext = () => setCurrentElement((prev) => (prev + 1) % totalPeriods);
    const handlePrev = () => setCurrentElement((prev) => (prev - 1 + totalPeriods) % totalPeriods);

    const formatSlideNumber = (num: number) => `0${num}`;

    return (
        <div className="swiper-container">
            <div className="custom-circular-swiper">
                <div className="circle-background"></div>
                <div
                    className="circular-container"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                    {TIMELINE_PERIODS.map((period, index) => {
                        const angle = index * angleStep;
                        const isActive = index === currentElement;
                        return (
                            <div
                                key={period.id}
                                className={`circular-item ${isActive ? "active" : ""}`}
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${RADIUS}px)`,
                                }}
                                onClick={() => setCurrentElement(index)}
                            >
                                <div
                                    className="inner-item"
                                    style={{ transform: `rotate(${-(rotationAngle + angle)}deg)` }}
                                >
                                    <div className="dot">
                                        <span className="item-content">{period.id}</span>
                                    </div>
                                    <span className="category-text">{period.text}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <MaxAndMinYear minYearRef={minYearRef} maxYearRef={maxYearRef} />
            </div>
            <div className="navigation">
                <span className="current-slide">
                    {formatSlideNumber(currentElement + 1)} / {formatSlideNumber(totalPeriods)}
                </span>
                <div className="buttons">
                    <button className="switch-date-btn" onClick={handlePrev}>{'<'}</button>
                    <button className="switch-date-btn" onClick={handleNext}>{'>'}</button>
                </div>
            </div>
        </div>
    );
};
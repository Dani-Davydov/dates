import { useState, useRef, useEffect, useCallback } from "react";
import { useCurrentCategory } from "../../contexts/currentDateCategoryContext";
import { Card } from "./cards/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { SwiperRef } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './datesCards.scss';
import { useCategoryData } from "../../hooks/useCategoryData";
import { useSwiperNavigation } from "../../hooks/useSwiperNavigation";
import { useCategoryAnimation } from "../../hooks/useCategoryAnimation";
import { useYearsManager } from "../../hooks/useYearsManager";
import React from "react";

type DatesCardsProps = {
    isMobile?: boolean;
}

export const DatesCards: React.FC<DatesCardsProps> = ({ isMobile }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const { setMinYear, setMaxYear, currentCategory } = useCurrentCategory();
    const swiperRef = useRef<SwiperRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const categoryTextRef = useRef<HTMLDivElement>(null);

    const {
        displayedDatesList,
        displayedCategory,
        filteredDatesList,
        updateDisplayedData,
        shouldUpdateData
    } = useCategoryData(currentCategory);

    const {
        canGoPrev,
        canGoNext,
        updateNavigationState,
        handleSlideChange,
        slideToStart,
        slideNext,
        slidePrev
    } = useSwiperNavigation(swiperRef);

    const { animateElements } = useCategoryAnimation();
    const { updateYears } = useYearsManager(setMinYear, setMaxYear);

    useEffect(() => {
        if (displayedDatesList.length === 0 && filteredDatesList.length > 0) {
            updateDisplayedData(filteredDatesList, currentCategory);
            updateYears(filteredDatesList);
        }
    }, [displayedDatesList.length, filteredDatesList, currentCategory, updateDisplayedData, updateYears]);

    useEffect(() => {
        if (shouldUpdateData()) {
            handleCategoryChange();
        }
    }, [filteredDatesList, shouldUpdateData]);

    const handleCategoryChange = useCallback(async () => {
        setIsAnimating(true);

        const elements = [containerRef.current, ...(isMobile ? [categoryTextRef.current] : [])];
        const showAnimation = await animateElements(elements, isAnimating);

        updateDisplayedData(filteredDatesList, currentCategory);
        updateYears(filteredDatesList);

        await new Promise(resolve => requestAnimationFrame(resolve));

        if (showAnimation) {
            await showAnimation();
        }

        slideToStart();
        updateNavigationState();

        setIsAnimating(false);
    }, [
        isMobile,
        animateElements,
        isAnimating,
        updateDisplayedData,
        filteredDatesList,
        currentCategory,
        updateYears,
        slideToStart,
        updateNavigationState
    ]);

    const handleNext = useCallback(() => {
        slideNext();
    }, [slideNext]);

    const handlePrev = useCallback(() => {
        slidePrev();
    }, [slidePrev]);

    const handleSwiperSlideChange = useCallback((swiper: SwiperType) => {
        handleSlideChange(swiper);
    }, [handleSlideChange]);

    return (
        <div className="container">
            {isMobile && (
                <div
                    ref={categoryTextRef}
                    className="category-text"
                >
                    {displayedCategory}
                </div>
            )}
            <div ref={containerRef} className="dates-cards-container">
                <div className={`nav-element ${!canGoPrev ? 'nav-element--hidden' : ''}`}>
                    <button
                        disabled={!canGoPrev || isAnimating}
                        className="switch-date-btn"
                        onClick={handlePrev}
                    >
                        {'<'}
                    </button>
                </div>
                <Swiper
                    ref={swiperRef}
                    modules={[A11y]}
                    spaceBetween={80}
                    slidesPerView={"auto"}
                    centeredSlides={false}
                    initialSlide={0}
                    onSlideChange={handleSwiperSlideChange}
                    onInit={updateNavigationState}
                    watchOverflow={true}
                    resistance={true}
                    resistanceRatio={0.85}
                    breakpoints={{
                        320: {
                            slidesPerView: "auto",
                            spaceBetween: 20,
                            centeredSlides: false,
                            watchOverflow: true,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 80,
                            centeredSlides: false,
                            watchOverflow: true,
                        }
                    }}
                >
                    {displayedDatesList.map((event) => (
                        <SwiperSlide key={event.id} style={{ width: 'auto' }}>
                            <Card
                                year={event.year}
                                description={event.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={`nav-element ${!canGoNext ? 'nav-element--hidden' : ''}`}>
                    <button
                        disabled={!canGoNext || isAnimating}
                        className="switch-date-btn"
                        onClick={handleNext}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};
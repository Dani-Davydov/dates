import { useState, useRef, useEffect } from "react";
import { useCurrentCategory } from "../../contexts/currentDateCategoryContext";
import historicalData from "../../dates.json";
import { Card } from "./cards/Card";
import { gsap } from 'gsap';
import './datesCards.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';

type DatesCardsProps = {
    isMobile?: boolean,
}

export const DatesCards: React.FC<DatesCardsProps> = ({ isMobile }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedDatesList, setDisplayedDatesList] = useState<any[]>([]);
    const [canGoNext, setCanGoNext] = useState(false);
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [displayedCategory, setDisplayedCategory] = useState('');
    const swiperRef = useRef<any>(null);
    const { setMinYear, setMaxYear, currentCategory } = useCurrentCategory();

    const containerRef = useRef<HTMLDivElement>(null);
    const categoryTextRef = useRef<HTMLDivElement>(null);

    const filteredDatesList = historicalData.historicalEvents.filter(
        date => date.category === currentCategory
    );

    useEffect(() => {
        if (displayedDatesList.length === 0 && filteredDatesList.length > 0) {
            setDisplayedDatesList(filteredDatesList);
            setDisplayedCategory(currentCategory);
            updateYears(filteredDatesList);
            return;
        }

        if (JSON.stringify(displayedDatesList) !== JSON.stringify(filteredDatesList)) {
            handleCategoryChange();
        }
    }, [filteredDatesList]);

    useEffect(() => {
        updateNavigationState();
    }, [currentSlide, displayedDatesList]);

    const updateNavigationState = () => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            setCanGoPrev(!swiper.isBeginning);
            setCanGoNext(!swiper.isEnd);
        } else {
            setCanGoPrev(currentSlide > 0);
            setCanGoNext(currentSlide < displayedDatesList.length - 1);
        }
    };

    const handleCategoryChange = async () => {
        if (isAnimating || !containerRef.current) return;

        setIsAnimating(true);

        const elementsToAnimate = [containerRef.current];
        if (isMobile && categoryTextRef.current) {
            elementsToAnimate.push(categoryTextRef.current);
        }

        await gsap.to(elementsToAnimate, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.1
        });

        setCurrentSlide(0);
        setDisplayedDatesList(filteredDatesList);
        setDisplayedCategory(currentCategory);
        updateYears(filteredDatesList);

        await new Promise(resolve => requestAnimationFrame(resolve));

        await gsap.to(elementsToAnimate, {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.1
        });

        setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(0, 0);
            }
            updateNavigationState();
        }, 100);

        setIsAnimating(false);
    };

    const updateYears = (datesList: any[]) => {
        if (datesList.length > 0) {
            const years = datesList.map(item => item.year);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            setMinYear(minYear);
            setMaxYear(maxYear);
        }
    };

    const handleNext = () => {
        if (swiperRef.current && canGoNext) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && canGoPrev) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleSlideChange = (swiper: any) => {
        setCurrentSlide(swiper.activeIndex);
        setCanGoPrev(!swiper.isBeginning);
        setCanGoNext(!swiper.isEnd);
    };

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
                    onSlideChange={handleSlideChange}
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
                        768: {
                            slidesPerView: "auto",
                            spaceBetween: 40,
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
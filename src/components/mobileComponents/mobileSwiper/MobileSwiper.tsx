import React, {useEffect, useState} from 'react';
import './mobileSwiper.scss';
import {useCurrentCategory} from "../../../contexts/currentDateCategoryContext";

interface Slide {
    id: number;
    text: string;
}

const slides: Slide[] = [
    { id: 1, text: 'Музыка'},
    { id: 2, text: 'Кино' },
    { id: 3, text: 'Театр'},
    { id: 4, text: 'Наука'},
    { id: 5, text: 'Литература'},
    { id: 6, text: 'Игры'}
];

export const SimpleSwiper = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { setCurrentCategory } = useCurrentCategory();

    useEffect(() => {
        const { text } = slides[currentSlide];
        setCurrentCategory(text);
    }, [currentSlide, setCurrentCategory]);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const canGoNext = currentSlide < slides.length - 1;
    const canGoPrev = currentSlide > 0;

    return (
        <div className="simple-swiper">
            <div className="mobile-navigation">
                <span className="slide-counter">
                    {`0${currentSlide + 1}`} / {"0" + slides.length}
                </span>
                <div className="buttons">
                    <button
                        className="nav-button nav-button--prev"
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                    >
                        ‹
                    </button>
                    <button
                        className="nav-button nav-button--next"
                        onClick={handleNext}
                        disabled={!canGoNext}
                    >
                        ›
                    </button>
                </div>
            </div>
            <div className="dots-container">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentSlide ? 'dot--active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};
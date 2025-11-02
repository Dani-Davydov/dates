import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './swiper.scss';
import { useCurrentCategory } from "../../contexts/currentDateCategoryContext";
import {MaxAndMinYear} from "../maxAndMinYear/MaxAndMinYear";

const slides = [
    { id: 1, text: 'Музыка'},
    { id: 2, text: 'Кино' },
    { id: 3, text: 'Театр'},
    { id: 4, text: 'Наука'},
    { id: 5, text: 'Литература'},
    { id: 6, text: 'Игры'}
];

export const CustomCircularSwiper: React.FC = () => {
    const { setCurrentCategory, minYear, maxYear } = useCurrentCategory();
    const [currentElement, setCurrentElement] = useState(0);

    const minYearRef = useRef<HTMLDivElement | null>(null);
    const maxYearRef = useRef<HTMLDivElement | null>(null);
    const prevMinYearRef = useRef(minYear);
    const prevMaxYearRef = useRef(maxYear);

    const totalSlides = slides.length;
    const rotationAngle = -currentElement * 60 + 300;
    const radius = 268;

    useEffect(() => {
        const { text } = slides[currentElement];
        setCurrentCategory(text);
    }, [currentElement, setCurrentCategory]);

    useEffect(() => {
        if (minYear !== prevMinYearRef.current && minYearRef.current) {
            const minObj = { val: prevMinYearRef.current };

            gsap.fromTo(
                minObj,
                { val: prevMinYearRef.current },
                {
                    val: minYear,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (minYearRef.current) {
                            minYearRef.current.textContent = Math.round(minObj.val).toString();
                        }
                    },
                    onComplete: () => {
                        prevMinYearRef.current = minYear;
                    }
                }
            );
        } else if (minYearRef.current) {
            minYearRef.current.textContent = minYear.toString();
            prevMinYearRef.current = minYear;
        }
    }, [minYear]);

    useEffect(() => {
        if (maxYear !== prevMaxYearRef.current && maxYearRef.current) {
            const maxObj = { val: prevMaxYearRef.current };

            gsap.fromTo(
                maxObj,
                { val: prevMaxYearRef.current },
                {
                    val: maxYear,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (maxYearRef.current) {
                            maxYearRef.current.textContent = Math.round(maxObj.val).toString();
                        }
                    },
                    onComplete: () => {
                        prevMaxYearRef.current = maxYear;
                    }
                }
            );
        } else if (maxYearRef.current) {
            maxYearRef.current.textContent = maxYear.toString();
            prevMaxYearRef.current = maxYear;
        }
    }, [maxYear]);

    const handleNext = () => setCurrentElement((prev) => (prev + 1) % totalSlides);
    const handlePrev = () => setCurrentElement((prev) => (prev - 1 + totalSlides) % totalSlides);

    return (
        <div className="swiper-container">
            <div className="custom-circular-swiper">
                <div className="circle-background"></div>

                <div
                    className="circular-container"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                    {slides.map((slide, index) => {
                        const angle = index * (360 / totalSlides);
                        return (
                            <div
                                key={slide.id}
                                className={`circular-item ${index === currentElement ? "active" : ""}`}
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px)`,
                                }}
                                onClick={() => setCurrentElement(index)}
                            >
                                <div
                                    className="inner-item"
                                    style={{ transform: `rotate(${-(rotationAngle + angle)}deg)` }}
                                >
                                    <div className="dot">
                                        <span className="item-content">{slide.id}</span>
                                    </div>
                                    <span className="category-text">{slide.text}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <MaxAndMinYear minYearRef={minYearRef} maxYearRef={maxYearRef} />
            </div>

            <div className="navigation">
                <span className="current-slide">
                    {`0${currentElement + 1}`} / {"0" + slides.length}
                </span>
                <div className="buttons">
                    <button className="switch-date-btn" onClick={handlePrev}>{'<'}</button>
                    <button className="switch-date-btn" onClick={handleNext}>{'>'}</button>
                </div>
            </div>
        </div>
    );
};
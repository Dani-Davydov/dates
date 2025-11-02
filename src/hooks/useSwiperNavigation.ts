import React, { useState, useCallback } from 'react';
import { Swiper as SwiperType } from 'swiper';

export const useSwiperNavigation = (swiperRef: React.RefObject<any>) => {
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(false);

    const updateNavigationState = useCallback(() => {
        if (swiperRef.current?.swiper) {
            const swiper = swiperRef.current.swiper;
            setCanGoPrev(!swiper.isBeginning);
            setCanGoNext(!swiper.isEnd);
        }
    }, [swiperRef]);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setCanGoPrev(!swiper.isBeginning);
        setCanGoNext(!swiper.isEnd);
    }, []);

    const slideToStart = useCallback(() => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(0, 0);
        }
    }, [swiperRef]);

    const slideNext = useCallback(() => {
        if (swiperRef.current?.swiper && canGoNext) {
            swiperRef.current.swiper.slideNext();
        }
    }, [swiperRef, canGoNext]);

    const slidePrev = useCallback(() => {
        if (swiperRef.current?.swiper && canGoPrev) {
            swiperRef.current.swiper.slidePrev();
        }
    }, [swiperRef, canGoPrev]);

    return {
        canGoPrev,
        canGoNext,
        updateNavigationState,
        handleSlideChange,
        slideToStart,
        slideNext,
        slidePrev
    };
};
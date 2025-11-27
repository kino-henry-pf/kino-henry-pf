"use client"

import MovieData from "@/components/MovieData"
import { Movie } from "@/types/movie"
import Image from "next/image"
import * as Icon from "akar-icons"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import IconButton from "@/components/IconButton"

export default function HeroCarrousel({
    movies
}: {
    movies: Movie[]
}) {
    const sliderRef = useRef<HTMLDivElement | null>(null)

    const [_currentIndex, _setCurrentIndex] = useState(0)

    const handleNext = useCallback(() => {
        sliderRef.current?.scrollTo({behavior: "smooth", left: sliderRef.current.scrollLeft + sliderRef.current.clientWidth})
    }, [sliderRef])

    const handlePrev = useCallback(() => {
        sliderRef.current?.scrollTo({behavior: "smooth", left: sliderRef.current.scrollLeft - sliderRef.current.clientWidth})
    }, [sliderRef])

    const handleGoTo = useCallback((to: number) => {
        sliderRef.current?.scrollTo({behavior: "smooth", left: (sliderRef.current.scrollWidth / movies.length) * to})
    }, [sliderRef, movies])

    useEffect(() => {
        if (!sliderRef.current) return

        const handleSliderScroll = () => {
            if (!sliderRef.current) {
                _setCurrentIndex(0)
                return
            }

            _setCurrentIndex(
                Math.floor(
                    sliderRef.current.scrollLeft / sliderRef.current.clientWidth
                )
            )
        }

        sliderRef.current.addEventListener("scroll", handleSliderScroll)

        return () => {
            sliderRef.current?.removeEventListener("scroll", handleSliderScroll)
        }
    }, [sliderRef])

    return (
        <div className="w-full h-fit relative flex flex-col gap-10 lg:gap-5 select-none">
            <div
                className={[
                    "absolute w-fit h-fit left-5 xl:left-0 z-10 xl:ml-[calc(50%-600px)] lg:top-[50%] lg:-translate-y-[50%] lg:bottom-unset bottom-0 translate-y-[15px] transition-opacity duration-250",
                    _currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                ].join(" ")}
            >
                <IconButton onClick={handlePrev}>
                    <Icon.ChevronLeft size={24} />
                </IconButton>
            </div>
            <div
                className={[
                    "absolute w-fit h-fit right-5 xl:right-0 z-10 xl:mr-[calc(50%-600px)] lg:top-[50%] lg:-translate-y-[50%] lg:bottom-unset bottom-0 translate-y-[15px] transition-opacity duration-250",
                    _currentIndex === movies.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                ].join(" ")}
            >
                <IconButton onClick={handleNext}>
                    <Icon.ChevronRight size={24} />
                </IconButton>
            </div>
            <div ref={sliderRef} className={`overflow-x-auto snap-x snap-mandatory flex flex-row gap-10 px-10 scroll-p-0 hide-scrollbar`}>
                {
                    movies.map(movie => (
                        <div key={movie.id} className="w-screen h-fit container-x-padding">
                            <div className="snap-center shrink-0 w-screen flex items-center justify-center max-w-full h-fit">
                                <div className="w-[1300px] h-[560px] max-w-full bg-[#d9d9d9]/10 overflow-hidden rounded-4xl relative flex items-center justify-center">
                                    <Image
                                        alt={movie.title}
                                        src={movie.image}
                                        width={348}
                                        height={570}
                                        className="w-full h-full object-cover blur-md absolute top-0 left-0 z-1 opacity-20"
                                    />
                                    <div className="relative z-9 h-full max-w-full lg:w-fit w-full lg:p-20 lg:container-x-padding">
                                        <MovieData movie={movie} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center md:gap-2 justify-center">
                {
                    movies.length ? (
                        Array.from({length: movies.length}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleGoTo(index)}
                                className={[
                                    "w-3 h-3 md:rounded-full transition-colors duration-400 cursor-pointer",
                                    index !== _currentIndex ? "bg-white/30 hover:bg-white/70" : "bg-[var(--color-primary)]"
                                ].join(" ")}
                            ></button>
                        ))
                    ) : null
                }
            </div>
        </div>
    )
}
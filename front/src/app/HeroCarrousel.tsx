"use client"

import MovieData from "@/components/MovieData"
import { Movie } from "@/types/movie"
import Image from "next/image"
import * as Icon from "akar-icons"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

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
        sliderRef.current?.scrollTo({behavior: "smooth", left: sliderRef.current.clientWidth * to})
    }, [sliderRef])

    const currentItem = useMemo(() =>
        sliderRef.current ? (
            sliderRef.current.scrollLeft / sliderRef.current.clientWidth
        ).toFixed(0) : 0
    , [sliderRef.current?.scrollLeft])

    useEffect(() => {
        if (!sliderRef.current) return

        const handleSliderScroll = () => {
            if (!sliderRef.current) {
                _setCurrentIndex(0)
                return
            }

            _setCurrentIndex(
                parseInt(
                    (sliderRef.current.scrollLeft / sliderRef.current.clientWidth)
                        .toFixed(0)
                )
            )
        }

        sliderRef.current.addEventListener("scroll", handleSliderScroll)

        return () => {
            sliderRef.current?.removeEventListener("scroll", handleSliderScroll)
        }
    }, [sliderRef])

    return (
        <div className="w-full h-fit relative flex flex-col gap-5">
            <button onClick={handlePrev} className="absolute top-[50%] -translate-y-[50%] cursor-pointer left-5 md:left-0 md:ml-[calc(50%-600px)] rounded-full w-14 h-14 flex items-center justify-center bg-white/20 z-10 backdrop-blur-md border-white/10 border-1">
                <Icon.ChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="absolute top-[50%] -translate-y-[50%] cursor-pointer right-5 md:right-0 md:mr-[calc(50%-600px)] rounded-full w-14 h-14 flex items-center justify-center bg-white/20 z-10 backdrop-blur-md border-white/10 border-1">
                <Icon.ChevronRight size={24} />
            </button>
            <div ref={sliderRef} className={`overflow-x-auto snap-x snap-mandatory flex flex-row gap-10 px-10 scroll-p-0 hide-scrollbar`}>
                {
                    movies.map(movie => (
                        <div key={movie.id} className="w-screen h-fit">
                            <div className="snap-center shrink-0 w-screen flex items-center justify-center max-w-full h-fit">
                                <div className="w-[1300px] h-[560px] max-w-full bg-black overflow-hidden rounded-4xl relative flex items-center justify-center">
                                    <Image
                                        alt={movie.title}
                                        src={movie.image}
                                        width={100}
                                        height={200}
                                        className="w-full h-full object-cover blur-[10vh] absolute top-0 left-0 z-1 opacity-20"
                                    />
                                    <div className="relative z-9 h-full p-20 container-x-padding">
                                        <MovieData movie={movie} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center gap-4 justify-center">
                {
                    movies.length ? (
                        Array.from({length: movies.length}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleGoTo(index)}
                                className={[
                                    "w-3 h-3 rounded-full transition-colors duration-400 cursor-pointer",
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
"use client"

import IconButton from "@/components/IconButton"
import * as Icon from "akar-icons"
import RateMovieForm from "./RateMovieForm"
import { Movie } from "@/types/movie"
import { useRouter } from "next/navigation"

export default function RateMovieDialog({
    movie,
    open,
    onClose
}: {
    movie: Movie,
    open: boolean,
    onClose: (success: boolean) => any
}) {
    const router = useRouter()

    return (
        <div
            onClick={() => onClose(false)}
            className={[
                "fixed top-0 left-0 w-full h-full z-9999 backdrop-blur-md transition-opacity duration-250 flex overflow-y-auto items-center justify-center p-10",
                !open && "opacity-0 pointer-events-none"
            ].join(" ")}
        >
            <div
                onClick={e => e.stopPropagation()}
                className="bg-[var(--background)] border-1 border-[var(--color-border)] rounded-xl p-10 w-[800px] max-w-full h-fit flex flex-col gap-10"
            >
                <div className="w-full h-fit gap-5 items-center grid grid-cols-[1fr_auto]">
                    <h2 className="text-xl font-semibold">Rate movie <span className="text-[var(--color-primary)]">{movie.title}</span></h2>
                    <IconButton small onClick={() => onClose(false)}>
                        <Icon.Cross className="size-4" />
                    </IconButton>
                </div>
                <RateMovieForm
                    movie={movie}
                    onSuccess={() => {
                        router.refresh()
                        onClose(true)
                    }}
                />
            </div>
        </div>
    )
}
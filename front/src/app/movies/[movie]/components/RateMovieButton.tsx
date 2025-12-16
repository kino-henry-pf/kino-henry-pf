"use client"

import Button from "@/components/Button";
import { useState } from "react";
import RateMovieDialog from "./RateMovieDialog";
import { Movie } from "@/types/movie";
import { useAuth } from "@/context/authContext";

export default function RateMovieButton({
    movie
}: {
    movie: Movie
}) {
    const {dataUser: auth} = useAuth()

    const [_dialogOpen, _setDialogOpen] = useState(false)

    return auth?.user && (
        <>
            <Button
                onClick={() => _setDialogOpen(true)}
                rounded
            >Rate movie</Button>
            <RateMovieDialog
                movie={movie}
                open={_dialogOpen}
                onClose={() => _setDialogOpen(false)}
            />
        </>
    )
}
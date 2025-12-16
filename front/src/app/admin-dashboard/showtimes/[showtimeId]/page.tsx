"use client"

import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"
import { Showtime } from "@/types/showtime"

export default function AdminShowtimePage() {
    const params = useParams()

   return <SingleResourcePage<Showtime>
        resource={`showtimes/${params.showtimeId}`}
        editLink={`/admin-dashboard/showtimes/${params.showtimeId}/edit`}
        backLink="/admin-dashboard/showtimes"
        deleteResource={{
            path: `showtimes/${params.showtimeId}`,
            title: "Do you want to delete the showtime?",
            successRedirect: "/admin-dashboard/showtimes/",
            description: showtime => `The showtime will be closed: ${showtime.movie.title} - ${showtime.room.name} - ${showtime.room.branch.name}`
        }}
        mapData={showtime => ({
            title: `${showtime.movie.title} - ${showtime.room.name} - ${showtime.room.branch.name}`,
            rows: [
                {
                    name: "UUID",
                    value: showtime.id
                },
                {
                    name: "Movie",
                    value: showtime.movie.title
                },
                {
                    name: "Start at",
                    value: (new Date(showtime.startTime)).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short"
                    })
                },
                {
                    name: "Language",
                    value: showtime.language
                },
                {
                    name: "Format",
                    value: showtime.format
                },
                {
                    name: "Branch",
                    value: showtime.room.branch.name
                },
                {
                    name: "Room",
                    value: showtime.room.name
                },
                {
                    name: "Branch address",
                    value: showtime.room.branch.address
                }
            ]
        })}
    />
}
"use client"

import ResourcePage from "../templates/ResourcePage"
import Link from "next/link"
import { Showtime } from "@/types/showtime"

export default function AdminShowtimesPage() {
    return <ResourcePage<Showtime>
        title="Showtimes"
        resource="showtimes"
        head={["Movie", "Room", "Format", "Start at"]}
        mapRow={showtime => ({
            resourceId: showtime.id,
            value: [
                <Link
                    scroll={false}
                    href={`/admin-dashboard/showtimes/${showtime.id}`}
                >
                    {showtime.movie.title}
                </Link>,
                <Link
                    className="whitespace-nowrap"
                    scroll={false}
                    href={`/admin-dashboard/showtimes/${showtime.id}`}
                >
                    {showtime.room.name} - {showtime.room.branch.name}
                </Link>,
                <Link
                    scroll={false}
                    href={`/admin-dashboard/showtimes/${showtime.id}`}
                >
                    {showtime.format}
                </Link>,
                <Link
                    className="whitespace-nowrap"
                    scroll={false}
                    href={`/admin-dashboard/showtimes/${showtime.id}`}
                >
                    {(new Date(showtime.startTime)).toLocaleString("en-US", {
                        timeStyle: "short",
                        dateStyle: "short"
                    })}
                </Link>
            ]
        })}
    />
}
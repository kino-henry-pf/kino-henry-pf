"use client"

import Loader from "@/components/Loader"
import { useQuery } from "@/hooks/useQuery"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Reservation } from "@/types/reservation"
import useMutation from "@/hooks/useMutation"
import MovieData from "@/components/MovieData"
import DataTable from "@/components/DataTable"

export default function ProfileOrderPage() {
    const params = useParams(),
        router = useRouter(),
        reservationQuery = useQuery<Reservation>(`reservations/${params.reservationId}`)

    const deleteMutation = useMutation<void>(`reservations/${params.reservationId}`, {
        type: "DELETE"
    })

    useEffect(() => {
        if (reservationQuery.error) {
            router.replace("/myProfile")
        }
    }, [reservationQuery.error, router])

    return (
        <main className="w-full h-fit min-h-[calc(100dvh-6rem)] relative block">
            {
                reservationQuery.data ? (
                    <>
                        <section className="w-full h-fit py-10 container-x-padding border-y-1 border-[var(--color-border)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
                            <div className="w-full h-fit flex flex-col gap-1">
                                <h1 className="text-3xl font-bold">Reservation for <span className="text-[var(--color-primary)]">{reservationQuery.data.showtime.movie.title}</span> movie {
                                    reservationQuery.data.showtime.format === "3D" ? "in 3D" : ""    
                                }</h1>
                                <p>At {(new Date(reservationQuery.data.showtime.startTime)).toLocaleString("en-US", {
                                    dateStyle: "short",
                                    timeStyle: "short"
                                })}</p>
                            </div>
                        </section>
                        <section className="w-full h-fit grid grid-cols-1 xl:grid-cols-2 gap-10 py-10 container-x-padding">
                            <div className="w-full h-fit flex flex-col gap-10">
                                <div className="w-full h-fit flex items-center gap-4">
                                    <p>Room: <span className="ml-2 w-fit h-fit py-1 px-3 rounded-md bg-black/20 border-1 border-[var(--color-border)]">{reservationQuery.data.showtime.room.name}</span></p>
                                </div>
                                <div className="w-full h-fit flex flex-col gap-4">
                                    <p>Seats</p>
                                    <DataTable
                                        resource="seats"
                                        head={["Row", "Number"]}
                                        body={reservationQuery.data.seats.map(seatReservation => ({
                                            resourceId: seatReservation.id,
                                            value: [seatReservation.seat.row, seatReservation.seat.number]
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[550px] xl:h-[350px] xl:sticky xl:top-30 xl:right-0">
                                <MovieData
                                    movie={reservationQuery.data.showtime.movie}
                                    quoteAction={false}
                                />
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="w-full min-h-[calc(100dvh-6rem)] h-fit flex items-center justify-center pb-[6rem]">
                        <Loader className="size-10" />
                    </div>
                )
            }
        </main>
    )
}
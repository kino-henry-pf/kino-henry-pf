"use client"

import Loader from "@/components/Loader";
import UpsertResourcePage from "@/app/admin-dashboard/templates/UpsertResourcePage";
import validateShowtimeUpsert from "@/app/admin-dashboard/validate/validateShowtimeUpsert";
import { useQuery } from "@/hooks/useQuery";
import { Branch } from "@/types/branch";
import { Showtime } from "@/types/showtime";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { Room } from "@/types/room";

export default function UpdateShowtimePage() {
    const params = useParams()

    const branchesQuery = useQuery<Branch[]>("branches"),
        moviesQuery = useQuery<Movie[]>("movies")

    const [_selectedBranch, _setSelectedBranch] = useState<string | null>(null),
        roomsQuery = useQuery<Room[]>(`rooms/branch/${_selectedBranch}`, {
            autoFetch: !!_selectedBranch
        })

    useEffect(() => {
        if (!_selectedBranch) return
        roomsQuery.refetch()
    }, [_selectedBranch])

    useEffect(() => {
        if (!branchesQuery.data?.[0]) return
        _setSelectedBranch(branchesQuery.data[0].id)
    }, [branchesQuery.data])

    return branchesQuery.data && moviesQuery.data ? (
        <UpsertResourcePage<Showtime>
            type="PATCH"
            resource={`showtimes/${params.showtimeId}`}
            getterResource={`showtimes/${params.showtimeId}`}
            title="Modify showtime"
            submitText="Apply changes"
            successMessage="The showtime has been modified"
            validate={validateShowtimeUpsert}
            successRedirect={showtime => `/admin-dashboard/showtimes/${showtime?.id}`}
            backLink={`/admin-dashboard/showtimes/${params.showtimeId}`}
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "movieId",
                    label: "Movie",
                    icon: "Play",
                    required: true,
                    autoFocus: true,
                    as: "select",
                    type: "select",
                    options: moviesQuery.data.map(movie => ({
                        label: movie.title,
                        value: movie.id
                    }))
                },
                {
                    name: "branchId",
                    label: "Branch",
                    icon: "Bank",
                    as: "select",
                    type: "select",
                    required: true,
                    onChange: value => {
                        _setSelectedBranch(value)
                    },
                    options: branchesQuery.data.map(branch => (
                        {
                            value: branch.id,
                            label: branch.name
                        }
                    ))
                },
                {
                    name: "roomId",
                    label: "Room",
                    icon: "Door",
                    as: "select",
                    type: "select",
                    required: true,
                    isLoading: roomsQuery.isLoading,
                    options: roomsQuery.data?.map(branch => (
                        {
                            value: branch.id,
                            label: branch.name
                        }
                    ))
                },
                {
                    name: "startTime",
                    label: "Start at",
                    icon: "Clock",
                    type: "datetime-local",
                    required: true
                },
                {
                    name: "language",
                    label: "Language",
                    icon: "Language",
                    type: "select",
                    as: "select",
                    required: true,
                    options: [
                        {
                            label: "Dubbed",
                            value: "dubbed"
                        },
                        {
                            label: "Subtitled",
                            value: "subtitled"
                        }
                    ]
                },
                {
                    name: "format",
                    label: "Format",
                    icon: "Glasses",
                    type: "select",
                    as: "select",
                    required: true,
                    options: [
                        {
                            label: "2D",
                            value: "2D"
                        },
                        {
                            label: "3D",
                            value: "3D"
                        }
                    ]
                }
            ]}
        />
    ) : (branchesQuery.isLoading || moviesQuery.data) && !roomsQuery.error ? (
        <div className="w-full h-[400px] flex items-center justify-center">
            <Loader className="size-10" />
        </div>
    ) : (
        <span>ERROR</span>
    )
}
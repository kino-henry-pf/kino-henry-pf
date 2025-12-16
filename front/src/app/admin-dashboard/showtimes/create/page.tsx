"use client"

import { Showtime } from "@/types/showtime";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateShowtimeUpsert from "../../validate/validateShowtimeUpsert";
import { useQuery } from "@/hooks/useQuery";
import Loader from "../../../../components/Loader";
import { Branch } from "@/types/branch";
import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { Movie } from "@/types/movie";

export default function CreateShowtimePage() {
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
            type="POST"
            resource="showtimes"
            title="Create a new showtime"
            submitText="Create showtime"
            successMessage="The showtime has been created"
            validate={validateShowtimeUpsert}
            successRedirect={() => "/admin-dashboard/showtimes"}
            backLink="/admin-dashboard/showtimes"
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
    ) : (branchesQuery.isLoading || moviesQuery.isLoading) && !roomsQuery.error ? (
        <div className="w-full h-[400px] flex items-center justify-center">
            <Loader className="size-10" />
        </div>
    ) : (
        <span>ERROR</span>
    )
}
"use client"

import { Room } from "@/types/room";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateRoomUpsert from "../../validate/validateRoomUpsert";
import { useQuery } from "@/hooks/useQuery";
import Loader from "../../../../components/Loader";
import { Branch } from "@/types/branch";
import { useEffect, useRef } from "react";

export default function CreateRoomPage() {
    const branchesQuery = useQuery<Branch[]>("branches")

    const loaderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!loaderRef.current) return
        const scrollTop = window.scrollY + loaderRef.current.getBoundingClientRect().top
        window.scrollTo({
            top: scrollTop - 133.3,
            behavior: "smooth"
        })
    }, [loaderRef])

    return branchesQuery.data ? (
        <UpsertResourcePage<Room>
            type="POST"
            resource="rooms"
            title="Create a new room"
            submitText="Create room"
            successMessage="The room has been created"
            validate={validateRoomUpsert}
            successRedirect={() => "/admin-dashboard/rooms"}
            backLink="/admin-dashboard/rooms"
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Name",
                    placeholder: "Ej: Sala 2B",
                    icon: "Door",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "branchId",
                    label: "Branch",
                    icon: "Bank",
                    as: "select",
                    type: "select",
                    required: true,
                    options: branchesQuery.data.map(branch => (
                        {
                            value: branch.id,
                            label: branch.name
                        }
                    ))
                }
            ]}
        />
    ) : branchesQuery.isLoading ? (
        <div ref={loaderRef} className="w-full h-[400px] flex items-center justify-center">
            <Loader className="size-10" />
        </div>
    ) : (
        <span>ERROR</span>
    )
}
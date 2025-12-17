"use client"

import Loader from "@/components/Loader";
import UpsertResourcePage from "@/app/admin-dashboard/templates/UpsertResourcePage";
import validateRoomUpsert from "@/app/admin-dashboard/validate/validateRoomUpsert";
import { useQuery } from "@/hooks/useQuery";
import { Branch } from "@/types/branch";
import { Room } from "@/types/room";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function UpdateRoomPage() {
    const params = useParams()

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
            type="PATCH"
            resource={`rooms/${params.roomId}`}
            getterResource={`rooms/${params.roomId}`}
            title="Modify room"
            submitText="Apply changes"
            successMessage="The showtime has been modified"
            validate={validateRoomUpsert}
            successRedirect={room => `/admin-dashboard/rooms/${room?.id}`}
            backLink={`/admin-dashboard/rooms/${params.roomId}`}
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Nombre",
                    icon: "Door",
                    required: true
                },
                {
                    name: "branchId",
                    label: "Branch",
                    icon: "Bank",
                    as: "select",
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
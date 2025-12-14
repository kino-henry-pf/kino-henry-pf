"use client"

import Loader from "@/app/admin-dashboard/components/Loader";
import UpsertResourcePage from "@/app/admin-dashboard/templates/UpsertResourcePage";
import validateRoomUpsert from "@/app/admin-dashboard/validate/validateRoomUpsert";
import { useQuery } from "@/hooks/useQuery";
import { Branch } from "@/types/branch";
import { Room } from "@/types/room";
import { useParams } from "next/navigation";

export default function UpdateRoomPage() {
    const params = useParams()

    const branchesQuery = useQuery<Branch[]>("branches")

    return branchesQuery.data ? (
        <UpsertResourcePage<Room>
            type="PATCH"
            resource={`rooms/${params.roomId}`}
            getterResource={`rooms/${params.roomId}`}
            title="Modify room"
            submitText="Apply changes"
            successMessage="The film has been modified"
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
        <div className="w-full h-[400px] flex items-center justify-center">
            <Loader className="size-10" />
        </div>
    ) : (
        <span>ERROR</span>
    )
}
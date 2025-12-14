"use client"

import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"
import { Room } from "@/types/room"

export default function AdminRoomPage() {
    const params = useParams()

   return <SingleResourcePage<Room>
        resource={`rooms/${params.roomId}`}
        editLink={`/admin-dashboard/rooms/${params.roomId}/edit`}
        backLink="/admin-dashboard/rooms"
        deleteResource={{
            path: `rooms/${params.roomId}`,
            title: "Do you want to delete the room?",
            successRedirect: "/admin-dashboard/rooms/",
            description: room => `The room will be closed ${room.name}`
        }}
        mapData={room => ({
            title: room.name,
            rows: [
                {
                    name: "UUID",
                    value: room.id
                },
                {
                    name: "Name",
                    value: room.name
                },
                {
                    name: "Branch",
                    value: room.branch.name
                }
            ]
        })}
    />
}
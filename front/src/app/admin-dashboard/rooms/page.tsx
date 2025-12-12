"use client"

import ResourcePage from "../templates/ResourcePage"
import Link from "next/link"
import { Room } from "@/types/room"

export default function AdminRoomsPage() {
    return <ResourcePage<Room>
        title="Rooms"
        resource="rooms"
        head={["Name", "Branch"]}
        mapRow={room => ({
            resourceId: room.id,
            value: [
                <Link
                    href={`/admin-dashboard/rooms/${room.id}`}
                >
                    {room.name}
                </Link>,
                <Link
                    href={`/admin-dashboard/rooms/${room.id}`}
                >
                    {room.branch.name}
                </Link>
            ]
        })}
    />
}
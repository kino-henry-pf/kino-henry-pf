"use client"

import { User } from "@/types/user"
import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"

export default function AdminUserPage() {
    const params = useParams()

   return <SingleResourcePage<User>
        resource={`users/${params.userId}`}
        editLink={`/admin-dashboard/users/${params.userId}/edit`}
        backLink="/admin-dashboard/users"
        deleteResource={{
            type: "PATCH",
            path: `users/delete/${params.userId}`,
            title: "Do you want to delete the user?",
            successRedirect: "/admin-dashboard/users/",
            description: user => `The user will be deleted ${user.email}`
        }}
        mapData={user => ({
            title: user.name,
            rows: [
                {
                    name: "UUID",
                    value: user.id
                },
                {
                    name: "Name",
                    value: user.name
                },
                {
                    name: "Email",
                    value: user.email
                },
                ...user.address ? [{
                    name: "Address",
                    value: user.address
                }] : []
            ]
        })}
    />
}
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
            title: "¿Desea eliminar el usuario?",
            successRedirect: "/admin-dashboard/users/",
            description: user => `Se eliminará el usuario ${user.email}`
        }}
        mapData={user => ({
            title: user.name,
            rows: [
                {
                    name: "UUID",
                    value: user.id
                },
                {
                    name: "Nombre",
                    value: user.name
                },
                {
                    name: "Correo electrónico",
                    value: user.email
                },
                ...user.address ? [{
                    name: "Dirección",
                    value: user.address
                }] : []
            ]
        })}
    />
}
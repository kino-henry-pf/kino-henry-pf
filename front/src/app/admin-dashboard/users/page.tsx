"use client"

import { User } from "@/types/user"
import AdminResourcePage from "../_resources/AdminResourcePage"

export default function AdminUsersPage() {
    return <AdminResourcePage<User>
        title="Usuarios"
        resource="users"
        head={["Nombre", "Correo electrónico", "Dirección"]}
        mapRow={user => ({
            resourceId: user.id,
            value: [user.name, user.email, user.address]
        })}
    />
}
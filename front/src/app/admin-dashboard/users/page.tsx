"use client"

import { User } from "@/types/user"
import AdminResourcePage from "../_layouts/AdminResourcePage"
import Link from "next/link"

export default function AdminUsersPage() {
    return <AdminResourcePage<User>
        title="Usuarios"
        resource="users"
        head={["Nombre", "Correo electrónico", "Dirección"]}
        mapRow={user => ({
            resourceId: user.id,
            value: [
                <Link
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.name}
                </Link>,
                <Link
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.email}
                </Link>,
                <Link
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.address}
                </Link>
            ]
        })}
    />
}
"use client"

import { User } from "@/types/user"
import ResourcePage from "../templates/ResourcePage"
import Link from "next/link"
import * as Icon from "akar-icons"

export default function AdminUsersPage() {
    return <ResourcePage<User>
        title="Usuarios"
        resource="users"
        head={["Nombre", "Correo electrónico", "Dirección", ""]}
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
                    className="max-w-[150px] block overflow-hidden text-ellipsis"
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.address}
                </Link>,
                user.provider === "google" ? (
                    <Icon.GoogleFill className="size-6" />
                ) : (
                    <span className="text-xl font-bold text-center w-full block">K</span>
                )
            ]
        })}
    />
}
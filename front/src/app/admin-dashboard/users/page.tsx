"use client"

import { User } from "@/types/user"
import ResourcePage from "../templates/ResourcePage"
import Link from "next/link"
import * as Icon from "akar-icons"

export default function AdminUsersPage() {
    return <ResourcePage<User>
        title="Users"
        resource="users"
        head={["Name", "Email", "Address", ""]}
        mapRow={user => ({
            resourceId: user.id,
            value: [
                <Link
                    scroll={false}
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.name}
                </Link>,
                <Link
                    scroll={false}
                    href={`/admin-dashboard/users/${user.id}`}
                >
                    {user.email}
                </Link>,
                <Link
                    scroll={false}
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
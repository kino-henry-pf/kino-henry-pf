"use client"

import { useQuery } from "@/hooks/useQuery"
import { User } from "@/types/user"
import Table from "@/components/Table"

export default function AdminUsersPage() {
    const users = useQuery<User[]>("users")

    return users.data ? (
        <section className="w-full h-fit flex flex-col gap-3">
            <p>Usuarios <span className="opacity-50">{!users.isLoading && users.data ? `(${users.data.length})` : null}</span></p>
            <Table
                head={["Nombre", "Correo electrónico", "Dirección"]}
                body={
                    users.data.map(user => [
                        user.name,
                        user.email,
                        user.address
                    ])
                }
            />
        </section>
    ) : null
}
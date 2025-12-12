"use client"

import ResourcePage from "../templates/ResourcePage"
import Link from "next/link"
import { Branch } from "@/types/branch"

export default function AdminBranchesPage() {
    return <ResourcePage<Branch>
        title="Branches"
        resource="branches"
        head={["Name", "Address"]}
        mapRow={branch => ({
            resourceId: branch.id,
            value: [
                <Link
                    scroll={false}
                    href={`/admin-dashboard/branches/${branch.id}`}
                >
                    {branch.name}
                </Link>,
                <Link
                    scroll={false}
                    href={`/admin-dashboard/branches/${branch.id}`}
                >
                    {branch.address}
                </Link>
            ]
        })}
    />
}
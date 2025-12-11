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
                    href={`/admin-dashboard/branches/${branch.id}`}
                >
                    {branch.name}
                </Link>,
                <Link
                    href={`/admin-dashboard/branches/${branch.id}`}
                >
                    {branch.address}
                </Link>
            ]
        })}
    />
}
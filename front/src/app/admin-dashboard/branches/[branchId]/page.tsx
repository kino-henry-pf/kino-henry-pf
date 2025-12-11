"use client"

import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"
import { Branch } from "@/types/branch"

export default function AdminBranchPage() {
    const params = useParams()

   return <SingleResourcePage<Branch>
        resource={`branches/${params.branchId}`}
        editLink={`/admin-dashboard/branches/${params.branchId}/edit`}
        backLink="/admin-dashboard/branches"
        deleteResource={{
            path: `branches/${params.branchId}`,
            title: "Do you want to delete the branch?",
            successRedirect: "/admin-dashboard/branches/",
            description: branch => `The branch will be closed ${branch.name}`
        }}
        mapData={branch => ({
            title: branch.name,
            rows: [
                {
                    name: "UUID",
                    value: branch.id
                },
                {
                    name: "Name",
                    value: branch.name
                },
                {
                    name: "Address",
                    value: branch.address
                },
                {
                    name: "Map",
                    value: branch.latitude + ", " + branch.longitude
                }
            ]
        })}
    />
}
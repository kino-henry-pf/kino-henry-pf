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
            title: "¿Desea eliminar la sucursal?",
            successRedirect: "/admin-dashboard/branches/",
            description: branch => `Se eliminará la sucursal ${branch.name}`
        }}
        mapData={branch => ({
            title: branch.name,
            rows: [
                {
                    name: "UUID",
                    value: branch.id
                },
                {
                    name: "Nombre",
                    value: branch.name
                },
                {
                    name: "Dirección",
                    value: branch.address
                },
                {
                    name: "Mapa",
                    value: branch.latitude + ", " + branch.longitude
                }
            ]
        })}
    />
}
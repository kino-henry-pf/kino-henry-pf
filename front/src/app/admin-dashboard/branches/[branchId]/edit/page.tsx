"use client"

import UpsertResourcePage from "../../../templates/UpsertResourcePage";
import { useParams } from "next/navigation";
import { Branch } from "@/types/branch";
import validateBranchUpsert from "@/app/admin-dashboard/validate/validateBranchUpsert";

export default function UpdateBranchPage() {
    const params = useParams()

    return (
        <UpsertResourcePage<Branch>
            type="PATCH"
            resource={`branches/${params.branchId}`}
            getterResource={`branches/${params.branchId}`}
            title="Modifica una sucursal"
            submitText="Actualizar sucursal"
            successMessage="Se ha actualizado la sucursal"
            validate={validateBranchUpsert}
            successRedirect={branch => `/admin-dashboard/branches/${branch?.id}`}
            backLink={`/admin-dashboard/branches/${params.branchId}`}
            mapError={() => {
                return {
                    title: "Error desconocido",
                    description: "Se desconoce la causa del error, contacte con el soporte"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Nombre",
                    placeholder: "Ej: Centro",
                    icon: "Planet",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "address",
                    label: "Dirección",
                    icon: "CheckIn",
                    required: true
                },
                {
                    name: "latitude",
                    label: "Latitud",
                    icon: "ArrowUp",
                    type: "number",
                    required: true
                },
                {
                    name: "longitude",
                    label: "Longitud",
                    icon: "ArrowRight",
                    type: "number",
                    required: true
                }
            ]}
        />
    )
}
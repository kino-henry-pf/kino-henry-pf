"use client"

import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateBranchUpsert from "../../validate/validateBranchUpsert";
import { Branch } from "@/types/branch";

export default function CreateBranchPage() {
    return (
        <UpsertResourcePage<Branch>
            type="POST"
            resource="branches"
            title="Crear una nueva sucursal"
            submitText="Crear sucursal"
            successMessage="Se ha creado la sucursal"
            validate={validateBranchUpsert}
            successRedirect={() => "/admin-dashboard/branches"}
            backLink="/admin-dashboard/branches"
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
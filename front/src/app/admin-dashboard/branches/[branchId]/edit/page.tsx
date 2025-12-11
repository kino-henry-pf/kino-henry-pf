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
            title="Modify a branch"
            submitText="Update branch"
            successMessage="The branch has been updated"
            validate={validateBranchUpsert}
            successRedirect={branch => `/admin-dashboard/branches/${branch?.id}`}
            backLink={`/admin-dashboard/branches/${params.branchId}`}
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Name",
                    placeholder: "Ej: Center",
                    icon: "Planet",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "address",
                    label: "Address",
                    icon: "CheckIn",
                    required: true
                },
                {
                    name: "latitude",
                    label: "Latitude",
                    icon: "ArrowUp",
                    type: "number",
                    required: true
                },
                {
                    name: "longitude",
                    label: "Longitude",
                    icon: "ArrowRight",
                    type: "number",
                    required: true
                }
            ]}
        />
    )
}
"use client"

import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateBranchUpsert from "../../validate/validateBranchUpsert";
import { Branch } from "@/types/branch";

export default function CreateBranchPage() {
    return (
        <UpsertResourcePage<Branch>
            type="POST"
            resource="branches"
            title="Create a new branch"
            submitText="Create branch"
            successMessage="The branch has been created"
            validate={validateBranchUpsert}
            successRedirect={() => "/admin-dashboard/branches"}
            backLink="/admin-dashboard/branches"
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
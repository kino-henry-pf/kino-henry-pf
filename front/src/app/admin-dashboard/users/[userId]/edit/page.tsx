"use client"

import { User } from "@/types/user";
import UpsertResourcePage from "../../../templates/UpsertResourcePage";
import { useParams } from "next/navigation";
import validateUserUpdate from "@/app/admin-dashboard/validate/validateUserUpdate";

export default function UpdateUserPage() {
    const params = useParams()

    return (
        <UpsertResourcePage<User>
            type="PATCH"
            resource={`users/${params.userId}`}
            getterResource={`users/${params.userId}`}
            title="Modify a user"
            submitText="Update user"
            successMessage="The user has been updated"
            validate={validateUserUpdate}
            successRedirect={user => `/admin-dashboard/users/${user?.id}`}
            backLink={`/admin-dashboard/users/${params.userId}`}
            mapError={error => {
                if (error && error["statusCode"] && error["statusCode"] === 409) {
                    return {
                        title: "Mail in use",
                        description: "The email address provided is already in use"
                    }
                }

                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Name",
                    icon: "Person",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "email",
                    label: "Email",
                    icon: "Mention",
                    required: true
                },
                {
                    name: "address",
                    label: "Address",
                    icon: "CheckIn"
                }
            ]}
        />
    )
}
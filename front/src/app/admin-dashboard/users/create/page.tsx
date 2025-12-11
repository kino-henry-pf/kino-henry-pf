"use client"

import { User } from "@/types/user";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateUserCreation from "../../validate/validateUserCreation";

export default function CreateUserPage() {
    return (
        <UpsertResourcePage<User>
            type="POST"
            resource="auth/register"
            title="Create a new user"
            submitText="Create user"
            successMessage="The user has been created"
            validate={validateUserCreation}
            successRedirect={() => "/admin-dashboard/users"}
            backLink="/admin-dashboard/users"
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
                    placeholder: "Ej: Lindo Aramsito",
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
                },
                {
                    name: "password",
                    label: "Password",
                    icon: "Key",
                    type: "password",
                    required: true
                },
                {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    icon: "Key",
                    type: "password",
                    required: true
                }
            ]}
        />
    )
}
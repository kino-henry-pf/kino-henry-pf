"use client"

import UpsertResourcePage from "../../templates/UpsertResourcePage";
import { Product } from "@/types/product";
import validateProductCreation from "../../validate/validateProductCreation";

export default function CreateProductPage() {
    return (
        <UpsertResourcePage<Product>
            type="POST"
            resource="products"
            title="Create a new product"
            submitText="Create product"
            successMessage="The product has been created"
            successRedirect={() => "/admin-dashboard/products"}
            backLink="/admin-dashboard/products"
            validate={validateProductCreation}
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "image",
                    label: "Image",
                    icon: "Image",
                    required: true,
                    as: "file",
                    type: "file",
                },
                {
                    name: "name",
                    label: "Name",
                    icon: "WineGlass",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "description",
                    label: "Descriptión",
                    icon: "Pencil",
                    as: "textarea",
                    required: true,
                    type: "textarea"
                },
                {
                    name: "price",
                    label: "Price",
                    icon: "Coin",
                    required: true,
                },
                {
                    name: "category",
                    label: "Category",
                    icon: "ShippingBoxV2",
                    required: true,
                    as: "select",
                    options: [
                        {
                            label: "Popcorn",
                            value: "popcorn"
                        },
                        {
                            label: "Soft_drink",
                            value: "soft_drink"
                        },
                        {
                            label: "Water",
                            value: "water"
                        },
                        {
                            label: "Juice",
                            value: "juice"
                        },
                        {
                            label: "Candy",
                            value: "candy"
                        },
                        {
                            label: "Chocolates",
                            value: "chocolates"
                        },
                        {
                            label: "Gum",
                            value: "gum"
                        },
                        {
                            label: "Nachos",
                            value: "nachos"
                        },
                        {
                            label: "Hotdog",
                            value: "hotdog"
                        },
                        {
                            label: "Combo",
                            value: "combo"
                        },
                        {
                            label: "Other",
                            value: "other"
                        },
                    ]
                }
            ]}
        />
    )
}
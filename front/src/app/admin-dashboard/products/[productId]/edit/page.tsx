"use client"

import UpsertResourcePage from "../../../templates/UpsertResourcePage";
import { Product } from "@/types/product";
import validateProductUpdate from "@/app/admin-dashboard/validate/validateProductUpdate";
import { useParams } from "next/navigation";

export default function CreateProductPage() {
    const params = useParams()

    return (
        <UpsertResourcePage<Product>
            type="PATCH"
            resource={`products/${params.productId}`}
            getterResource={`products/${params.productId}`}
            title="Modify product"
            submitText="Modify product"
            successMessage="The product has been updated"
            validate={validateProductUpdate}
            mapPreview={data => data.image}
            successRedirect={product => `/admin-dashboard/products/${product?.id}`}
            backLink={`/admin-dashboard/products/${params.productId}`}
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
                            label: "chocolates",
                            value: "Chocolates"
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
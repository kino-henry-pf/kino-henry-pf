"use client"

import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"
import { Product } from "@/types/product"

export default function AdminProductPage() {
    const params = useParams()

    return <SingleResourcePage<Product>
        resource={`products/${params.productId}`}
        editLink={`/admin-dashboard/products/${params.productId}/edit`}
        backLink="/admin-dashboard/products"
        deleteResource={{
            path: `products/${params.productId}`,
            title: "Do you want to delete this product?",
            description: product => `The product will be removed "${product.name}"`,
            successRedirect: "/admin-dashboard/products"
        }}
        mapData={product => ({
            title: "Producto: " + product.name,
            image: product.image,
            rows: [
                {
                    name: "UUID",
                    value: product.id
                },
                {
                    name: "Name",
                    value: product.name
                },
                {
                    name: "Descriptión",
                    value: product.description
                },
                {
                    name: "Price",
                    value: parseFloat(product.price).toLocaleString("es-AR", {
                        currency: "ARS",
                        style: "currency"
                    })
                },
                {
                    name: "Category",
                    value: product.category
                }
            ]
        })}
    />
}
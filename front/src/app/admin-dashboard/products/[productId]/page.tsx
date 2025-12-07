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
            title: "¿Desea eliminar este producto?",
            description: product => `Se eliminará el producto "${product.name}"`,
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
                    name: "Nombre",
                    value: product.name
                },
                {
                    name: "Descripción",
                    value: product.description
                },
                {
                    name: "Precio",
                    value: parseFloat(product.price).toLocaleString("es-AR", {
                        currency: "ARS",
                        style: "currency"
                    })
                },
                {
                    name: "Categoría",
                    value: product.category
                }
            ]
        })}
    />
}
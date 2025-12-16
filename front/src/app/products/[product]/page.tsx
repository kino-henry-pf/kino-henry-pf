import { apiClient } from "@/services/apiClient";
import { Product } from "@/types/product";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProductPage({
    params
}: {
    params: Promise<{
        product: string
    }>
}) {
    try {
        const api = apiClient(),
            productId = (await params).product,
            product = await api.get<Product>(`products/${productId}`, {
                disableCache: true
            })

        return (
            <main className="w-full h-fit min-h-[calc(100vh-6rem)]">
                <section className="w-full h-full grid grid-cols-1 lg:grid-cols-[minmax(auto,.5fr)_1fr] container-x-padding py-10 grid-rows-[350px_auto] lg:grid-rows-[500px] items-center gap-10">
                    <div className="w-full h-full relative bg-[#f2f2f2]">
                        <Image
                            alt={product.name}
                            src={product.image}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2">
                        <h1 className="font-bold text-6xl mb-4 lg:mb-0">{product.name}</h1>
                        <p>{product.description}</p>
                        <p className="font-semibold text-xl text-[var(--color-primary)]">{
                            parseFloat(product.price).toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS"
                            })    
                        }</p>
                    </div>
                </section>
            </main>
        )
    } catch (error) {
        redirect("/products")
    }
}
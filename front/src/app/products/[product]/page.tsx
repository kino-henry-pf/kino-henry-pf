import Footer from "@/components/Footer";
import { useApi } from "@/hooks/api";
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
        const api = useApi(),
            productId = (await params).product,
            product = await api.get<Product>(`products/${productId}`, {
                disableCache: true
            })

        return (
            <>
                <main className="w-full h-fit min-h-[calc(100vh-6rem)]">
                    <section className="w-full h-full grid grid-cols-[minmax(auto,.5fr)_1fr] container-x-padding py-10 grid-rows-[500px] items-center gap-10">
                        <div className="w-full h-full relative">
                            <Image
                                alt={product.name}
                                src={product.image}
                                fill
                            />
                        </div>
                        <div className="w-full h-fit flex flex-col gap-2">
                            <h1 className="font-bold text-6xl">{product.name}</h1>
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
                <Footer />
            </>
        )
    } catch (error) {
        redirect("/products")
    }
}
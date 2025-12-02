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
            product = await api.get<Product>(`product/${productId}`)

        return (
            <>
                <main className="w-full h-fit min-h-[calc(100vh-6rem)]">
                    <section className="w-full h-full grid grid-cols-[minmax(auto,.3fr)_1fr] container-x-padding py-10">
                        <div className="w-full h-full relative">
                            <Image
                                alt={product.name}
                                src={product.image}
                                fill
                            />
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
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useApi } from "@/hooks/api";
import { Product } from "@/types/product";

export default async function ProductsPage() {
    const api = useApi(),
        products = await api.get<Product[]>("products")

    return (
        <>
            <main className="w-full h-fit min-h-[calc(100vh-6rem)] flex flex-col">
                <section
                    className="py-10 container-x-padding border-b-1 border-t-1 border-[var(--color-border)] flex justify-center"
                >
                    <article className="flex flex-col w-[900px] max-w-full">
                        <h1 className="text-3xl font-bold">Productos</h1>
                        <p className="text-md">Listado de alimentos, bebidas y otros.</p>
                    </article>
                </section>
                <section className="container-x-padding w-full h-fit flex justify-center py-10">
                    <article className="w-[900px] max-w-full grid grid-cols-2 gap-10 h-fit">
                        {
                            products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </article>
                </section>
            </main>
            <Footer />
        </>
    )
}
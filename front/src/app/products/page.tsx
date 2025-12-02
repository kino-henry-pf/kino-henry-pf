import Footer from "@/components/Footer";

export default function ProductsPage() {
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
            </main>
            <Footer />
        </>
    )
}
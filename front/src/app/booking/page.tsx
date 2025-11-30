import Footer from "@/components/Footer";
import { useApi } from "@/hooks/api";
import BookingSteps from "./_steps/BookingSteps";
import { Product } from "@/types/product";

export default async function BookingPage() {
    const api = useApi(),
        products = await api.get<Product[]>("products", {
            disableCache: true
        })

    return (
        <>
            <BookingSteps products={products} />
            <Footer />
        </>
    )
}
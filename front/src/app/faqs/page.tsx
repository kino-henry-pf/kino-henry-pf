import FaqsWrapper from "./wrapper";
import faqs from "@/../public/faqs.json";

export default async function FaqsPage() {
    return (
        <FaqsWrapper faqs={faqs} />
    )
}
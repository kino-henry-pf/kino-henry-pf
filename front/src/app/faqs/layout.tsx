import FaqsPage from "./page";
import faqs from "@/../public/faqs.json";

export default async function FaqsLayout() {
    return (
        <FaqsPage faqs={faqs} />
    )
}
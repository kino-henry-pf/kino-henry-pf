import Footer from "@/components/Footer";

export default function AdminDashboardPage() {
    return (
        <>
            <main className="w-full min-h-[calc(100vh-6rem)]">
                <div className="w-full h-fit container-x-padding grid grid-cols-[1fr_auto] gap-10 border-t-1 border-b-1 border-[var(--color-border)] py-10">
                    <div className="w-fit h-fit"></div>
                </div>
            </main>
            <Footer />
        </>
    )
}
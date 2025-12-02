"use client"

import Footer from "@/components/Footer";
import { useAuth } from "@/context/authContext";
import DataCard from "./DataCard";

export default function AdminDashboardPage() {
    const {dataUser: auth} = useAuth()

    return (
        <>
            <main className="w-full min-h-[calc(100vh-6rem)]">
                <section className="w-full h-fit container-x-padding flex justify-center border-t-1 border-b-1 border-[var(--color-border)] py-10">
                    <div className="w-fit h-fit w-[900px] max-w-full flex flex-col">
                        <h1 className="text-3xl font-bold">Bienvenido, <span className="text-[var(--color-primary)]">{auth?.user.name}</span></h1>
                    </div>
                </section>
                <section className="w-full h-fit flex justify-center container-x-padding py-10">
                    <div className="w-[900px] max-w-full grid grid-cols-3 gap-5">
                        <DataCard
                            icon="Send"
                            value="5,530"
                            label="Tiendas"
                        />
                        <DataCard
                            icon="Send"
                            value="5,530"
                            label="Tiendas"
                        />
                        <DataCard
                            icon="Send"
                            value="5,530"
                            label="Tiendas"
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
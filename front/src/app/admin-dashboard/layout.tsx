"use client"

import Button from "@/components/Button"
import AdminMenu from "./components/AdminMenu"
import { useAuth } from "@/context/authContext"
import Footer from "@/components/Footer"

export default function AdminDashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const {dataUser: auth} = useAuth()

    return (
        <>
            <main className="w-full h-fit min-h-[calc(100vh-6rem)] relative grid grid-cols-1 grid-rows-[auto_1fr]">
                <section className="w-full h-fit container-x-padding grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center border-t-1 border-b-1 border-[var(--color-border)] py-10">
                    <div className="h-fit w-fit flex flex-col">
                        <h1 className="text-3xl font-bold">Bienvenido, <span className="text-[var(--color-primary)]">{auth?.user.name.split(" ")[0]}</span></h1>
                        <p className="text-md opacity-50">Muestra métricas clave de la plataforma: usuarios, productos, películas y opiniones, todo en un solo lugar.</p>
                    </div>
                    <Button rounded>Imprimir reporte</Button>
                </section>
                <div className="w-full h-full relative xl:grid xl:grid-cols-[1fr_850px] md:gap-10 py-10 container-x-padding max-lg-no-padding">
                    <AdminMenu />
                    <div className="w-full h-full flex flex-col gap-10 relative">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
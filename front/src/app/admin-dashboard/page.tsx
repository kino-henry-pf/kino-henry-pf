"use client"

import Footer from "@/components/Footer";
import { useAuth } from "@/context/authContext";
import DataCard from "./DataCard";
import RoomCard from "./RoomCard";
import AdminMenu from "./_menu/AdminMenu";

export default function AdminDashboardPage() {
    const {dataUser: auth} = useAuth()

    return (
        <>
            <main className="w-full min-h-[calc(100vh-6rem)] flex flex-col">
                <section className="w-full h-fit container-x-padding flex border-t-1 border-b-1 border-[var(--color-border)] py-10">
                    <div className="h-fit w-fit flex flex-col">
                        <h1 className="text-3xl font-bold">Bienvenido, <span className="text-[var(--color-primary)]">{auth?.user.name.split(" ")[0]}</span></h1>
                    </div>
                </section>
                <div className="w-full h-full grid grid-cols-1 xl:grid-cols-[1fr_900px] gap-6 container-x-padding relative">
                    <AdminMenu />
                    <div className="w-full h-full flex flex-col">
                        <section className="w-full h-fit flex flex-col gap-3 container-x-padding py-10">
                            <p>Estadísticas</p>
                            <div className="w-full grid grid-cols-3 gap-5">
                                <DataCard
                                    icon="Glasses"
                                    value="5,530"
                                    label="Productos"
                                    color="cyan"
                                />
                                <DataCard
                                    icon="Cart"
                                    value="$2.234,00"
                                    label="Total de ventas"
                                    color="orange"
                                />
                                <DataCard
                                    icon="Play"
                                    value="512"
                                    label="Películas"
                                    color="purple"
                                />
                            </div>
                        </section>
                        <section className="w-full h-fit flex flex-col gap-3 container-x-padding py-10">
                            <p>Capacidad de las salas</p>
                            <div className="w-full flex flex-col gap-5">
                                <RoomCard
                                    room={{
                                        name: "Sala de prueba",
                                        id: "xdxdxd",
                                        branchId: "xdxdxd"
                                    }}
                                />
                                <RoomCard
                                    room={{
                                        name: "Sala de prueba",
                                        id: "xdxdxd",
                                        branchId: "xdxdxd"
                                    }}
                                />
                                <RoomCard
                                    room={{
                                        name: "Sala de prueba",
                                        id: "xdxdxd",
                                        branchId: "xdxdxd"
                                    }}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
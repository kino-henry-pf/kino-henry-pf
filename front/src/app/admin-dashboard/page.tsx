import DataCard from "./DataCard";
import RoomCard from "./RoomCard";

export default function AdminDashboardPage() {
    return (
        <>
            <section className="w-full h-fit flex flex-col gap-3">
                <p>Estadísticas</p>
                <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <section className="w-full h-fit flex flex-col gap-3">
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
        </>
    )
}
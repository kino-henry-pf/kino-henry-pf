import AccordionMenuItem from "./AccordionMenuItem";

export default function AdminMenu() {
    return (
        <aside className="w-full h-fit min-h-[550px] max-h-full xl:sticky xl:top-30 xl:left-0 overflow-y-auto">
            <div className="w-full h-full max-h-none bg-white/4 rounded-md p-6 flex flex-col gap-4">
                <p className="font-semibold text-md">Navegación</p>
                <nav className="w-full h-fit flex flex-col">
                    <AccordionMenuItem primary href="/admin-dashboard" label="Inicio" icon="HomeAlt1" />
                    <AccordionMenuItem href="/admin-dashboard/users" label="Usuarios" icon="Person">
                        <AccordionMenuItem href="#" label="Modificar usuario" icon="Edit" />
                        <AccordionMenuItem href="#" label="Eliminar usuario" icon="TrashBin" />
                        <AccordionMenuItem href="#" label="Crear usuario" icon="Clipboard" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="/admin-dashboard/movies" label="Películas" icon="Play">
                        <AccordionMenuItem href="#" label="Modificar película" icon="Edit" />
                        <AccordionMenuItem href="#" label="Eliminar película" icon="TrashBin" />
                        <AccordionMenuItem href="#" label="Crear película" icon="Clipboard" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="/admin-dashboard/products" label="Productos" icon="WineGlass">
                        <AccordionMenuItem href="#" label="Modificar producto" icon="Edit" />
                        <AccordionMenuItem href="#" label="Eliminar producto" icon="TrashBin" />
                        <AccordionMenuItem href="#" label="Crear producto" icon="Clipboard" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="#" label="Reservas" icon="FaceVeryHappy">
                        <AccordionMenuItem href="#" label="Modificar reserva" icon="Edit" />
                        <AccordionMenuItem href="#" label="Eliminar reserva" icon="TrashBin" />
                        <AccordionMenuItem href="#" label="Crear reserva" icon="Clipboard" />
                    </AccordionMenuItem>
                </nav>
            </div>
        </aside>
    )
}
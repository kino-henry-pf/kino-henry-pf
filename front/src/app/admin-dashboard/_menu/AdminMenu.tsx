import AccordionMenuItem from "./AccordionMenuItem";

export default function AdminMenu() {
    return (
        <aside className="w-full h-fit max-h-full xl:sticky xl:top-20 xl:left-0 py-10 overflow-y-auto">
            <div className="w-full h-full bg-white/4 rounded-md p-6 flex flex-col gap-4">
                <p className="font-semibold text-md">Navegación</p>
                <nav className="w-full h-fit flex flex-col">
                    <AccordionMenuItem href="#" label="Usuarios" icon="Person">
                        <AccordionMenuItem href="#" label="Crear usuario" icon="PersonAdd" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="#" label="Películas" icon="Play">
                        <AccordionMenuItem href="#" label="Crear película" icon="PersonAdd" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="#" label="Productos" icon="WineGlass">
                        <AccordionMenuItem href="#" label="Crear producto" icon="PersonAdd" />
                    </AccordionMenuItem>
                    <AccordionMenuItem href="#" label="FAQs" icon="Person">
                        <AccordionMenuItem href="#" label="Crear usuario" icon="PersonAdd" />
                    </AccordionMenuItem>
                </nav>
            </div>
        </aside>
    )
}
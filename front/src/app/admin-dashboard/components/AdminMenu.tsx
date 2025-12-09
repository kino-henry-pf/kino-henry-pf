"use client"

import { useState } from "react";
import AccordionMenuItem from "./AccordionMenuItem";
import IconButton from "@/components/IconButton";
import * as Icon from "akar-icons"

export default function AdminMenu() {
    const [_open, _setOpen] = useState(false)

    return (
        <>
            <aside
                onClick={() => _setOpen(false)}
                className={[
                    "w-full flex flex-col justify-end h-full xl:z-1 fixed max-h-full z-999999 bg-black/40 xl:bg-transparent backdrop-blur-md bottom-0 xl:sticky xl:bottom-unset xl:top-30 left-0 hide-scrollbar overflow-auto transition-opacity duration-200 px-5 xl:px-0 xl:!opacity-100 xl:!h-fit xl:!pointer-events-auto",
                    !_open ? "opacity-0 pointer-events-none" : ""
                ].join(" ")}
            >
                <div
                    onClick={event => event.stopPropagation()}
                    className={[
                        "w-full max-w-[450px] mx-auto xl:mx-0 h-fit max-h-none bg-[var(--background)] xl:bg-white/4 rounded-t-3xl xl:rounded-md p-6 flex flex-col gap-4 transition-transform duration-200 xl:!translate-y-0",
                        !_open ? "translate-y-[100%]" : ""
                    ].join(" ")}
                >
                    <p className="font-semibold text-md">Navegación</p>
                    <nav className="w-full h-fit flex flex-col">
                        <AccordionMenuItem primary href="/admin-dashboard" label="Inicio" icon="HomeAlt1" onClick={() => _setOpen(false)} />
                        <AccordionMenuItem href="/admin-dashboard/users" label="Usuarios" icon="Person">
                            <AccordionMenuItem href="/admin-dashboard/users" label="Listado de usuarios" icon="PeopleGroup" onClick={() => _setOpen(false)} />
                            <AccordionMenuItem href="/admin-dashboard/users/create" label="Crear usuario" icon="Clipboard" onClick={() => _setOpen(false)} />
                        </AccordionMenuItem>
                        <AccordionMenuItem href="/admin-dashboard/movies" label="Películas" icon="Play">
                            <AccordionMenuItem href="/admin-dashboard/movies" label="Listado de películas" icon="Folder" onClick={() => _setOpen(false)} />
                            <AccordionMenuItem href="/admin-dashboard/movies/create" label="Crear película" icon="Clipboard" onClick={() => _setOpen(false)} />
                        </AccordionMenuItem>
                        <AccordionMenuItem href="/admin-dashboard/products" label="Productos" icon="WineGlass">
                            <AccordionMenuItem href="/admin-dashboard/products" label="Listado de productos" icon="BookOpen" onClick={() => _setOpen(false)} />
                            <AccordionMenuItem href="/admin-dashboard/products/create" label="Crear producto" icon="Clipboard" onClick={() => _setOpen(false)} />
                        </AccordionMenuItem>
                        <AccordionMenuItem href="/admin-dashboard/branches" label="Sucursales" icon="CheckIn">
                            <AccordionMenuItem href="/admin-dashboard/branches" label="Listado de sucursales" icon="Bank" onClick={() => _setOpen(false)} />
                            <AccordionMenuItem href="/admin-dashboard/branches/create" label="Crear sucursal" icon="Clipboard" onClick={() => _setOpen(false)} />
                        </AccordionMenuItem>
                    </nav>
                </div>
            </aside>
            <div className="w-full flex justify-end h-0 z-999 sticky top-[calc(100%-5rem)] left-0 container-x-padding xl:px-0 block xl:hidden">
                <IconButton onClick={() => _setOpen(true)}>
                    <Icon.TextAlignJustified className="size-4" />
                </IconButton>
            </div>
        </>
    )
}
import Link from "next/link";
import * as Icon from "akar-icons"

export default function AdminMenu() {
    return (
        <aside className="w-full h-[550px] max-h-full xl:sticky xl:top-20 xl:left-0 py-10 overflow-y-auto">
            <div className="w-full h-full bg-white/4 rounded-md p-6 flex flex-col gap-4">
                <p className="font-semibold text-md">Navegación</p>
                <nav className="w-full h-fit">
                    <ul className="w-full h-fit flex flex-col gap-4">
                        <li className="flex flex-col gap-2">
                            <Link
                                href="#"
                                className="text-md font-semibold flex items-center gap-3"
                            >
                                <Icon.PeopleGroup className="size-4" />
                                <span>Usuarios</span>
                            </Link>
                            <ul className="w-full h-fit flex flex-col gap-2 ml-6">
                                <li className="flex flex-col gap-2">
                                    <Link
                                        href="#"
                                        className="text-md font-semibold flex items-center gap-3"
                                    >
                                        <Icon.PersonAdd className="size-4" />
                                        <span>Crear un usuario</span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-md font-semibold flex items-center gap-3"
                                    >
                                        <Icon.PersonAdd className="size-4" />
                                        <span>Crear un usuario</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
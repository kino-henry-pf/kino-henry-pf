import { Room } from "./types";
import * as Icon from "akar-icons"

export default function RoomCard({
    room
}: {
    room: Room
}) {
    return (
        <a
            href="#"
            className="w-full h-14 px-6 rounded-md bg-white/3 border-1 border-[var(--color-border)] grid items-center grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto] gap-6 relative overflow-hidden"
        >
            <h3 className="text-md font-semibold">{room.name}</h3>
            <div className="absolute bottom-0 left-0 lg:bottom-unset lg:left-unset w-full lg:w-fit max-w-full flex items-center gap-4 lg:relative">
                <span className="text-sm opacity-65 font-semibold hidden lg:flex">22 asientos de 55</span>
                <div className="w-full absolute bottom-0 left-0 lg:relative lg:bottom-unset lg:left-unset lg:w-[220px] max-w-full bg-[var(--background)] lg:border-1 border-[var(--color-border)] h-1 lg:h-4 relative">
                    <div className="w-[44%] h-full bg-[var(--color-primary)]"></div>
                </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                <Icon.ArrowRight className="size-4" />
            </div>
        </a>
    )
}
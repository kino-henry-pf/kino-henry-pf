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
            className="w-full h-14 px-6 rounded-md bg-white/3 border-1 border-[var(--color-border)] grid items-center grid-cols-[1fr_auto_auto] gap-6"
        >
            <h3 className="text-md font-semibold">{room.name}</h3>
            <div className="w-fit max-w-full flex items-center gap-4">
                <span className="text-sm opacity-65 font-semibold">22 asientos de 55</span>
                <div className="w-[220px] max-w-full bg-[var(--background)] border-1 border-[var(--color-border)] h-4 relative">
                    <div className="w-[44%] h-full bg-[var(--color-primary)]"></div>
                </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                <Icon.MoreVerticalFill className="size-4" />
            </div>
        </a>
    )
}
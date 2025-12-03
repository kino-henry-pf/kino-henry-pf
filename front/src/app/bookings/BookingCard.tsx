import * as Icon from "akar-icons"

export default function BookingCard({date, movie}: {
    date: string,
    movie: string
}) {
    return (
        <div className="p-2 pl-6 text-md font-bold text-left grid grid-cols-[auto_auto_1fr_auto] items-center cursor-pointer gap-4 w-[900px] max-w-full h-fit flex bg-white/2 border-1 border-[var(--color-border)] rounded-md flex-col">
            <span className="text-sm">{date}</span>
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
            <span>{movie}</span>
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors rounded-full">
                <Icon.MoreVerticalFill className="size-4" />
            </div>
        </div>
    )
}
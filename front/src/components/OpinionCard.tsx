import Avatar from "./Avatar";
import Rating from "./Rating";

export default function OpinionCard() {
    return (
        <article className="w-full h-fit p-7 flex flex-col gap-5 rounded-xl border-[var(--color-border)] border-1">
            <div className="w-full h-fit flex items-start gap-5 justify-between">
                <div className="w-fit h-fit flex items-center gap-3">
                    <Avatar>Lautaro</Avatar>
                    <span className="text-md font-semibold">Lautaro Kazalukian</span>
                </div>
                <Rating value="2.5" />
            </div>
            <p>This is a review :DD</p>
        </article>
    )
}
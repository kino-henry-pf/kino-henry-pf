export default function HeroCarrousel() {
    return (
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-10 px-10 scroll-p-0 hide-scrollbar">
            <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-blue-500 rounded-4xl"></div>
            <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-green-500 rounded-4xl"></div>
            <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-purple-500 rounded-4xl"></div>
            <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-orange-500 rounded-4xl"></div>
        </div>
    )
}
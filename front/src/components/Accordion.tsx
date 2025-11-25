"use client"

import * as Icon from "akar-icons"
import { useEffect, useRef, useState } from "react"

export default function Accordion({
    question, answer
} : {
    question: string,
    answer: string
}) {
    const parentRef = useRef<HTMLDivElement | null>(null),
        [_isOpen, _setIsOpen] = useState(false)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!parentRef.current?.contains(event.target as Node)) {
                _setIsOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [parentRef])

    return (
        <div ref={parentRef} className="w-[900px] max-w-full h-fit flex bg-white/2 border-1 border-[#1b1b1b] rounded-md flex-col px-6">
            <button className="w-full h-fit py-4 text-md font-bold text-left flex items-center justify-between cursor-pointer" onClick={() => _setIsOpen(!_isOpen)}>
                <span>{question}</span>
                <Icon.ChevronDown
                    strokeWidth={3}
                    className={[
                        "size-4 transition-transform",
                        _isOpen ? "rotate-180" : ""
                    ].join(" ")}
                />
            </button>
            <div className={[
                "w-full text-md overflow-hidden h-fit relative ease-in duration-300",
                _isOpen ? "max-h-[30vh]" : "max-h-0"
            ].join(" ")}>
                <span className="mb-4 text-md block">
                    {answer}
                </span>
            </div>
        </div>
    )
}
"use client"

import Searcher from "@/components/Searcher"
import Logo from "../../../public/logo.png"
import Image from "next/image"
import Accordion from "@/components/Accordion"
import { useMemo, useState } from "react"
import { Faq } from "./types"

export default function FaqsPage({
    faqs
}: {
    faqs: Faq[]
}) {
    const [_search, _setSearch] = useState("")

    const results = useMemo(() => {
        return faqs?.filter(faq =>
            faq.question.includes(_search)
        )
    }, [_search])

    return (
        <main className="w-full h-full flex items-center justify-center flex-col bg-background pb-10 gap-20">
            <header className="w-full h-fit flex items-center justify-center bg-white/2 container-x-padding pt-5 border-b-[#1b1b1b] border-b-1">
                <Image
                    alt="Logo de KINO - PNG"
                    src={Logo}
                    className="h-10 w-fit"
                />
            </header>
            <div className="w-fit h-fit flex flex-col gap-5 text-center">
                <h1 className="text-4xl font-bold">Preguntas frecuentes</h1>
                <Searcher onInput={_setSearch} />
            </div>
            <div className="w-full container-x-padding h-fit flex flex-col gap-5 items-center">
                {
                    faqs?.map(faq => (
                        <Accordion
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))
                }
            </div>
        </main>
    )
}
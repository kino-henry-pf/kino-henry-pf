"use client"

import Searcher from "@/components/Searcher"
import Logo from "../../../public/logo.png"
import Image from "next/image"
import Accordion from "@/components/Accordion"
import { useCallback, useMemo, useState } from "react"
import { Faq } from "./types"
import Button from "@/components/Button"

export default function FaqsPage({
    faqs
}: {
    faqs: Faq[]
}) {
    const [_search, _setSearch] = useState("")

    const normalizeText = useCallback((text: string) => 
        text.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase()
    , [])

    const results = useMemo(() => {
        return faqs?.filter(faq =>
            normalizeText(faq.question).includes(
                normalizeText(_search)
            )
        )
    }, [_search, normalizeText])

    return (
        <main className="w-full h-full flex items-center justify-center flex-col bg-background pb-10 gap-20">
            <header className="w-full h-fit flex items-center justify-center bg-white/2 container-x-padding pt-5 border-b-[#1b1b1b] border-b-1">
                <Image
                    alt="Logo de KINO - PNG"
                    src={Logo}
                    className="h-10 w-fit"
                />
            </header>
            <div className="h-fit flex flex-col gap-5 text-center container-x-padding w-full md:w-fit">
                <h1 className="text-4xl font-bold">Preguntas frecuentes</h1>
                <Searcher onInput={_setSearch} value={_search} />
            </div>
            <div className="w-full container-x-padding h-fit flex flex-col gap-5 items-center">
                {
                    results.length > 0 ? results?.map(faq => (
                        <Accordion
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    )) : (
                        <>
                            <span className="text-2xl opacity-70">Sin resultados</span>
                            <Button onClick={() => _setSearch("")}>Limpiar filtros</Button>
                        </>
                    )
                }
            </div>
        </main>
    )
}
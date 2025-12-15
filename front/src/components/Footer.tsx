"use client"

import Logo from "@/../public/logo.png"
import { useAuth } from "@/context/authContext"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    let {dataUser: auth} = useAuth()

    return (
        <footer className="w-full h-fit container-x-padding py-10 flex justify-center lg:gap-10 bg-black/50 lg:flex-row flex-col items-end lg:items-start">
            <Link href="/" className="lg:mr-20 w-fit flex justify-end">
                <Image
                    alt="Logo KINO - PNG"
                    src={Logo}
                    className="lg:w-auto lg:h-20 w-[80%] h-auto lg:p-0"
                />
            </Link>
            <nav className="flex flex-col gap-2 items-end text-right w-full lg:w-fit lg:items-start lg:text-left mb-10 lg:mb-0">
                <h3 className="text-xl font-semibold">Navigation</h3>
                <ul className="flex flex-col items-end lg:items-start">
                    <li>
                        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Home</Link>
                    </li>
                    <li>
                        <Link href="/products" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Products</Link>
                    </li>
                    <li>
                        <Link href="/faqs" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Frequently Asked Questions</Link>
                    </li>
                    <li>
                        <Link href="/branches" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Branches</Link>
                    </li>
                </ul>
            </nav>
            <nav className="flex flex-col gap-2 items-end text-right w-full lg:w-fit lg:items-start lg:text-left">
                <h3 className="text-xl font-semibold">User</h3>
                {
                    !auth ? (
                        <ul className="flex flex-col items-end lg:items-start">
                            <li>
                                <Link href="/login" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Login</Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Register user</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex flex-col items-end lg:items-start">
                            {
                                auth.user.role === "admin" && (
                                    <li>
                                        <Link href="/admin-dashboard" className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">Administration</Link>
                                    </li>
                                )
                            }
                        </ul>
                    )
                }
            </nav>
        </footer>
    )
}
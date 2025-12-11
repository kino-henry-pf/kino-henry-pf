"use client"

import Avatar from "./Avatar"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/authContext"
import { userSessionInterface } from "@/types/userSession"

export default function UserButton({
    user
}: {
    user: userSessionInterface
}) {
    const { dataUser, logout } = useAuth();
    const [_menuOpen, _setMenuOpen] = useState(false)

    return (
        <div className="w-fit h-fit relative">
            <button onClick={() => _setMenuOpen(!_menuOpen)} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 cursor-pointer group rounded-full bg-white/10 p-2 pr-6 max-w-58 select-none text-left">
                <Avatar>{user.user.name}</Avatar>
                <div className="text-white max-w-full">
                <p className="font-semibold w-full whitespace-nowrap text-ellipsis overflow-hidden text-md">{user.user.name}</p>
                <p className="text-sm text-gray-400 w-full whitespace-nowrap text-ellipsis overflow-hidden">{user.user.email}</p>
                </div>
            </button>
            {
                _menuOpen && (
                    <div className="absolute right-0 top-16 w-48 bg-[#232323] border border-gray-700 rounded-xl shadow-xl p-2">
                        <Link
                            href="/myProfile"
                            className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                        >
                            My profile
                        </Link>
                        <Link
                          href="/faqs"
                          className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                        >
                          Frequently Asked Questions
                        </Link>
                        <Link
                            href="/bookings"
                            className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                        >
                            My reservations
                        </Link>
                        {dataUser ? (
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={logout}
                              className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg cursor-pointer"
                            >
                             <a href="/login">Log out</a> 
                            </button>
                          </div>
                        ) : (
                          <Link href="/login" className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                            login
                          </Link>
                         )}
                    </div>

                )
            }
        </div>
    )
}

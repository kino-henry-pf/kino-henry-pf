'use client'

import BookingCard from "./BookingCard";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function Dashboard() {
    
    const { dataUser } = useAuth();

    return (
        <>
            <main>
                <section className="border-t-1 border-b-1 border-[var(--color-border)] gap-10 py-10 container-x-padding flex justify-center">
                    <div className="w-[900px] max-w-full flex md:items-center justify-between flex-col md:flex-row gap-5">
                        <div className="w-fit h-fit flex flex-col">
                            <h1 className="text-3xl font-bold">Welcome, <span className="text-[var(--color-primary)]">{dataUser?.user.name.split(" ")[0]}</span></h1>
                            <p>You have 4 bookings today</p>
                        </div>
                        <Link
                            href="/bookings"
                            className="w-fit h-fit px-6 py-3 bg-[var(--color-primary)] rounded-full font-semibold text-sm text-[var(--primary-foreground)]"
                        >
                            Book new tickets
                        </Link>
                    </div>
                </section>
                <section className="w-full h-fit min-h-[calc(100vh-12rem)] flex flex-col items-center py-10 container-x-padding">
                    <div className="flex flex-col gap-7 w-[900px] max-w-full">
                        <h2 className="text-xl font-bold">Reservations</h2>
                        <div className="w-full h-fit flex flex-col gap-5">
                            <BookingCard
                                date="Friday, November 3rd"
                                movie="Toy Story"
                            />
                            <BookingCard
                                date="Friday, November 3rd"
                                movie="Toy Story"
                            />
                            <BookingCard
                                date="Friday, November 3rd"
                                movie="Toy Story"
                            />
                            <BookingCard
                                date="Friday, November 3rd"
                                movie="Toy Story"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
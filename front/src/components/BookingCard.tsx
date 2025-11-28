import Image from "next/image";

export default function BookingCard() {
    return (
        <div className="w-full h-fit grid grid-cols-[170px_1fr]">
            <Image
                width={267}
                height={400}
                alt={"Imagen de prueba"}
                src={"https://theposterdb.com/api/assets/52633"}
                className="h-auto w-full rounded-2xl object-cover"
            />
        </div>
    )
}
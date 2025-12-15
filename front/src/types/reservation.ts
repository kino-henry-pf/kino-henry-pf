import { Seat } from "./seat"
import { Showtime } from "./showtime"

export type Reservation = {
    id: string
    showtime: Showtime
    createdAt: Date
    seats: {
        id: string
        seat: Seat
    }[]
    status: "pending" | "cancelled" | "confirmed"
}
import { Branch } from "./branch"
import { Product } from "./product"
import { Seat } from "./seat"

export type Order = {
    id: string
    branch: Branch
    details: {
        id: string
        product: Product
        seatReservation: {
            id: string
            seat: Seat
        }
        quantity: number
        price: number
    }[]
    total: number
    status: string
}
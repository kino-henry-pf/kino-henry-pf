import { User } from "./user"

export type Review = {
    id: string
    review: string
    rating: string
    user: User
}
"use client"

import { useEffect, useState } from "react"
import { useApi } from "./api"
import { Movie } from "@/types/movie"

export const useMovies = ({
    disableCache = true
}: {
    disableCache?: boolean
}) => {
    const api = useApi()

    const [_data, _setData] = useState<Movie[] | null>(null),
        [_isLoading, _setIsLoading] = useState(true),
        [_error, _setError] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Movie[]>("movies", {
                    disableCache
                })
                _setData(response)
            } catch(error) {
                _setError(error)
            } finally {
                _setIsLoading(false)
            }
        }

        fetchData()
    }, [api, disableCache])

    return [_data, {
        isLoading: _isLoading,
        isError: !!_error,
        error: _error
    }]
}
"use client"

import { useEffect, useState } from "react"

export const useMovies = () => {

    
    const [_isLoading, _setIsLoading] = useState(true),
        [_error, _setError] = useState<any>(null)

    useEffect
}
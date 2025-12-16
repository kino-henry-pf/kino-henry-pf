"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

export default function LocationPicker({
    onChange,
    defaultValue
}: {
    defaultValue?: {
        lat: number,
        lng: number
    },
    onChange?: (latLng: {
        lat: number,
        lng: number
    }) => any
}) {
    const mapRef = useRef<HTMLDivElement | null>(null),
        mapInstanceRef = useRef<google.maps.Map | null>(null),
        markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

    const [_coords, _setCoords] = useState<{
        lat: number,
        lng: number
    } | null>(null)

    useEffect(() => {
        (async function() {
            if (!mapRef.current || !window.google || mapInstanceRef.current) {
                return
            }

            await window.google.maps.importLibrary("maps")
            await window.google.maps.importLibrary("marker")

            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: {lat: 39.8283, lng: -98.5795},
                zoom: 4,
                gestureHandling: "greevy",
                fullscreenControl: false,
                streetViewControl: false,
                clickableIcons: false,
                mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            })

            mapInstanceRef.current.addListener("idle", () => {
                document.querySelector<HTMLElement>("gmp-internal-dialog")?.remove()
            })

            mapInstanceRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
                if (!e.latLng) return

                if (!markerRef.current) {
                    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                        position: e.latLng,
                        map: mapInstanceRef.current
                    })

                    const pos = markerRef.current!.position
                    if (!pos) return
                    _setCoords({
                        lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                    })
                    onChange?.({
                        lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                    })

                    markerRef.current.addListener("dragend", () => {
                        const pos = markerRef.current!.position
                        if (!pos) return
                        _setCoords({
                            lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                            lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                        })
                        onChange?.({
                            lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                            lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                        })
                    })
                } else {
                    const pos = e.latLng
                    markerRef.current.position = pos
                    _setCoords({
                        lat: typeof pos.lat === "number" ? pos.lat as unknown as number : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng as unknown as number : pos.lng()
                    })
                    onChange?.({
                        lat: typeof pos.lat === "number" ? pos.lat as unknown as number : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng as unknown as number : pos.lng()
                    })
                }

                requestAnimationFrame(() => {
                    document.querySelector<HTMLElement>("gmp-internal-dialog")?.remove()
                })
            })
        }())
    }, [mapRef, mapInstanceRef, markerRef])

    useEffect(() => {
        (async function() {
            if (!defaultValue || !mapInstanceRef) {
                return
            }

            await window.google.maps.importLibrary("maps")
            await window.google.maps.importLibrary("marker")

            mapInstanceRef.current?.setZoom(10)
            mapInstanceRef.current?.setCenter({
                lat: defaultValue.lat,
                lng: defaultValue.lng
            })

            if (markerRef.current) {
                markerRef.current.position = {
                    lat: defaultValue.lat,
                    lng: defaultValue.lng
                }
            } else {
                markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                    position: {
                        lat: defaultValue.lat,
                        lng: defaultValue.lng
                    },
                    map: mapInstanceRef.current
                })

                markerRef.current.addListener("dragend", () => {
                    const pos = markerRef.current!.position
                    if (!pos) return
                    _setCoords({
                        lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                    })
                    onChange?.({
                        lat: typeof pos.lat === "number" ? pos.lat : pos.lat(),
                        lng: typeof pos.lng === "number" ? pos.lng : pos.lng()
                    })
                })
            }
        }())
    }, [defaultValue, mapInstanceRef, markerRef])

    return (
        <>
            <div ref={mapRef} className="w-full h-full relative"></div>
        </>
    )
}
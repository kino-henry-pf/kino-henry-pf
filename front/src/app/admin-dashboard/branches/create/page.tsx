"use client"

import { useEffect, useState } from "react";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateBranchUpsert from "../../validate/validateBranchUpsert";
import { Branch } from "@/types/branch";
import { useQuery } from "@/hooks/useQuery";

export default function CreateBranchPage() {
    const [_latLng, _setLatLng] = useState<null | {
        lat: number,
        lng: number
    }>(null)

    const [_mapLatLng, _setMapLatLng] = useState<null | {
        lat: number,
        lng: number
    }>(null)

    const [_address, _setAddress] = useState("")

    const addressQuery = useQuery<{
        address: string
    }>(
        `google-maps/${_latLng?.lat || 0}/${_latLng?.lng || 0}`,
        {
            autoFetch: false
        }
    )

    useEffect(() => {
        addressQuery.refetch()
    }, [_latLng])

    useEffect(() => {
        if (!addressQuery.data?.address) return
        _setAddress(addressQuery.data.address)
    }, [addressQuery.data?.address])

    return (
        <UpsertResourcePage<Branch>
            type="POST"
            resource="branches"
            title="Create a new branch"
            submitText="Create branch"
            successMessage="The branch has been created"
            validate={validateBranchUpsert}
            successRedirect={() => "/admin-dashboard/branches"}
            backLink="/admin-dashboard/branches"
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "location",
                    type: "location",
                    as: "location",
                    label: "Select location",
                    icon: "Map",
                    required: true,
                    defaultValue: _mapLatLng || undefined,
                    onChange: (v) => {
                        _setLatLng(v)
                    }
                },
                {
                    name: "name",
                    label: "Name",
                    placeholder: "Ej: Center",
                    icon: "Planet",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "address",
                    label: "Address",
                    icon: "CheckIn",
                    isLoading: addressQuery.isLoading,
                    defaultValue: _address || "",
                    onChange: (v) => _setAddress(v),
                    required: true
                },
                {
                    name: "latitude",
                    label: "Latitude",
                    icon: "ArrowUp",
                    type: "number",
                    required: true,
                    defaultValue: _latLng?.lat || "",
                    onChange: (v) => {
                        _setLatLng({
                            lng: _latLng?.lng || 0,
                            lat: parseFloat(v)
                        })
                        _setMapLatLng({
                            lng: _latLng?.lng || 0,
                            lat: parseFloat(v)
                        })
                    }
                },
                {
                    name: "longitude",
                    label: "Longitude",
                    icon: "ArrowRight",
                    type: "number",
                    required: true,
                    defaultValue: _latLng?.lng || "",
                    onChange: (v) => {
                        _setLatLng({
                            lat: _latLng?.lat || 0,
                            lng: parseFloat(v)
                        })
                        _setMapLatLng({
                            lat: _latLng?.lat || 0,
                            lng: parseFloat(v)
                        })
                    }
                }
            ]}
        />
    )
}
'use client'

import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyProfilePage() {

  const { dataUser } = useAuth();
  const [historial, setHistorial] = useState<any[]>([]);

  useEffect(() => {
    if (!dataUser?.user.id) return;

    const historialProfile = async (userID: string) => {
      try {
        const response = await fetch(`${API_URL}/reservations/user/${userID}`);

        if (!response.ok) {
          throw new Error("Error retrieving reservations");
        }

        const data = await response.json();
        console.log("RESERVATIONS DATA ===>", data);
        setHistorial(data);

      } catch (error) {
        console.error("reservationsService error:", error);
        setHistorial([]);
      }
    };

    // acá la ejecutamos pasándole el userID
    historialProfile(dataUser.user.id);

  }, [dataUser]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-6 pt-10">

      <h1 className="text-4xl font-bold mb-2">
        Mi <span className="text-yellow-500">Profile</span>
      </h1>
      <p className="text-gray-400 mb-10">Your account information</p>

      <div className="bg-[#1A1A1A] p-6 rounded-2xl max-w-xl shadow-lg border border-[#2a2a2a] mb-12">

        <div className="mb-6">
          <p className="text-gray-400 text-sm">Name</p>
          <p className="text-xl font-semibold">
            {dataUser?.user.name || "Charging..."}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-xl font-semibold">
            {dataUser?.user.email || "Charging..."}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Order history</h2>

      <div className="space-y-4 max-w-3xl">

        {historial.map(order => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-xl px-6 py-4 flex justify-between items-center shadow-md"
          >
            <div>
              <p className="font-semibold text-lg">{order.date}</p>
              <p className="text-yellow-500 font-bold text-md mt-1">
                ● {order.movie}
              </p>
            </div>

            <p
              className={`text-sm px-3 py-1 rounded-full border 
                ${order.status === "Confirmed"
                  ? "border-green-600 text-green-400"
                  : "border-red-600 text-red-400"
                }`}
            >
              {order.status}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
'use client'

import { useAuth } from "@/context/authContext"
import { useQuery } from "@/hooks/useQuery";
import { Showtime } from "@/types/showtime";

export default function MyProfilePage() {

  const { dataUser } = useAuth(),
    historyQuery = useQuery<{
      showtime: Showtime,
      id: string,
      status: string
    }[]>(`reservations/user/${dataUser?.user.id}`)

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

        {historyQuery.data?.map(order => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-xl px-6 py-4 flex justify-between items-center shadow-md"
          >
            <div>
              <p className="font-semibold text-lg">{(new Date(order.showtime.startTime)).toLocaleString("en-US", {timeStyle: "short", dateStyle: "short"})}</p>
              <p className="text-yellow-500 font-bold text-md mt-1">
                ● {order.showtime.movie.title}
              </p>
            </div>

            <p
              className={`text-sm px-3 py-1 rounded-full border 
                ${order.status === "confirmed"
                  ? "border-green-600 text-green-400"
                  : "border-red-600 text-red-400"
                }`}
            >
              {order.status}
            </p>
          </div>
        )) || "Charging..."}

      </div>
    </div>
  );
}
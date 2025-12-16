'use client';

import { useEffect } from 'react';
import DataCard from './components/DataCard';
import RoomCard from './components/RoomCard';
import { useQuery } from '@/hooks/useQuery';
import Loader from '../../components/Loader';

type RoomOccupancy = {
  roomId: string;
  roomName: string;
  branch: string;
  totalSeats: number;
  sold: number;
};

export default function AdminDashboardPage() {
  const productsQuery = useQuery<{ totalProducts: number }>(
    'analytics/total-products'
  );

  const ticketsQuery = useQuery<{ totalTickets: number }>(
    'analytics/total-tickets'
  );

  const revenueQuery = useQuery<{ totalRevenue: number }>('analytics/revenue');

  const roomsOccupancyQuery = useQuery<RoomOccupancy[]>(
    'analytics/rooms/occupancy'
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return productsQuery.data &&
    ticketsQuery.data &&
    revenueQuery.data &&
    roomsOccupancyQuery.data ? (
    <>
      <section className="w-full h-fit flex flex-col gap-3 lg:![padding-right:0] lg:![padding-left:0] container-x-padding">
        <p>Statistics</p>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <DataCard
            icon="Glasses"
            value={productsQuery.data?.totalProducts.toString() || '-'}
            label="Products sold"
            color="cyan"
          />
          <DataCard
            icon="Ticket"
            value={ticketsQuery.data?.totalTickets.toString() || '-'}
            label="Tickets sold"
            color="orange"
          />
          <DataCard
            icon="Coin"
            value={
              revenueQuery.data?.totalRevenue.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              }) || '-'
            }
            label="Total raised"
            color="purple"
          />
        </div>
      </section>
      <section className="w-full h-fit flex flex-col gap-7 lg:![padding-right:0] lg:![padding-left:0] container-x-padding pb-5 xl:pb-0">
        <p>Room capacity</p>
        <div className="w-full flex flex-col gap-7">
          {roomsOccupancyQuery.data
            ?.reduce(
              (acc, curr) => {
                if (!acc.find((branch) => branch.branch === curr.branch)) {
                  acc.push({
                    branch: curr.branch,
                    occupancy: [],
                  });
                }

                const index = acc.findIndex(
                  (branch) => branch.branch === curr.branch
                );

                acc[index].occupancy.push(curr);

                return acc;
              },
              [] as {
                branch: string;
                occupancy: RoomOccupancy[];
              }[]
            )
            .map((branch) => (
              <div
                key={branch.branch}
                className="w-full h-fit flex flex-col gap-5"
              >
                <p className="text-sm font-semibold">{branch.branch}</p>
                <div className="w-full h-fit flex flex-col gap-4">
                  {branch.occupancy.map((room, index) => (
                    <RoomCard
                      key={index}
                      id={room.roomId}
                      name={room.roomName}
                      seats={room.totalSeats}
                      sold={room.sold}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  ) : (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Loader className="size-10" />
    </div>
  );
}

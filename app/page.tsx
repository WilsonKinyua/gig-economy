"use client"
import { useEffect, useState } from 'react';
import { getAllGigs } from '@/lib/fetchers';
import { Gig } from '@/lib/types';

export default function Home() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const gigsData = await getAllGigs();
      setGigs(gigsData.response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gigs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className='uppercase'>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">User Name</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig: Gig) => (
              <tr key={gig.id}>
                <td className="py-2 px-4 border-b">{gig.name}</td>
                <td className="py-2 px-4 border-b">{Number(gig.gigpricingplans[0].price_).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                <td className="py-2 px-4 border-b">{gig.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client"
import React, { useState, useEffect } from 'react';
import GigDetailModal from '../components/GigDetailModal';
import { getAllGigs } from '@/lib/fetchers';
import { Gig } from '@/lib/types';
import { Loader } from 'lucide-react';

export default function Home() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGigDetails, setSelectedGigDetails] = useState<Gig | null>(null);

  useEffect(() => {
    async function fetchData() {
      const gigsData = await getAllGigs();
      setGigs(gigsData.response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gigs</h1>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader
              className='animate-spin text-primary h-10 w-10'
            />
          </div>
        ) : (
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
                  <tr key={gig.id} onClick={() => setSelectedGigDetails(gig)}>
                    <td className="py-2 px-4 border-b">{gig.name}</td>
                    <td className="py-2 px-4 border-b">{Number(gig.gigpricingplans[0].price_).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                    <td className="py-2 px-4 border-b">{gig.user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedGigDetails && <GigDetailModal gig={selectedGigDetails} onClose={() => setSelectedGigDetails(null)} />}
    </div>
  );
}
"use client"
import React, { useState, useEffect } from 'react';
import GigDetailModal from '@/components/GigDetailModal';
import { getAllGigs } from '@/lib/fetchers';
import { Gig } from '@/lib/types';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Card from '@/components/ui/Card';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGigDetails, setSelectedGigDetails] = useState<Gig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      const gigsData = await getAllGigs();
      setGigs(gigsData.response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredGigsBySearch = gigs.filter(gig =>
    gig.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGigsBySearch.length / itemsPerPage);
  const currentGigsView = filteredGigsBySearch.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleChangeOfAPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container mx-auto my-10">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader
                className='animate-spin text-primary h-10 w-10'
              />
            </div>
          ) : (
            <Card>
              <input
                type="search"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-gray-300"
              />
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead className='uppercase bg-primary text-white'>
                    <tr>
                      <th className="py-2 px-4 border-b border-r border-l">Title</th>
                      <th className="py-2 px-4 border-b border-r border-l">Price</th>
                      <th className="py-2 px-4 border-b border-r border-l">User Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGigsView.map((gig: Gig) => (
                      <tr key={gig.id} onClick={() => setSelectedGigDetails(gig)} className='hover:cursor-pointer hover:bg-gray-100 transition duration-500'>
                        <td className="py-2 px-4 border-b border-r border-l">{gig.name}</td>
                        <td className="py-2 px-4 border-b border-r border-l">{Number(gig.gigpricingplans[0].price_).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                        <td className="py-2 px-4 border-b border-r border-l">{gig.user.username}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleChangeOfAPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
                >
                  <ChevronLeft /> <span>Previous</span>
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => handleChangeOfAPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
                >
                  <span>Next</span> <ChevronRight />
                </button>
              </div>
            </Card>
          )}
        </div>
        {selectedGigDetails && <GigDetailModal gig={selectedGigDetails} onClose={() => setSelectedGigDetails(null)} />}
      </div>
    </React.Fragment>
  );
}
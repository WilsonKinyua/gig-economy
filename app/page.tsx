"use client"
import React, { useState, useEffect } from 'react';
import GigDetailModal from '@/components/GigDetailModal';
import { getAllGigs } from '@/lib/fetchers';
import { Gig } from '@/lib/types';
import { ArrowRight, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

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
    <div className="container mx-auto my-10">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader
              className='animate-spin text-primary h-10 w-10'
            />
          </div>
        ) : (
          <div>
            <input
              type="search"
              placeholder="Search for a gig by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-0 h-14 focus:border-gray-300 w-full"
            />
            <div className="grid grid-cols-1 gap-4">
              {currentGigsView.length > 0 ? currentGigsView.map((gig: Gig) => (
                <div key={gig.id} onClick={() => setSelectedGigDetails(gig)} className="border-2 rounded-xl p-4 hover:cursor-pointer hover:bg-gray-100 transition duration-500 hover:border-primary hover:border-2 hover:border-l-8 group">
                  <div className='flex items-center space-x-5 mb-4'>
                    <Image
                      src={'/1.png'}
                      alt={gig.name}
                      width={200}
                      height={200}
                      className='w-14 h-14 object-contain'
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{gig.name}</h3>
                      <h4 className="text-gray-600 font-semibold">By <span className="uppercase">{gig.user.username}</span></h4>
                    </div>
                  </div>
                  <div className='lg:flex lg:justify-between lg:items-center'>
                    <div className="mb-2 flex items-center space-x-2">
                      <p className='font-bold'>Price: </p>
                      {gig.gigpricingplans.map(plan => (
                        <Badge key={plan.id}>{Number(plan.price_).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</Badge>
                      ))}
                    </div>
                    <div className='font-bold text-primary hidden lg:group-hover:block'>
                      <div className='flex items-center space-x-2'><span>View details</span> <ArrowRight /></div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center bg-red-500 text-white rounded-xl font-bold py-6">
                  No gigs found!
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleChangeOfAPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
              >
                <ChevronLeft /> <span>Previous</span>
              </button>
              <div className='text-center'>
                <p>Page {currentPage} of {totalPages}</p>
                <p>
                  Showing {currentPage === totalPages ? filteredGigsBySearch.length : currentPage * itemsPerPage} of {filteredGigsBySearch.length} results
                </p>
              </div>
              <button
                onClick={() => handleChangeOfAPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
              >
                <span>Next</span> <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedGigDetails && <GigDetailModal gig={selectedGigDetails} onClose={() => setSelectedGigDetails(null)} />}
    </div>
  );
}
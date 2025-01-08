import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="p-5 uppercase shadow-md text-primary font-medium">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Image src="https://www.gigeconomydata.org/sites/default/files/styles/full_content/public/2018-05/gigeconomydata.org__0.png" alt="Gigs Economy" width={100} height={50} className='w-full h-14' />
                </div>
                <div className="hidden md:flex space-x-10 text-lg items-center">
                    <Link href="#">Home</Link>
                    <Link href="#">Gigs</Link>
                    <Link href="#">About Us</Link>
                    <Link href="#">Services</Link>
                    <Link href="#">Contact</Link>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg transition duration-300 uppercase">
                        Register
                    </button>
                </div>
                <div className="md:hidden">
                    <Menu className='h-10 w-10' />
                </div>
            </div>
        </nav>
    );
}
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="p-6 uppercase shadow-md text-primary font-">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Image src="https://www.gigeconomydata.org/sites/default/files/styles/full_content/public/2018-05/gigeconomydata.org__0.png" alt="Gigs Economy" width={100} height={50} className='w-full lg:h-20 h-14' />
                </div>
                <div className="hidden md:flex space-x-8 text-lg items-center">
                    <Link href="#">Home</Link>
                    <Link href="#">About Us</Link>
                    <Link href="#">Services</Link>
                    <Link href="#">Contact</Link>
                    <Button>Register</Button>
                </div>
                <div className="md:hidden">
                    <Menu className='h-10 w-10' />
                </div>
            </div>
        </nav>
    );
}
import { Gig } from '@/lib/types';
import { X } from 'lucide-react';
import React from 'react';
import Separator from './ui/Separator';
import Badge from './ui/Badge';

interface GigDetailModalProps {
    gig: Gig | null;
    onClose: () => void;
}

export default function GigDetailModal({ gig, onClose }: GigDetailModalProps) {
    if (!gig) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center">
            <div className="bg-white p-7 rounded-lg lg:max-w-4xl w-full">
                <X className="cursor-pointer float-right text-primary h-9 w-9" onClick={onClose} />
                <h2 className="text-xl font-bold mb-4">{gig.name}</h2>
                <Separator />
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="font-bold uppercase">User Name:</td>
                            <td>{gig.user.username}</td>
                        </tr>
                        <tr>
                            <td className="font-bold uppercase">Tags:</td>
                            <td>{gig.tags.length > 0 ? gig.tags.map(tag => <Badge key={tag.id}>{tag.name}</Badge>) : 'No tags'}</td>
                        </tr>
                        <tr>
                            <td className="font-bold uppercase">Categories:</td>
                            <td>{gig.categories.length > 0 ? gig.categories.map(category => <Badge key={category.id}>{category.name}</Badge>) : 'No categories'}</td>
                        </tr>
                    </tbody>
                </table>
                <Separator />
                <div>
                    <h3 className="text-xl font-bold mt-4">Pricing Plans</h3>
                   
                </div>
            </div>
        </div>
    );
};
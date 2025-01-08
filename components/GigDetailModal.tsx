import { Gig } from '@/lib/types';
import { X } from 'lucide-react';
import React from 'react';
import Separator from '@/components/ui/Separator';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

interface GigDetailModalProps {
    gig: Gig | null;
    onClose: () => void;
}

export default function GigDetailModal({ gig, onClose }: GigDetailModalProps) {
    if (!gig) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        // onClick={onClose}
        >
            <motion.div
                className="bg-white p-7 rounded-lg lg:max-w-4xl w-full max-h-full overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <X className="cursor-pointer float-right text-primary h-9 w-9 text-red-500" onClick={onClose} />
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
                            <td className='lg:flex lg:space-x-3 lg:space-y-0 space-y-2'>{gig.tags.length > 0 ? gig.tags.map(tag => <Badge key={tag.id}>{tag.name}</Badge>) : '-'}</td>
                        </tr>
                        <tr>
                            <td className="font-bold uppercase">Categories:</td>
                            <td className='lg:flex lg:space-x-3 lg:space-y-0 space-y-2'>{gig.categories.length > 0 ? gig.categories.map(category => <Badge key={category.id}>{category.name}</Badge>) : '-'}</td>
                        </tr>
                    </tbody>
                </table>
                <Separator />
                <div>
                    <h3 className="text-xl font-bold my-8">Pricing Plans</h3>
                    <div className="space-y-4">
                        {gig.gigpricingplans.map((plan, index) => (
                            <Card key={index}>
                                <h4 className="text-lg font-semibold text-primary uppercase">Plan {index + 1}</h4>
                                <p className="text-gray-700 my-2"><span className="font-bold">Price:</span> {Number(plan.price_).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</p>
                                <p className="text-gray-700"><span className="font-bold">Description:</span> {plan.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
                <Separator />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg uppercase mt-4 float-right"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
}
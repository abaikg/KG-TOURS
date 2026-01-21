import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@prisma/client';

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full">
                {tour.images[0] ? (
                    // Using a regualar img tag if external url, or Next Image if configured. 
                    // For simplicity with external URLs without domain config, using img or assuming config is set.
                    // Using standard img for external urls to avoid config issues for now.
                    <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow">
                    {tour.duration} Days
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                    <span className="text-lg font-bold text-blue-600">${tour.price}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{tour.shortDescription || tour.description}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {tour.location}
                </div>
                <Link href={`/tours/${tour.slug}`} className="block w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default TourCard;

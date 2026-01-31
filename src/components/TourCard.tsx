import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@prisma/client';

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="nature-card group overflow-hidden h-full flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                {tour.images[0] ? (
                    <img 
                        src={tour.images[0]} 
                        alt={tour.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                ) : (
                    <div className="w-full h-full bg-sage-100 flex items-center justify-center text-sage-400">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-forest-800 shadow-sm border border-white/20">
                    {tour.duration} Days
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="text-xl font-bold text-forest-900 leading-tight group-hover:text-forest-700 transition-colors">
                        {tour.title}
                    </h3>
                    <span className="text-lg font-black text-gold whitespace-nowrap">
                        ${tour.price}
                    </span>
                </div>
                
                <p className="text-forest-800/70 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {tour.shortDescription || tour.description}
                </p>
                
                <div className="mt-auto space-y-4">
                    <div className="flex items-center text-forest-800/60 text-xs font-bold uppercase tracking-wider">
                        <svg className="w-4 h-4 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {tour.location || "Kyrgyzstan"}
                    </div>
                    
                    <Link href={`/tours/${tour.slug}`} className="block w-full">
                        <button className="w-full btn-nature-primary text-sm py-3 uppercase tracking-widest">
                            {/* We can use translation here if we had access to the hook, but for now strict text or prop */}
                            View Expedition
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourCard;

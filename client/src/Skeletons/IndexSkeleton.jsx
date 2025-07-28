import React, { useState } from 'react';
import Cities from '../Components/Cities';

export default function IndexSkeleton() {
    const [temp, setTemp] = useState('');

    return (
        <div className='mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 rounded-t-2xl pt-3 pb-10'>
            {Array(8).fill(0).map((_, i) => (
                <div className='m-4' key={i}>
                    <div className='relative mb-2 w-[275px] h-[175px] rounded-2xl overflow-hidden bg-gray-300 animate-pulse' />
                    <div className='h-4 bg-gray-300 rounded w-2/3 mb-1 animate-pulse' />
                    <div className='h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse' />
                    <div className='h-4 bg-gray-400 rounded w-1/3 animate-pulse' />
                </div>
            ))}
        </div>
    );
}

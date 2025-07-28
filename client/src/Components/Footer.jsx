import React from 'react';
import { Link } from 'react-router-dom';
import { RentEaseLogo } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-900 py-3 px-6 rounded-b-2xl">
      <Link to={"/home"} className="flex items-end gap-1 px-2">
        <RentEaseLogo size="h-9 w-8" />
        <h1 className="text-xl text-gray-600 hover:text-gray-800">RentEase</h1>
      </Link>
  
      <div className='flex justify-between px-12 py-3'>
        <div>
          <h3 className="text-lg font-semibold mb-2">Reach Out to Us</h3>
          <div className='flex gap-1 items-center'>
            <p className="w-fit cursor-pointer">Email: <span className='hover:underline hover:text-blue-800'>RentEase@support.com</span></p>
          </div>
          <p className="w-fit cursor-pointer">Twitter: <span className='hover:underline hover:text-blue-800'>RentEase_official</span></p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Useful Information</h3>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">About Us</p>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Privacy Policy</p>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Terms of Service</p>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Support</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Latest Updates</p>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Blog</p>
          <p className="w-fit cursor-pointer hover:underline hover:text-blue-800">Community</p>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} RentEase™. All rights reserved.
      </div>
    </footer>
  );
}

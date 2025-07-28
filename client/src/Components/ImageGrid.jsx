import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageGrid({ images = [] }) {
    const navigate = useNavigate();
    const [makeFlex, setMakeFlex] = useState(false);

    const featuredImage = images[0];
    const sideImages = makeFlex ? images.slice(1) : images.slice(1, 5);

    return (
        <div className="w-full max-w-[1250px] mx-auto grid grid-cols-7 grid-rows-2 gap-1 rounded-xl overflow-hidden h-[350px]">
            {/* Featured Image */}
            <div className="col-span-3 row-span-2 relative overflow-hidden rounded-xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                    <img src={`http://localhost:4000/uploads/user-places/${featuredImage}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-50" />
                </div>
            </div>


            {/* Side Images */}
            <div
                className={`col-span-4 row-span-2 gap-1 max-h-[350px] ${makeFlex ? 'flex flex-wrap content-start overflow-y-auto pr-1' : 'grid grid-cols-2 grid-rows-2 pr-7'} `}>
                {sideImages.map((img, idx) => (
                    <div key={idx} className={`relative ${makeFlex ? 'w-[49%] h-[49.5%]' : 'w-full h-full'}`}>
                        <div className="w-full h-full overflow-hidden rounded-xl">
                            <img src={`http://localhost:4000/uploads/user-places/${img}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-50" />
                        </div>

                        {/* Show all photos button */}
                        {!makeFlex && idx === 3 && images.length > 5 && (
                            <div onClick={() => setMakeFlex(true)} className="flex items-center gap-2 absolute bottom-2 right-2 bg-white text-black text-sm px-3 py-1 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition" >
                                Show all photos
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

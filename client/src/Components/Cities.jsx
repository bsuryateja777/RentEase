import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Cities({ city, setCity }) {
    const cities = ["All Cities", "Mumbai", "Hyderabad", "Ahmedabad", "Bangalore", "Kolkata", "Delhi", "Goa"];
    const navigate = useNavigate();
    const location = useLocation();

    const handleCityClick = (selectedCity) => {
        setCity(selectedCity);
        const params = new URLSearchParams(location.search);
        params.delete('search');
        params.set('city', selectedCity);
        navigate(`/home?${params.toString()}`);
    };

    return (
        <div className='mx-5 flex flex-wrap gap-3 items-center justify-evenly mt-5'>
            {cities.map((c) => (
                <button
                    key={c}
                    onClick={() => handleCityClick(c)}
                    className={`px-3 py-1 rounded-full border ${city === c ? 'bg-gray-800 hover:bg-black shadow shadow-primary shadow-md text-white' : 'bg-white border-black'}`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
}

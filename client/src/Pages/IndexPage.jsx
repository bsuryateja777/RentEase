import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Cities from '../Components/Cities.jsx';
import Footer from '../Components/Footer.jsx';
import IndexSkeleton from '../Skeletons/IndexSkeleton.jsx';

export default function IndexPage() {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [city, setCity] = useState('All Cities');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const initialCity = searchParams.get('city') || 'All Cities';

  useEffect(() => {
    setLoading(true);
    axios.get('/places', { params: { city: initialCity, search: searchQuery || '' } })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPlaces(res.data);
        } else {
          console.error('Unexpected /places response:', res.data);
          setPlaces([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load places:', err.response?.data || err.message);
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    axios.get('/profile').then((res) => {
      setUser(res.data);
    });
  }, []);


  return (
    <div>
      <Cities city={city} setCity={setCity} />
      {loading ? (
        <IndexSkeleton />
      ) : (
        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 rounded-t-2xl pt-4 pb-10'>
          {places.length == 0 && (
            <div className=' flex items-center justify-center text-red-700 min-h-[70px] min-w-[1200px]'>
              <p className='text-md'>There are no places for your {searchQuery ? 'search term' : 'selected city'} <strong className='text-2xl font-playfair tracking-loose text-red-600'>[{searchQuery || initialCity}]</strong></p>
            </div>
          )}
          {Array.isArray(places) && places.length > 0 &&
            places.map((place, index) => (
              <Link to={`/home/${place._id}`} state={place} key={index} className='m-4'>
                <div className='relative group mb-2 w-[275px] h-[175px] rounded-2xl overflow-hidden bg-gray-300'>
                  {(place.pricep1N < 150 || place.pricep2N < 250) && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm z-10 animate-pulse'>
                      % Exclusive price
                    </div>
                  )}
                  {place.photos?.[0] && (
                    <img className='w-full h-full object-cover transform transition duration-300 group-hover:scale-105 group-hover:brightness-75'
                      src={place.photos?.[0]} alt={place.title} />
                  )}
                </div>
                <h2 className='text-md font-serif mx-1 truncate leading-4'>
                  {place.title}
                </h2>
                <h2 className='text-sm text-gray-600 ml-1.5 truncate'>
                  {place.address}
                </h2>
                <span
                  className={`${place.pricep1N < 150
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-black via-yellow-700 to-red-500 animate-pulse shadow shadow-gray-500 ml-1 mt-1'
                    : 'font-bold'
                    } font-serif italic px-2 py-0.5 rounded`}
                >
                  ${place.pricep1N} per Night
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

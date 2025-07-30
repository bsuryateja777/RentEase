import AccountNav from '../Components/AccountNav'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyGuests() {
  const [userGuests, setUserGuests] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserAndGuests = async () => {
      try {
        let currentUser = user;

        if (!currentUser) {
          const { data } = await axios.get('/profile');
          setUser(data);
          currentUser = data;
        }

        if (currentUser?._id) {
          const Res = await axios.get('/my-guests/' + currentUser._id);
          setUserGuests(Res.data);
        }

      } catch (err) {
        console.error('Error loading Guests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndGuests();
  }, []);

  return (
    <div className='pb-10'>
      <AccountNav />
      <h1 className='text-primary ml-3 text-2xl text-left mb-2 mt-3'>My Guests</h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading Guests...</p>
      ) : userGuests.length > 0 ? (
        <div className="">
          {userGuests.map((guest, index) => (
            <Link to={`/home/` + guest.place._id} key={index} className=" flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md shadow-red-300 mb-4 cursor-pointer">

              <div className=' flex w-[250px] h-[150px] bg-gray-200 grow-0 shrink-0 rounded-lg'>
                {guest.place?.photos?.length > 0 && (
                  <img className='object-cover h-full w-full rounded-lg' src={'https://rentease-backend-5p7h.onrender.com/uploads/user-places/' + guest.place.photos[0]} />
                )}
              </div>

              <div className='grow'>
                <h2 className="text-xl font-semibold text-black">{guest.place.title}</h2>
                <p className="text-gray-500 mb-2">{guest.place.address}</p>
                <div className='flex gap-6 mb-1'>
                  <p>Name: {guest.guest.name}</p>
                  <p>Email: {guest.guest.email}</p>
                </div>
                <div className='flex gap-6 mb-1'>
                  <p>From: {new Date(guest.fromDate).toLocaleDateString()}</p>
                  <p>To: {new Date(guest.toDate).toLocaleDateString()}</p>
                </div>
                <div className='flex gap-2 '>
                <p>Purpose: {guest.purpose || 'N/A'}</p>
                <p>Price: {guest.price || 'N/A'}</p>
                </div>
              </div>

            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">You don't have any Guests yet.</p>
      )}
    </div>
  );
}

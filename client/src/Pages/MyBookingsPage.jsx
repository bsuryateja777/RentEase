import AccountNav from '../Components/AccountNav';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import ConfirmDialog from '../Components/ConfirmDialog';
import { CalenderIcon, DeleteIcon, MoreOptions, RightArrows } from '../Components/Icons';

export default function MyBookingsPage() {
  const [userBookings, setUserBookings] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showMoreID, setShowMoreID] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);


  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        let currentUser = user;

        if (!currentUser) {
          const { data } = await axios.get('/profile');
          setUser(data);
          currentUser = data;
        }

        if (currentUser?._id) {
          const bookingsRes = await axios.get('/my-bookings/' + currentUser._id);
          setUserBookings(bookingsRes.data);
        }

      } catch (err) {
        console.error('Error loading bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBookings();
  }, []);

  const handleDeleteClick = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/delete-booking/${bookingToDelete}`);

      setUserBookings(prev => prev.filter(b => b._id !== bookingToDelete));
    } catch (err) {
      console.error("Error deleting booking:", err);
    } finally {
      setShowConfirm(false);
      setBookingToDelete(null);
    }
  };

  const toggleShowMore = (id) => {
    setShowMoreID(prev => (prev === id ? null : id));
  };


  return (
    <div className="pb-10">
      <AccountNav />
      <h1 className='text-primary ml-3 text-2xl text-left mb-2 mt-3'>My Bookings</h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading bookings...</p>
      ) : userBookings.length > 0 ? (
        <div className="space-y-4">
          {userBookings.map((booking, index) => (
            <div key={index} className="relative flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md shadow-purple-300 mb-4">

              <Link to={`/home/${booking.place._id}`} className="flex gap-4 w-full">
                <div className='flex w-[250px] h-[150px] bg-gray-200 shrink-0 rounded-lg'>
                  {booking.place.photos.length > 0 && (
                    <img
                      className='object-cover h-full w-full rounded-lg'
                      src={'http://localhost:4000/uploads/user-places/' + booking.place.photos[0]}
                      alt="Place"
                    />
                  )}
                </div>

                <div className='grow'>
                  <h2 className="text-xl font-semibold text-black">{booking.place.title}</h2>
                  <p className="text-gray-500 mb-4">{booking.place.address}</p>
                  <div className='flex gap-3'>
                    <p className='flex flex-row gap-1'> {new Date(booking.fromDate).toLocaleDateString()}  <CalenderIcon /> </p>
                    <RightArrows />
                    <p className='flex flex-row gap-1'> {new Date(booking.toDate).toLocaleDateString()}    <CalenderIcon /> </p>
                  </div>

                  <p className='text-transparent text-xl w-fit px-2 py-0.5 mt-3 -ml-1 bg-clip-text bg-gradient-to-l from-black via-red-500 to-yellow-900 font-playfair italic rounded'>
                    Price : $ {booking.price || 'N/A'}
                  </p>
                </div>
              </Link>

              <button className='absolute top-3 right-3 hover:bg-transparent' onClick={() => toggleShowMore(booking._id)} >
                <MoreOptions />
              </button>

              {showMoreID === booking._id && (
                <div className='absolute flex items-center justify-center top-7 right-10 bg-white px-2 py-0.5 rounded-lg'>
                  <button className='px-2 rounded-lg hover:bg-gray-100 mt-0' onClick={() => handleDeleteClick(booking._id)} >
                    Delete Booking
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">You don't have any bookings yet.</p>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this booking?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookingStatusPopup from './BookingStatusPopup';
import { toast } from 'react-toastify';

export default function BookingForm({ user, place }) {
  const [fullName, setFullName] = useState(``);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.name) setFullName(user.name);
  }, [user]);

  const today = new Date().toISOString().split('T')[0];

  const getNights = () => {
    if (!fromDate || !toDate) return 0;
    const diff = new Date(toDate) - new Date(fromDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = getNights();

  const calculateTotal = () => {
  if (nights <= 0) return 0;
  const twoNightSets = Math.floor(nights / 2);
  const oneNightSets = nights % 2;
  return twoNightSets * place.pricep2N + oneNightSets * place.pricep1N;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info('You need to login before booking!');
      return navigate('/login', { state: { place } });
    }

    const calculatedPrice = calculateTotal();

    const userBookingDetails = {
      fullName,
      fromDate,
      toDate,
      purpose,
      price: calculatedPrice,
    };

    try {
      await axios.post(`/${place._id}/booking`, {
        place,
        user,
        userBookingDetails,
      });
      setBookingStatus('Booking Success!');
    } catch (err) {
      console.error(err);
      setBookingStatus('Booking Failed!');
    }

    setShowPopup(true);
  };


  return (
    <div className="mt-6 max-w-md p-4 border border-gray-300 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book this Place</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">From Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2" value={fromDate} min={today} onChange={(e) => setFromDate(e.target.value)} required />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">To Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2" value={toDate} min={fromDate || today} onChange={(e) => setToDate(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Purpose</label>
          <input className="w-full border rounded-lg px-3 py-2" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="(Optional)" />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-xl hover:bg-primaryHover transition disabled:opacity-50"
          disabled={nights <= 0}>
          {nights > 0 ? `Book Now for $${calculateTotal()}` : 'Select Dates'}
        </button>

      </form>

      {showPopup && (
        <BookingStatusPopup
          bookingStatus={bookingStatus}
          calculateTotal={calculateTotal}
          setShowPopup={setShowPopup}
          onClose={() => navigate('/account/my-bookings')}
        />
      )}
    </div>
  );
}

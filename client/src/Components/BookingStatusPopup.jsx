import React from 'react';

export default function BookingStatusPopup({ setShowPopup, calculateTotal, bookingStatus, onClose }) {
    const isSuccess = bookingStatus === 'Booking Successful!';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="flex items-center justify-center flex-col bg-white rounded-lg p-6 shadow-lg text-center max-w-sm w-full">
                <h2 className={`text-xl font-bold mb-3 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {bookingStatus}
                </h2>
                <p className="mb-4">Total Amount: ₹{calculateTotal()}</p>
                <button onClick={() => { setShowPopup(false); if (onClose) onClose(); }} className="mt-2 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600" >
                    Close
                </button>
            </div>
        </div>
    );
}

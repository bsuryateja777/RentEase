import React, { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ChangePasswordPopup({ setShowPassDiv }) {
  const { user } = useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function changePassword(e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      const res = await axios.put(`/account-center/change-password/${user._id}`, {
        currentPassword,
        newPassword
      });

      toast.success(res.data.message || "Password changed successfully");
      setShowPassDiv(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white text-black px-6 py-8 rounded-xl shadow-lg shadow-gray-300 w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label className="text-left font-medium ml-2">Current Password</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border border-gray-300 px-3 py-2 rounded" />

            <label className="text-left font-medium ml-2">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border border-gray-300 px-3 py-2 rounded" />

            <label className="text-left font-medium ml-2">Re-enter New Password</label>
            <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="border border-gray-300 px-3 py-2 rounded" />
          </div>

          <div className="flex justify-center gap-6 pt-2">
            <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setShowPassDiv(false)}>Cancel</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={changePassword}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

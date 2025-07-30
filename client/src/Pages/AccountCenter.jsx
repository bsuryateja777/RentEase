import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../userContext";
import axios from "axios";
import PersonalInformationPopup from "../Components/PersonalInformationPopup";
import ChangePasswordPopup from "../Components/ChangePasswordPopup";

export default function AccountCenter() {
  const navigate = useNavigate();
  const {user, setUser } = useContext(UserContext);

  const [showPersDiv, setShowPersDiv] = useState(false)
  const [showPassDiv, setShowPassDiv] = useState(false)
  const [redirect, setredirect] = useState('')


  async function logout() {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);  // Clear context
      navigate('/home');  // Redirect
    }
  }


  if (!user) return <div>Not logged in</div>;

  return (
    <div className="mt-10">
      <h1 className="text-[45px] font text-center">Account Center</h1>
      <div className="flex flex-col items-center justify-center text-center py-3 bg-gray-100 rounded-t-xl  ">
        <div className=" flex flex-col border border-gray-400 px-7 py-3 w-[500px]">

          <button onClick={() => setShowPersDiv(true)}> Personal Information</button>
          {showPersDiv && (
            <PersonalInformationPopup setShowPersDiv={setShowPersDiv} />
          )}


          <button onClick={() => setShowPassDiv(true)}> Change Password</button>
          {showPassDiv && (
            <ChangePasswordPopup setShowPassDiv={setShowPassDiv} />
          )}

          <button><Link to={'/account/my-accomodations/new'}>Accomodate a Place</Link></button>
          <button> Credits</button>
          <button>Help</button>

        </div>
        <button onClick={logout} className="primary max-w-sm m-2">Logout</button>
      </div>
    </div >

  );
}

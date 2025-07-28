import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../userContext';

export default function PersonalInformationPopup({ setShowPersDiv }) {

  const { ready, user, setUser } = useContext(UserContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')



    useEffect(() => {

        if (!ready || !user) return;

        axios.get('/account-center/personal-details/' + user._id)
            .then(res => {
                const data = res.data;
                setName(data.name || '')
                setEmail(data.email || '')
                setAge(data.age || '')
                setGender(data.gender || '')
            })
            .catch(err => {
                console.log("Failed to fetch User Data: ", err)
                toast.error("Could Not load user datils");
            });

    }, [ready, user])

    async function changePersonalDetails(e) {
        e.preventDefault();

        const userData = { name, email, age, gender };

        try {
            const res = await axios.put(`/account-center/personal-details/${user._id}`, userData);
            toast.success("Personal details updated successfully!");
            setShowPersDiv(false);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message);
            } else {
                console.error("Error updating details:", err);
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div>
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30'>
                <div className="bg-white text-black px-3 py-8 rounded-xl shadow-lg shadow-gray-300 w-[1100px] max-w-lg">
                    <h2 className="text-lg font-semibold mb-4">Change Your Personal Details</h2>

                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <div className="flex gap-2">
                        <input className="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required></input>

                        <select className="gender" value={gender} onChange={e => setGender(e.target.value)} required>
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="flex justify-center gap-4">

                        <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setShowPersDiv(false)}> Cancel </button>
                        <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={changePersonalDetails}>Change Details</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

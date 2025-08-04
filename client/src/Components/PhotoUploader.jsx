import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { DeleteIcon, PrimaryIcon } from '../Components/Icons.jsx';
import { toast } from 'react-toastify';
import '../index.css';




export default function PhotoUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState('')

    async function addPhotoByLink(e) {
        e.preventDefault();

        if (!photoLink.startsWith('http')) {
            toast.error("Enter a valid image URL");
            return;
        }

        try {
            const res = await axios.post('/upload-to-cloudinary', { image: photoLink });
            const { url, public_id } = res.data;
            

            onChange(prev => [...prev, url]);
            console.log("url: ", url);
            console.log("secure_id: ", public_id);
            setPhotoLink('');
        } catch (err) {
            toast.error("Failed to upload from link.");
        }
    }


    async function uploadPhoto(e) {
        const files = e.target.files;
        const updated = [];

        if(!files) return;

        for (let i = 0; i < files.length; i++) {
            const data = new FormData();
            data.append('file', files[i]);
            data.append('upload_preset', 'RentEase-Preset'); // Only for unsigned uploads
            data.append('cloud_name', 'dxvdbojpj');

            const res = await fetch('https://api.cloudinary.com/v1_1/dxvdbojpj/image/upload', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();
            updated.push(result.secure_url);
        }

        onChange(prev => [...prev, ...updated]);
    }



    function deletePic(e, filename) {
        e.preventDefault();

        const updatedPhotos = addedPhotos.filter(photo => photo !== filename);

        const originalPhotos = [...addedPhotos];

        // Update state
        onChange(updatedPhotos);

        // Show undo option
        toast.info(
            <span>
                Photo deleted.
                <button
                    className="undo-button"
                    type="button"
                    onClick={() => {
                        toast.dismiss("delete-toast");
                        onChange(originalPhotos);
                    }}
                >
                    Undo
                </button>
            </span>,
            {
                toastId: "delete-toast",
                autoClose: 5000,
                closeButton: false,
            }
        );
    }



    function makePrimary(e, filename) {
        e.preventDefault();

        let changed = false;

        onChange(prev => {
            if (prev[0] === filename) {
                return prev;
            } else {
                changed = true;
                return [filename, ...prev.filter(p => p !== filename)];
            }
        });

        setTimeout(() => {
            if (changed) {
                toast.dismiss()
                toast.dark("Primary image changed");
            } else {
                toast.dismiss()
                toast.info("The image is already primary");
            }
        }, 0);
    }




    return (
        <div>

            <div id="photos" className='flex gap-2'>
                <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using link .....jpg" />
                <button onClick={addPhotoByLink} className='bg-primary text-white px-8 -my-0.5 rounded-2xl my-1 hover:bg-primaryHover'>Add&nbsp;Photo</button>
            </div>
            <div className="flex flex-wrap gap-3 p-2">
                {Array.isArray(addedPhotos) && addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div key={index} className="shrink-0 relative group h-[140px] w-[220px] rounded-2xl overflow-hidden shadow-md shadow-blue-200 transition-all duration-300 hover:shadow-blue-300 ">
                        <img src={link} alt="Uploaded" className="w-full h-full object-cover rounded-2xl transform transition duration-300 group-hover:scale-105 group-hover:brightness-75" />
                        <div className="absolute flex gap-2 bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button title={index === 0 ? 'Already Primary' : 'Make Primary'} className={`p-1 rounded-full items-center justify-center flex transition ${index === 0 ? 'bg-green-500 text-white' : 'bg-black bg-opacity-70 text-primary hover:bg-green-500 hover:text-white'}`} onClick={(e) => makePrimary(e, link)}><PrimaryIcon /></button>
                            <button title="Delete" className="p-1 rounded-full bg-black bg-opacity-70 text-primary items-center justify-center flex" onClick={(e) => deletePic(e, link)}><DeleteIcon /></button>
                        </div>
                    </div>
                ))}
                <label className="w-[240px] h-[140px] border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center hover:border-blue-500 transition cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    <p className="text-sm text-gray-700 mt-1">Upload</p>
                </label>


            </div>
        </div>
    )
}

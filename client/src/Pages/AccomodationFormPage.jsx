import React, { useEffect, useState } from 'react'
import Perks from '../Components/Perks.jsx';
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom';
import PhotoUploader from '../Components/PhotoUploader.jsx';
import { toast } from 'react-toastify';


export default function AccomodationFormPage({ action }) {

    let { id } = useParams();

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('')
    const [pricep1N, setPricep1N] = useState(100);
    const [pricep2N, setPricep2N] = useState(175);
    const [redirect, setRedirect] = useState('')
    const [showConfDiv, setShowConfDiv] = useState(false)


    useEffect(() => {

        if (!id) {
            return;
        }
        
        axios.get('/my-accomodations/' + id)
            .then(res => {

                const { data } = res;
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setPricep1N(data.pricep1N ?? 100)
                setPricep2N(data.pricep2N ?? 175)
            })

    }, [id])


    function inputHeader(text) {
        return (
            <h3 className='text-2xl mt-4'> {text} </h3>
        )
    }

    function inputDescription(text) {
        return (
            <p className='inline-flex ml-1 text-sm text-gray-500'> {text} </p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }




    async function savePlace(e) {
        e.preventDefault();

        const placeData = { title, address, addedPhotos, description, perks, extraInfo, pricep1N, pricep2N };

        if (id) {
            //update
            try {
                const response = await axios.put('/my-accomodations', { id, ...placeData })
                toast.success("Your Place is modified Successfully")

                setTimeout(() => {
                    setRedirect('/account/my-accomodations');
                }, 2000)
            } catch (err) {
                console.error('Error saving place:', err);
                toast.error('Unable to modify the Place, Please try again!')
            }

        }
        else {
            //add mew
            try {
                const response = await axios.post('/my-accomodations', placeData)
                toast.success('Your Place is added Successfully')

                setTimeout(() => {
                    setRedirect('/account/my-accomodations');
                }, 2000);

            } catch (err) {
                console.error('Error saving place:', err);
                toast.error('Could not add the Place, Please try again!')

            }
        }

    }

    const isFormEmpty = !title && !description && !address && perks.length === 0 && addedPhotos.length === 0 && !extraInfo;



    async function deletePlace(e) {
        e.preventDefault()

        try {
            const res = axios.delete(`/my-accomodations/${id}`)
            toast.dismiss()
            toast.success("Place Deleted Successfully")
            setRedirect('/account/my-accomodations')
        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error("Error deleting the place")
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }



    return (
        <div>
            <div>
                <Link to="/account/my-accomodations" className='inline-flex items-center px-4 py-3 rounded-2xl hover:bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </Link>


                <form onSubmit={savePlace}>

                    {preInput('title', 'Title for your place. Should be catchy as in advertisment')}
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title (ex: My lovely Apartment)' />

                    {preInput('Address', 'Address to your place')}
                    <input id="address" type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='address' />

                    {preInput('Photos', 'more = better')}
                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    {preInput('Description', 'description of the place')}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className='block mt-2' />

                    {preInput('Perks', 'Select all the perks of your place')}
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>


                    {preInput('Extra Info', 'house rules, etc.')}
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                    {preInput('Pricing', 'Attract customers with Lower Pricing')}
                    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3'>

                        <div>

                            <h3 className='mt-2 mb-0.5 ml-2'>Price per One Night</h3>
                            <input id="price1N" min="100" value={pricep1N} onChange={e => setPricep1N(e.target.value)} type="number" />

                        </div>
                        <div>

                            <h3 className='mt-2 mb-0.5 ml-2'>Price per Two Night's</h3>
                            <input id="price2N" min="175" value={pricep2N} onChange={e => setPricep2N(e.target.value)} type="number" />
                        </div>

                    </div>

                    <div className='flex items-center justify-evenly'>
                        {!isFormEmpty && (
                            <div className='flex justify-center py-4 w-[450px]'>

                                <button type="button" className='delete hover:bg-gray-300' onClick={() => setShowConfDiv(true)}>Delete</button>

                            </div>
                        )}
                        <div className='flex justify-center py-4 w-[450px]'>

                            <button type="submit" className='primary' disabled={isFormEmpty}>
                                {isFormEmpty ? 'Add Place' : 'Save Place'}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            {showConfDiv && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70'>
                    <div className="bg-white text-black px-3 py-8 rounded-xl shadow-lg shadow-blue-300 w-[90%] max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this place?</h2>
                        <div className="flex justify-center gap-4">
                            <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setShowConfDiv(false)}> Cancel </button>
                            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={deletePlace}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

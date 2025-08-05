import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import AccomodationFormPage from './AccomodationFormPage.jsx';
import AccountNav from '../Components/AccountNav.jsx';

export default function MyAccomodationsPage() {

    const { action } = useParams();
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/my-accomodations')
            .then(({ data }) => {
                setPlaces(data)
            })
    }, [])

    return (
        <div className=''>
            <AccountNav />
            {action !== 'new' && (
                <div className='pb-10'>
                    <h1 className='text-primary ml-3 text-2xl text-left mb-2 mt-11'>My Accommodations</h1>

                    {places.length === 0 ? (
                        <div className="text-center text-gray-600 mt-8">
                            <p>You haven't listed any accommodations yet.</p>
                            <p className="mt-2">Start adding your place and earn by hosting travelers!</p>
                            <Link to="/account/my-accomodations/new" className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primaryHover transition" >
                                Host New Place
                            </Link>
                        </div>
                    ) : (
                        places.map((place, index) => (
                            <Link to={'/account/my-accomodations/' + place._id} key={index} className="flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md shadow-blue-300 mb-4 cursor-pointer" >
                                <div className="flex w-[250px] h-[150px] bg-gray-200 grow-0 shrink-0 rounded-lg">
                                    {place.photos.length > 0 && (
                                        <img className="object-cover h-full w-full rounded-lg" src={place.photos[0]} />
                                    )}
                                </div>

                                <div className="grow">
                                    <h2 className="text-xl font-semibold text-black">{place.title}</h2>
                                    <p className="text-gray-500">{place.address}</p>
                                    <p className="text-gray-800 mt-1">{place.description}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
            {action === 'new' && (
                <div>
                    <AccomodationFormPage action={action} />
                </div>
            )}

        </div>
    )
}

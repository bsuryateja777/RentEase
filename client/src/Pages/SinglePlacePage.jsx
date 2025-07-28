import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageGrid from '../Components/ImageGrid';
import Footer from '../Components/Footer.jsx';
import { WifiIcon, ParkingIcon, TVIcon, MusicSystemIcon, PetsIcon, PrivateEntranceIcon, LocationIcon } from '../Components/Icons.jsx';
import { UserContext } from '../userContext.jsx';
import { toast } from 'react-toastify';
import BookingForm from '../Components/BookingForm.jsx';
import PlaceSkeleton from '../Skeletons/PlaceSkeleton.jsx';

export default function SinglePlacePage() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [place, setPlace] = useState(state || null);
    const [loading, setLoading] = useState(!state);

    const isSameUser = user && place?.owner?._id === user._id;

    const perkIcons = {
        wifi: WifiIcon,
        parking: ParkingIcon,
        tv: TVIcon,
        music: MusicSystemIcon,
        pets: PetsIcon,
        entrance: PrivateEntranceIcon,
    };

    useEffect(() => {
        if (!place) {

            axios.get(`/all-places/${id}`)
                .then(res => setPlace(res.data))
                .catch(err => {
                    console.error("Error fetching place:", err);
                    toast.error("Failed to load place.");
                })
                .finally(() => setLoading(false));
        }
    }, [id, place]);

    const BookPlace = (e) => {
        e.preventDefault();

        if (!user) {
            toast.info('You need to login before booking!.');
            navigate('/login', { state: { place } });
            return;
        }

        navigate(`/home/${id}/booking`, {
            state: { place, user }
        });
    };

    if (loading) return <PlaceSkeleton />
    if (!place) return <div className="text-center mt-10 text-red-600">Place not found.</div>;

    return (
        <div className='mt-10 mx-3'>
            <h1 className="text-[40px] ml-3 font-playfair leading-snug text-black mb-1">{place.title}</h1>

            <ImageGrid images={place.photos} />
            <div className='flex items-center' size="w-4 h-4">
                <LocationIcon size="h-6 w-8" />
                <h2 className='text-[30px] font-serif text-gray-800 mt-1'>{place.address}</h2>
            </div>
            <h3 className='text-[25px] font-playfair leading-snug tracking-tight mt-6'>About this place:</h3>
            <h4 className='ml-4 mr-4 text-[20px] text-gray-700'>{place.description}</h4>
            <h4 className='ml-4 mr-4 text-[20px] text-gray-700'>{place.extraInfo}</h4>

            <h3 className='text-[25px] font-playfair leading-snug tracking-tight mt-6'>Perks:</h3>
            {place.perks?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 mt-2 max-w-[60%]">
                    {place.perks.map((perk, index) => {
                        const IconComponent = perkIcons[perk.toLowerCase()];
                        return (
                            <div key={index} className="flex items-center gap-2 text-gray-700 text-[18px]">
                                {IconComponent && <IconComponent className="w-6 h-6 text-black" />}
                                <span>{perk}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className='mt-5 flex justify-between items-begin mb-10 mr-[65px] pr-20'>

                <div className='flex flex-col'>
                    <h3 className='text-[25px] font-playfair leading-snug tracking-tight mt-6 flex'>Owner Details:</h3>
                    {place.owner && (
                        <div className='w-max ml-4'>
                            <table className="table-auto rounded-lg overflow-hidden">
                                <tbody>
                                    {Object.entries(place.owner).slice(1,5).map(([key, value], index) => (
                                        <tr key={index}>
                                            <td className="py-1 font-semibold text-gray-800 capitalize">{key}</td>
                                            <td className='px-3'>:</td>
                                            <td className="px-2 text-gray-700">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
                

                {!isSameUser && (
                    <BookingForm place={place} user={user} />
                )}

            </div>
        </div>
    );
}

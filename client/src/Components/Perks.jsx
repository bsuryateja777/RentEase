import React from 'react'
import { DeleteIcon, PrimaryIcon, WifiIcon, ParkingIcon, TVIcon, MusicSystemIcon, PetsIcon, PrivateEntranceIcon  } from '../Components/Icons.jsx';



export default function Perks({ selected, onChange }) {


    function handleCbClick(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(selectedName => selectedName !== name));
        }
    }

    return (
        <>

            <label htmlFor="wifi" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="wifi" checked={selected.includes('wifi')} name="wifi" type="checkbox" onChange={handleCbClick} />
                <WifiIcon />
                <span>Wifi</span>
            </label>

            <label htmlFor="parking" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="parking" checked={selected.includes('parking')} name="parking" type="checkbox" onChange={handleCbClick} />
                <ParkingIcon />
                <span>Parking</span>
            </label>

            <label htmlFor="tv" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="tv" checked={selected.includes('tv')} name="tv" type="checkbox" onChange={handleCbClick} />
                <TVIcon />
                <span>TV</span>
            </label>

            <label htmlFor="music" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="music" checked={selected.includes('music')} name="music" type="checkbox" onChange={handleCbClick} />
                <MusicSystemIcon />
                <span>Music System</span>
            </label>

            <label htmlFor="pets" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="pets" checked={selected.includes('pets')} name="pets" type="checkbox" onChange={handleCbClick} />
                <PetsIcon />
                <span>Pets</span>
            </label>

            <label htmlFor="entrance" className="flex border p-3 gap-2 rounded-2xl items-center cursor-pointer">
                <input id="entrance" checked={selected.includes('entrance')} name="entrance" type="checkbox" onChange={handleCbClick} />
                <PrivateEntranceIcon />
                <span>Private Entrance</span>
            </label>
        </>
    )
}

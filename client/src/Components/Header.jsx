import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { CrossIcon, Hamberger, RentEaseLogo, SearchIcon, UserProfile } from "./Icons";


export default function Header() {

    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[1];


    function linkClasses(path) {
        const isActive = pathname === path || pathname.startsWith(path + '/');

        return isActive
            ? 'bg-primary text-white'
            : 'hover:bg-gray-300 text-gray-800';
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
            setIsFullSearch(true);
        }
    }, [location.search]);






    const { user } = useContext(UserContext);
    const [isFullSearch, setIsFullSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsFullSearch(false);
        }
    }



    return (
        <header className='p-4 flex items-center justify-between relative'>

            {/* left logo */}
            <div className="flex-1">
                <Link to="/home" className="inline-flex items-center gap-2 cursor-pointer group">
                    <div className="flex items-center gap-2 px-2 py-1 group-hover:opacity-90 transition">
                        <RentEaseLogo size="h-10 w-10" />
                        <h1 className="text-3xl text-gray-800 group-hover:text-black">RentEase</h1>
                    </div>
                </Link>
            </div>

            {/* Center Search */}
            <div className="flex-1 flex justify-center relative">
                <div className='w-[350px] h-[45px] group transition duration-300 hover:scale-105 flex items-center justify-center border border-gray-300 rounded-full px-0.5 py-0.5 shadow-md shadow-gray-400 bg-white overflow-hidden relative'>

                    {/* EXPANDING SEARCH INPUT */}
                    <div className={`absolute right-0 top-0 h-full w-full bg-primary rounded-full flex items-center justify-center pl-4 pr-2 transition-all 
                                    duration-300 ease-in-out origin-right z-20  ${isFullSearch ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
                        <input type="search" placeholder="Search by place...." className="no-clear placeholder:text-gray-300 cursor-pointer bg-transparent
                        text-white placeholder-white w-full outline-none text-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} autoFocus={isFullSearch} />
                        <div onClick={() => { setIsFullSearch(false); setSearchQuery(''); }} className="text-white cursor-pointer ml-2 mr-1 hover:text-gray-500" >
                            <CrossIcon size="h-6 w-6" />
                        </div>
                    </div>

                    {/* STATIC SEARCH UI */}
                    <div className={`flex items-center gap-1 justify-center w-full z-10 transition-all duration-300 ease-in-out 
              ${isFullSearch ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                        <div className="hover:bg-gray-300 px-3.5 rounded-l-full py-1.5">Anywhere</div>
                        <div className="border-l border-gray-400 h-6"></div>
                        <div className="hover:bg-gray-300 px-3.5 py-1.5">Any week</div>
                        <div className="border-l border-gray-400 h-6"></div>

                        <div className="flex items-center hover:bg-gray-300 px-3.5 rounded-r-full py-0.5 pr-0.5 mr-0">
                            <div className="pr-1">Any guests</div>
                            <div
                                onClick={() => setIsFullSearch(true)}
                                className="text-white bg-primary p-1 rounded-full"
                            >
                                <SearchIcon size="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right User Menu */}
            <div className="flex-1 flex justify-end">
                <div className="flex items-center justify-center border border-gray-300 rounded-full py-0.5 px-0.5 gap-0.5">
                    {user && (
                        <Link to="/account/my-accomodations">
                            <div className={`px-1.5 py-1 rounded-l-full ${linkClasses('/account/my-accomodations')}`}>
                                <Hamberger size="size-6" />
                            </div>
                        </Link>
                    )}
                    <Link to={user ? '/account-center' : '/login'}>
                        <div className={`${user ? 'rounded-r-full' : 'rounded-full'} flex items-center justify-center py-1 px-1.5 gap-1.5 ${linkClasses('/account-center')}`} >
                            <div className="bg-gray-500 text-white rounded-full border overflow-hidden">
                                <UserProfile />
                            </div>

                            {user && (
                                <div  className="max-w-[75px] overflow-hidden whitespace-nowrap text-ellipsis truncate" title={user.name} >
                                    {user.name}
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}


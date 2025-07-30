import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { CrossIcon, Hamberger, RentEaseLogo, SearchIcon, UserProfile } from "./Icons";

export default function Header() {
    const { user } = useContext(UserContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="p-3 flex items-center justify-between relative bg-white shadow-sm">
            {/* Logo */}
            <div className="flex-1 flex items-center">
                <Link to="/home" className="inline-flex items-center">
                    <RentEaseLogo size="h-9 w-9 sm:h-10 sm:w-10" />
                </Link>
            </div>

            {/* Center Search (hidden on mobile) */}
            <div className="flex-1 justify-center hidden sm:flex">
                <div className="flex items-center justify-center relative">
                    {!isSearchOpen ? (
                        <button
                            className="bg-primary text-white p-2 rounded-full"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Open search"
                        >
                            <SearchIcon size="h-6 w-6" />
                        </button>
                    ) : (
                        <div className="flex items-center bg-primary rounded-full px-2 py-1 w-48 transition-all duration-300">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="bg-transparent text-white placeholder-white outline-none w-full text-base"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSearch()}
                                autoFocus
                            />
                            <button
                                onClick={handleSearch}
                                className="ml-1 text-white"
                                aria-label="Search"
                            >
                                <SearchIcon size="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                className="ml-1 text-white"
                                aria-label="Close search"
                            >
                                <CrossIcon size="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right User Menu */}
            <div className="flex-1 flex justify-end items-center gap-2">
                {/* Mobile: Search icon */}
                <div className="flex sm:hidden">
                    <button
                        className="bg-primary text-white p-2 rounded-full"
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Open search"
                    >
                        <SearchIcon size="h-6 w-6" />
                    </button>
                </div>
                {/* Account/User icon */}
                <Link to={user ? '/account-center' : '/login'}>
                    <div className="flex items-center justify-center py-1 px-1.5 gap-1.5 rounded-full bg-white">
                        <div className="bg-gray-500 text-white rounded-full border overflow-hidden">
                            <UserProfile />
                        </div>
                        {/* Show name only on larger screens */}
                        {user && (
                            <span className="max-w-[75px] overflow-hidden whitespace-nowrap text-ellipsis truncate hidden sm:inline" title={user.name}>
                                {user.name}
                            </span>
                        )}
                    </div>
                </Link>
            </div>

            {/* Mobile: Expanding search overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start">
                    <div className="flex w-full px-4 pt-4">
                        <div className="flex items-center bg-primary rounded-full px-3 py-2 w-full">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="bg-transparent text-white placeholder-white outline-none w-full text-base"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSearch()}
                                autoFocus
                            />
                            <button
                                onClick={handleSearch}
                                className="ml-1 text-white"
                                aria-label="Search"
                            >
                                <SearchIcon size="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                className="ml-1 text-white"
                                aria-label="Close search"
                            >
                                <CrossIcon size="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
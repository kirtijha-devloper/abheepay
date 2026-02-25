import React, { useState, useRef, useEffect } from 'react';
import { Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Navigate back to the login page on logout
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm z-10">

      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-2xl">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-none bg-transparent focus:ring-0 focus:outline-none sm:text-sm text-gray-600"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right User Profile */}
      <div className="flex items-center relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none flex items-center"
        >
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm ring-2 ring-gray-100 flex-shrink-0 cursor-pointer">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=random"
              alt="User profile"
              className="h-full w-full object-cover"
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@abheepay.com</p>
            </div>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Optional: navigate to profile
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <User className="w-4 h-4 mr-2 text-gray-500" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

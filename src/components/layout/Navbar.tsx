
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bed, Map, Calendar, Users, Menu, X, Package, Box, Book, Camera, Hotel } from 'lucide-react';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-booking-primary text-white sticky top-0 z-50 shadow-md">
      <div className="booking-container overflow-hidden">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 transition-all duration-200 hover:scale-105">
            <h1 className="text-xl md:text-2xl font-bold whitespace-nowrap">Booking.com</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 justify-center flex-grow mx-4">
            <Link 
              to="/" 
              className={`hover:bg-booking-secondary px-2 lg:px-3 py-2 rounded transition-all duration-200 whitespace-nowrap hover:scale-105 ${
                isActive('/') && !location.pathname.startsWith('/flights') && 
                !location.pathname.startsWith('/car-rentals') && 
                !location.pathname.startsWith('/attractions') && 
                !location.pathname.startsWith('/packing-list') && 
                !location.pathname.startsWith('/ar-preview') && 
                !location.pathname.startsWith('/local-guides') && 
                !location.pathname.startsWith('/travel-journal') 
                  ? 'bg-booking-secondary/80' : ''
              }`}
            >
              Stays
            </Link>
            <Link 
              to="/flights" 
              className={`hover:bg-booking-secondary px-2 lg:px-3 py-2 rounded transition-all duration-200 whitespace-nowrap hover:scale-105 ${
                isActive('/flights') ? 'bg-booking-secondary/80' : ''
              }`}
            >
              Flights
            </Link>
            <Link 
              to="/car-rentals" 
              className={`hover:bg-booking-secondary px-2 lg:px-3 py-2 rounded transition-all duration-200 whitespace-nowrap hover:scale-105 ${
                isActive('/car-rentals') ? 'bg-booking-secondary/80' : ''
              }`}
            >
              Car Rentals
            </Link>
            <Link 
              to="/attractions" 
              className={`hover:bg-booking-secondary px-2 lg:px-3 py-2 rounded transition-all duration-200 whitespace-nowrap hover:scale-105 ${
                isActive('/attractions') ? 'bg-booking-secondary/80' : ''
              }`}
            >
              Attractions
            </Link>
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            <DarkModeToggle />
            <Link to="/list-property" className="hover:bg-booking-secondary px-4 py-2 rounded transition-all duration-200 text-sm whitespace-nowrap flex-shrink-0 hover:scale-105 hover:shadow-md flex items-center">
              <Hotel size={16} className="mr-1" />
              List Your Property
            </Link>
            <Link to="/register" className="hover:bg-booking-secondary px-4 py-2 rounded transition-all duration-200 text-sm whitespace-nowrap flex-shrink-0 hover:scale-105 hover:shadow-md">Register</Link>
            <Link to="/login" className="hover:bg-booking-secondary px-4 py-2 rounded transition-all duration-200 text-sm whitespace-nowrap flex-shrink-0 hover:scale-105 hover:shadow-md">Sign in</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            <button onClick={toggleMenu} className="p-2 flex-shrink-0 transition-all duration-200 hover:bg-booking-secondary/80 hover:scale-105 rounded">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-booking-primary border-t border-booking-secondary animate-fade-in">
          <div className="booking-container py-4 space-y-2">
            <Link to="/" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/') && !location.pathname.startsWith('/flights') && !location.pathname.startsWith('/car-rentals') && !location.pathname.startsWith('/attractions') && !location.pathname.startsWith('/packing-list') && !location.pathname.startsWith('/ar-preview') && !location.pathname.startsWith('/local-guides') && !location.pathname.startsWith('/travel-journal') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'}`} onClick={toggleMenu}>Stays</Link>
            <Link to="/flights" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/flights') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'}`} onClick={toggleMenu}>Flights</Link>
            <Link to="/car-rentals" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/car-rentals') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'}`} onClick={toggleMenu}>Car Rentals</Link>
            <Link to="/attractions" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/attractions') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'}`} onClick={toggleMenu}>Attractions</Link>
            <Link to="/packing-list" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/packing-list') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'} flex items-center`} onClick={toggleMenu}>
              <Package size={16} className="mr-1 transition-all duration-200 icon-hover" />
              Packing List
              <span className="new-feature-badge">NEW</span>
            </Link>
            <Link to="/ar-preview" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/ar-preview') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'} flex items-center`} onClick={toggleMenu}>
              <Box size={16} className="mr-1 transition-all duration-200 icon-hover" />
              AR Preview
              <span className="new-feature-badge">NEW</span>
            </Link>
            <Link to="/local-guides" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/local-guides') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'} flex items-center`} onClick={toggleMenu}>
              <Map size={16} className="mr-1 transition-all duration-200 icon-hover" />
              Local Guides
              <span className="new-feature-badge">NEW</span>
            </Link>
            <Link to="/travel-journal" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/travel-journal') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'} flex items-center`} onClick={toggleMenu}>
              <Book size={16} className="mr-1 transition-all duration-200 icon-hover" />
              Travel Journal
              <span className="new-feature-badge">NEW</span>
            </Link>
            <Link to="/list-property" className={`block px-3 py-2 rounded transition-all duration-200 ${isActive('/list-property') ? 'bg-booking-secondary' : 'hover:bg-booking-secondary hover:scale-105'} flex items-center`} onClick={toggleMenu}>
              <Hotel size={16} className="mr-1 transition-all duration-200 icon-hover" />
              List Your Property
            </Link>
            <div className="border-t border-booking-secondary pt-2 mt-2">
              <Link to="/register" className="block hover:bg-booking-secondary px-4 py-2 rounded transition-all duration-200 text-sm hover:scale-105 hover:shadow-md" onClick={toggleMenu}>Register</Link>
              <Link to="/login" className="block hover:bg-booking-secondary px-4 py-2 rounded transition-all duration-200 text-sm hover:scale-105 hover:shadow-md" onClick={toggleMenu}>Sign in</Link>
            </div>
          </div>
        </div>
      )}

      {/* Navigation categories (shown on all screen sizes) */}
      <div className="bg-[#00224f] py-3">
        <div className="booking-container">
          <div className="flex justify-center gap-6 text-white text-sm">
            <Link to="/" className={`flex flex-col items-center px-4 py-1 min-w-fit transition-all duration-200 hover:scale-105 ${isActive('/') && !location.pathname.startsWith('/flights') && !location.pathname.startsWith('/car-rentals') && !location.pathname.startsWith('/attractions') && !location.pathname.startsWith('/packing-list') && !location.pathname.startsWith('/ar-preview') && !location.pathname.startsWith('/local-guides') && !location.pathname.startsWith('/travel-journal') ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}>
              <Bed size={20} className="transition-all duration-200 hover:scale-110" />
              <span>Stays</span>
            </Link>
            <Link to="/flights" className={`flex flex-col items-center px-4 py-1 min-w-fit transition-all duration-200 hover:scale-105 ${isActive('/flights') ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}>
              <Calendar size={20} className="transition-all duration-200 hover:scale-110" />
              <span>Flights</span>
            </Link>
            <Link to="/car-rentals" className={`flex flex-col items-center px-4 py-1 min-w-fit transition-all duration-200 hover:scale-105 ${isActive('/car-rentals') ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}>
              <Map size={20} className="transition-all duration-200 hover:scale-110" />
              <span>Car Rentals</span>
            </Link>
            <Link to="/attractions" className={`flex flex-col items-center px-4 py-1 min-w-fit transition-all duration-200 hover:scale-105 ${isActive('/attractions') ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}>
              <Map size={20} className="transition-all duration-200 hover:scale-110" />
              <span>Attractions</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* New Features Section */}
      <div className="bg-booking-gray-800 dark:bg-booking-gray-700 py-3">
        <div className="booking-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-white text-sm">
            <Link to="/packing-list" className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 ${isActive('/packing-list') ? 'bg-booking-gray-600' : 'hover:bg-booking-gray-600'}`}>
              <Package size={16} className="mr-2 flex-shrink-0 transition-all duration-200 hover:scale-110" />
              <span className="whitespace-nowrap">Packing List</span>
              <span className="new-feature-badge ml-1">NEW</span>
            </Link>
            <Link to="/ar-preview" className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 ${isActive('/ar-preview') ? 'bg-booking-gray-600' : 'hover:bg-booking-gray-600'}`}>
              <Box size={16} className="mr-2 flex-shrink-0 transition-all duration-200 hover:scale-110" />
              <span className="whitespace-nowrap">AR Preview</span>
              <span className="new-feature-badge ml-1">NEW</span>
            </Link>
            <Link to="/local-guides" className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 ${isActive('/local-guides') ? 'bg-booking-gray-600' : 'hover:bg-booking-gray-600'}`}>
              <Map size={16} className="mr-2 flex-shrink-0 transition-all duration-200 hover:scale-110" />
              <span className="whitespace-nowrap">Local Guides</span>
              <span className="new-feature-badge ml-1">NEW</span>
            </Link>
            <Link to="/travel-journal" className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 ${isActive('/travel-journal') ? 'bg-booking-gray-600' : 'hover:bg-booking-gray-600'}`}>
              <Book size={16} className="mr-2 flex-shrink-0 transition-all duration-200 hover:scale-110" />
              <span className="whitespace-nowrap">Travel Journal</span>
              <span className="new-feature-badge ml-1">NEW</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

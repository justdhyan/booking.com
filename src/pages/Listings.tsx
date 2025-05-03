
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/shared/PropertyCard';
import { properties } from '@/data/mockData';
import { MapPin, Calendar, Users, Search, Filter, Check, SortAsc, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AIChatSupport from '@/components/ui/AIChatSupport';
import BackToTopButton from '@/components/ui/back-to-top-button';
import SearchAutocomplete from '@/components/ui/search-autocomplete';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const typeParam = searchParams.get('type');
  
  const [sortBy, setSortBy] = useState('recommended');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [arFilter, setArFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter properties based on URL params
  let filteredProperties = [...properties];
  
  if (destinationParam) {
    filteredProperties = filteredProperties.filter(property => 
      property.location.city.toLowerCase().includes(destinationParam.toLowerCase())
    );
  }
  
  if (typeParam) {
    filteredProperties = filteredProperties.filter(property => 
      property.type.toLowerCase().includes(typeParam.toLowerCase())
    );
  }
  
  // Apply verified filter if selected
  if (verifiedOnly) {
    filteredProperties = filteredProperties.filter(property => property.verified);
  }
  
  // Apply AR filter if selected
  if (arFilter) {
    filteredProperties = filteredProperties.filter(property => property.arEnabled);
  }
  
  // Sort properties based on selection
  filteredProperties.sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: Sort by recommended (a mix of rating and price)
    return (b.rating * 0.7 + (1000 - b.price) * 0.3) - (a.rating * 0.7 + (1000 - a.price) * 0.3);
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pb-16 md:pb-0">
        <div className="bg-booking-primary text-white py-6 sticky top-0 z-30">
          <div className="booking-container">
            {/* Search Form */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-grow">
                <label className="text-sm mb-1 block">Destination</label>
                <SearchAutocomplete
                  defaultValue={destinationParam || ''}
                  placeholder="Where are you going?"
                />
              </div>

              <div className="flex-grow">
                <label className="text-sm mb-1 block">Check-in — Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Check-in — Check-out"
                    className="w-full pl-10 pr-4 py-2 rounded-md text-booking-gray-600 focus:outline-none dark:bg-booking-gray-600 dark:text-white dark:border-booking-gray-500"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <label className="text-sm mb-1 block">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="2 adults · 0 children · 1 room"
                    className="w-full pl-10 pr-4 py-2 rounded-md text-booking-gray-600 focus:outline-none dark:bg-booking-gray-600 dark:text-white dark:border-booking-gray-500"
                  />
                </div>
              </div>

              <button className="bg-booking-accent text-booking-gray-600 py-2 px-6 rounded-md font-medium hover:bg-opacity-90 flex items-center justify-center">
                <Search size={18} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="booking-container py-8 grid md:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-booking-gray-600 rounded-lg shadow-md p-4 sticky top-36">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h2>
              
              {/* Budget */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Your Budget (per night)</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$0 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$100 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$200+</span>
                  </label>
                </div>
              </div>
              
              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Guest Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <div className="flex items-center">
                      <span>9+ Exceptional</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>8+ Excellent</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>7+ Very Good</span>
                  </label>
                </div>
              </div>
              
              {/* Property Type */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Property Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Hotels</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Apartments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Resorts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Villas</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Hostels</span>
                  </label>
                </div>
              </div>
              
              {/* New Feature Filters */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  Special Features 
                  <span className="new-feature-badge ml-2">NEW</span>
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={() => setVerifiedOnly(!verifiedOnly)}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Check size={14} className="mr-1 text-booking-primary" />
                      <span>Verified Properties</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={arFilter}
                      onChange={() => setArFilter(!arFilter)}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <span>AR Preview Available</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Properties List */}
          <div className="md:col-span-9">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {destinationParam 
                    ? `Properties in ${destinationParam}`
                    : typeParam
                      ? `${typeParam} properties`
                      : 'All Properties'}
                </h1>
                <p className="text-booking-gray-500">{filteredProperties.length} properties found</p>
              </div>
              
              <div className="flex items-center">
                <label className="mr-2">Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-booking-gray-200 rounded-md p-2 dark:bg-booking-gray-600 dark:border-booking-gray-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price (low to high)</option>
                  <option value="price-high">Price (high to low)</option>
                  <option value="rating">Rating (high to low)</option>
                </select>
              </div>
            </div>
            
            {filteredProperties.length > 0 ? (
              <div className="space-y-6">
                {filteredProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    showLocation={true} 
                    isLoading={isLoading}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-8 text-center">
                <h2 className="text-xl font-bold mb-2">No properties found</h2>
                <p className="text-booking-gray-500 mb-4">
                  Try adjusting your search criteria or removing some filters
                </p>
                <button className="bg-booking-secondary text-white py-2 px-6 rounded-md">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTopButton />
      <AIChatSupport />
      <MobileBottomNav />
    </div>
  );
};

export default Listings;


import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatSupport from '@/components/ui/AIChatSupport';
import { localGuides } from '@/data/mockData';
import { Search, MapPin, ThumbsUp, User, Calendar, Filter } from 'lucide-react';

const LocalGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  
  // Filter guides based on search query and location
  const filteredGuides = localGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === '' || guide.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });
  
  // Extract unique locations for filter dropdown
  const locations = Array.from(new Set(localGuides.map(guide => guide.location.split(',')[0])));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-booking-primary text-white py-12 text-center">
          <div className="booking-container">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">Local Guides</h1>
                <span className="new-feature-badge ml-2">NEW</span>
              </div>
              <p className="text-lg mb-6">
                Discover authentic experiences shared by travelers and locals
              </p>
              
              {/* Search */}
              <div className="flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search for guides, places, or experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-l-md text-booking-gray-600 focus:outline-none"
                  />
                </div>
                <button className="bg-booking-accent text-booking-gray-600 py-2 px-6 rounded-r-md font-medium hover:bg-opacity-90">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="booking-container py-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Community Guides</h2>
              <p className="text-booking-gray-500">{filteredGuides.length} guides found</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-booking-gray-500" />
                <span className="mr-2">Filter by:</span>
                <select 
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-md p-2"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select 
                  className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-md p-2"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Guides List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredGuides.map(guide => (
              <div key={guide.id} className="bg-white dark:bg-booking-gray-600 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-booking-gray-200 dark:border-booking-gray-500 flex flex-col">
                {/* Guide Image */}
                <div className="relative h-48">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex-grow">
                  {/* Guide Title */}
                  <h3 className="font-bold text-lg text-booking-gray-600 dark:text-white mb-2">
                    {guide.title}
                  </h3>
                  
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={guide.profileImage} 
                      alt={guide.author} 
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{guide.author}</p>
                      <div className="flex items-center text-booking-gray-500 text-xs">
                        <Calendar size={12} className="mr-1" />
                        <span>{guide.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center text-booking-gray-500 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{guide.location}</span>
                  </div>
                  
                  {/* Guide Intro */}
                  <p className="text-sm mb-4">{guide.intro}</p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="text-xs text-booking-gray-500 mb-1">Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-booking-gray-100 dark:bg-booking-gray-500 text-booking-gray-600 dark:text-white px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                      {guide.highlights.length > 3 && (
                        <span className="text-xs bg-booking-gray-100 dark:bg-booking-gray-500 text-booking-gray-600 dark:text-white px-2 py-1 rounded-full">
                          +{guide.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Guide Footer */}
                <div className="p-4 border-t border-booking-gray-200 dark:border-booking-gray-500 flex justify-between items-center">
                  <div className="flex items-center">
                    <ThumbsUp size={14} className="mr-1 text-booking-primary" />
                    <span className="text-sm">{guide.upvotes} found this helpful</span>
                  </div>
                  <button className="text-booking-secondary hover:underline text-sm">Read more</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Create Guide CTA */}
          <div className="bg-gradient-to-r from-booking-primary to-booking-secondary text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Share your local knowledge</h2>
              <p>Create your own guide and help other travelers discover your favorite places.</p>
            </div>
            <button className="bg-white text-booking-primary py-2 px-6 rounded-md hover:bg-opacity-90 font-medium">
              Create Guide
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default LocalGuides;

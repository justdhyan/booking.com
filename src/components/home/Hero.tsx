import React, { useState } from 'react';
import { MapPin, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { DateRange } from 'react-day-picker';
const Hero = () => {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1))
  });
  const [guests, setGuests] = useState('');
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };
  return <div className="bg-booking-primary text-white py-8 md:py-16 px-4">
      <div className="booking-container">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find your next stay</h1>
          <p className="text-lg md:text-xl">Search deals on hotels, homes, and much more...</p>
        </div>

        {/* Search Form */}
        <div className="bg-booking-accent rounded-lg p-4 shadow-lg max-w-5xl mx-auto -mb-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500 transition-all duration-200" size={20} />
                <input type="text" placeholder="Where are you going?" value={destination} onChange={e => setDestination(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-md text-booking-gray-600 focus:outline-none focus:ring-2 focus:ring-booking-secondary transition-all duration-200 hover:shadow-sm" />
              </div>
            </div>

            <div className="flex-grow">
              <DateRangePicker onChange={handleDateRangeChange} value={dateRange} />
            </div>

            <div className="flex-grow">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500 transition-all duration-200" size={20} />
                <input type="text" placeholder="2 adults · 0 children · 1 room" value={guests} onChange={e => setGuests(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-md text-booking-gray-600 focus:outline-none focus:ring-2 focus:ring-booking-secondary transition-all duration-200 hover:shadow-sm" />
              </div>
            </div>

            <Link to="/listings" className="bg-booking-secondary text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-md">
              <Search size={20} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
              Search
            </Link>
          </div>

          {/* Extra options */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <input type="checkbox" id="work-trip" className="mr-2 h-4 w-4 transition-all duration-200" />
              <label htmlFor="work-trip" className="text-booking-gray-600">I'm traveling for work</label>
            </div>
            
            <div className="flex items-center ml-auto">
              <Link to="/packing" className="flex items-center text-booking-gray-600 hover:underline transition-all duration-200">
                
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;
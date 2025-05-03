
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, CheckCircle, X, User, Calendar,
  Coffee, Wifi, AirVent, Tv, Utensils, Car, Box,
  Sun, CloudSun, Cloud, CloudRain, Dumbbell
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { properties } from '@/data/mockData';
import AIChatSupport from '@/components/ui/AIChatSupport';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundProperty = properties.find(p => p.id === parseInt(id));
      if (foundProperty) {
        setProperty(foundProperty);
        setSelectedRoom(foundProperty.rooms[0]?.id || null);
      }
    }
  }, [id]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sun': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloud-sun': return <CloudSun className="w-6 h-6 text-gray-500" />;
      case 'cloud': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'cloud-rain': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="booking-container py-8">
          {/* Back button */}
          <Link to="/listings" className="flex items-center mb-4 text-booking-secondary hover:underline">
            ← Back to search results
          </Link>
          
          {/* Property Header */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{property.name}</h1>
                {property.verified && (
                  <div className="flex items-center text-booking-primary">
                    <CheckCircle size={18} className="mr-1" />
                    <span className="text-sm font-medium">Verified</span>
                    <span className="new-feature-badge ml-1">NEW</span>
                  </div>
                )}
                {property.arEnabled && (
                  <div className="flex items-center text-booking-primary ml-3">
                    <Box size={18} className="mr-1" />
                    <span className="text-sm font-medium">AR Preview</span>
                    <span className="new-feature-badge ml-1">NEW</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center mt-2 mb-1">
                <div className="flex items-center mr-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.round(property.rating) ? 'text-yellow-500' : 'text-booking-gray-300'}`} 
                      fill={i < Math.round(property.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{property.rating}/10</span>
                  <span className="ml-1 text-booking-gray-500">({property.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-booking-gray-500" />
                  <span className="text-booking-gray-500">
                    {property.location.city}, {property.location.country} • {property.location.distance} from center
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">
                {property.currency}{property.price}
                <span className="text-sm font-normal ml-1">{property.perNight ? '/night' : ''}</span>
              </div>
              {property.freeCancellation && (
                <div className="text-booking-success text-sm font-medium mt-1">
                  Free cancellation
                </div>
              )}
            </div>
          </div>
          
          {/* Property Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-8">
            <div className="md:col-span-8 relative rounded-lg overflow-hidden">
              <img 
                src={property.images[currentImage]} 
                alt={property.name} 
                className="w-full h-96 object-cover rounded-lg"
              />
              
              {property.arEnabled && (
                <button className="absolute bottom-4 right-4 bg-booking-primary text-white rounded-md px-4 py-2 flex items-center">
                  <Box size={18} className="mr-2" />
                  View in AR
                  <span className="new-feature-badge ml-1">NEW</span>
                </button>
              )}
            </div>
            
            <div className="md:col-span-4 grid grid-cols-2 gap-2">
              {property.images.slice(0, 4).map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`rounded-lg overflow-hidden cursor-pointer ${idx === currentImage ? 'ring-2 ring-booking-secondary' : ''}`}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${property.name} ${idx+1}`} 
                    className="w-full h-[12rem] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              {/* Description */}
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">About this property</h2>
                <p className="mb-4">{property.description}</p>
                
                {/* Amenities */}
                <h3 className="font-semibold mb-2">Top amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity: string, idx: number) => (
                    <div key={idx} className="flex items-center">
                      {amenity.includes('WiFi') && <Wifi size={16} className="mr-2" />}
                      {amenity.includes('AirVent') && <AirVent size={16} className="mr-2" />}
                      {amenity.includes('Fitness') && <Dumbbell size={16} className="mr-2" />}
                      {amenity.includes('Restaurant') && <Utensils size={16} className="mr-2" />}
                      {amenity.includes('Breakfast') && <Coffee size={16} className="mr-2" />}
                      {amenity.includes('Parking') && <Car size={16} className="mr-2" />}
                      {!['WiFi', 'AirVent', 'Fitness', 'Restaurant', 'Breakfast', 'Parking'].some(a => amenity.includes(a)) && (
                        <CheckCircle size={16} className="mr-2" />
                      )}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Weather Forecast */}
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Weather forecast</h2>
                  <span className="new-feature-badge">NEW</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {property.weather.forecast.map((day: any, idx: number) => (
                    <div key={idx} className="flex-1 bg-booking-gray-100 dark:bg-booking-gray-500 rounded-lg p-3 text-center min-w-[5rem]">
                      <p className="font-medium">{day.day}</p>
                      <div className="flex justify-center my-2">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <p className="text-lg">{day.temp}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Rooms */}
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4">Available rooms</h2>
                <div className="space-y-4">
                  {property.rooms.map((room: any) => (
                    <div 
                      key={room.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        selectedRoom === room.id 
                          ? 'border-booking-primary bg-booking-primary bg-opacity-5' 
                          : 'border-booking-gray-200 dark:border-booking-gray-500'
                      }`}
                    >
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">{room.name}</h3>
                          <p className="text-booking-gray-500">{room.capacity} • {room.beds}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {room.currency}{room.price}
                            <span className="text-sm font-normal ml-1">/night</span>
                          </p>
                          <button 
                            onClick={() => setSelectedRoom(room.id)}
                            className={`mt-2 py-2 px-4 rounded-md ${
                              selectedRoom === room.id
                                ? 'bg-booking-secondary text-white'
                                : 'bg-booking-primary text-white'
                            }`}
                          >
                            {selectedRoom === room.id ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              {/* Booking Form */}
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-6 shadow-md sticky top-20">
                <h2 className="text-xl font-bold mb-4">Book your stay</h2>
                
                <form>
                  {/* Check-in/Check-out */}
                  <div className="mb-4">
                    <label className="block text-sm mb-1">Check-in — Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={18} />
                      <input
                        type="date"
                        placeholder="Add dates"
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500"
                      />
                    </div>
                  </div>
                  
                  {/* Guests */}
                  <div className="mb-6">
                    <label className="block text-sm mb-1">Guests</label>
                    <select className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500">
                      <option>1 adult</option>
                      <option>2 adults</option>
                      <option>2 adults, 1 child</option>
                      <option>2 adults, 2 children</option>
                    </select>
                  </div>
                  
                  {/* Price breakdown */}
                  <div className="border-t border-b py-4 mb-4 border-booking-gray-200 dark:border-booking-gray-500">
                    <div className="flex justify-between mb-2">
                      <span>{property.currency}{property.price} x 1 night</span>
                      <span>{property.currency}{property.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Service fee</span>
                      <span>{property.currency}{Math.round(property.price * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-4">
                      <span>Total</span>
                      <span>{property.currency}{property.price + Math.round(property.price * 0.1)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-booking-accent text-booking-gray-600 font-bold py-3 rounded-md hover:bg-opacity-90 mb-2">
                    Reserve
                  </button>
                  
                  {property.freeCancellation && (
                    <p className="text-booking-success text-sm text-center">
                      Free cancellation until 24 hours before check-in
                    </p>
                  )}
                  
                  <div className="mt-4 flex justify-between text-sm text-booking-gray-500 dark:text-booking-gray-300">
                    <span>No charge yet</span>
                    <span>Confirmation is immediate</span>
                  </div>
                </form>
              </div>
              
              {/* Packing List Generator */}
              <div className="bg-white dark:bg-booking-gray-600 rounded-lg mt-6 p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Need help packing?</h2>
                  <span className="new-feature-badge">NEW</span>
                </div>
                <p className="text-sm mb-4">Generate a personalized packing list for your trip to {property.location.city}.</p>
                <Link to="/packing" className="block w-full bg-booking-secondary text-white py-2 rounded-md text-center hover:bg-opacity-90">
                  Create Packing List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default PropertyDetail;

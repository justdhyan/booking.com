
import React from 'react';
import { Link } from 'react-router-dom';

interface Destination {
  id: number;
  name: string;
  image: string;
  properties: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 12345
  },
  {
    id: 2,
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 9876
  },
  {
    id: 3,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 7654
  },
  {
    id: 4,
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 6543
  },
  {
    id: 5,
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 5432
  },
  {
    id: 6,
    name: 'Amsterdam',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 4321
  }
];

const PopularDestinations = () => {
  return (
    <div className="mb-16 booking-container">
      <h2 className="text-2xl font-bold mb-6">Trending destinations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link to={`/listings?destination=${destination.name.toLowerCase()}`} key={destination.id}>
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg group">
              <div className="relative h-56">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <p className="text-sm">{destination.properties.toLocaleString()} properties</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;

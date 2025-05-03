
import React from 'react';
import { Link } from 'react-router-dom';

interface PropertyType {
  id: number;
  name: string;
  image: string;
  count: number;
}

const propertyTypes: PropertyType[] = [
  {
    id: 1,
    name: 'Hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 958345
  },
  {
    id: 2,
    name: 'Apartments',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 756234
  },
  {
    id: 3,
    name: 'Resorts',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 234123
  },
  {
    id: 4,
    name: 'Villas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 456789
  },
  {
    id: 5,
    name: 'Cabins',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 123456
  }
];

const PropertyTypes = () => {
  return (
    <div className="mt-40 mb-16 booking-container">
      <h2 className="text-2xl font-bold mb-6">Browse by property type</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {propertyTypes.map((type) => (
          <Link to={`/listings?type=${type.name.toLowerCase()}`} key={type.id} className="group">
            <div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-w-1 aspect-h-1 relative h-40">
                <img 
                  src={type.image} 
                  alt={type.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-booking-gray-600 dark:text-white group-hover:text-booking-secondary">
                  {type.name}
                </h3>
                <p className="text-booking-gray-500 text-sm">
                  {type.count.toLocaleString()} properties
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypes;

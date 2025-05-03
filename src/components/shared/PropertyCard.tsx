
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, Box } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ProgressiveImage from '@/components/ui/progressive-image';
import { ShimmerSkeleton } from '@/components/ui/shimmer-skeleton';
import { motion } from 'framer-motion';

export interface Property {
  id: number;
  name: string;
  type: string;
  location: {
    city: string;
    country: string;
    distance?: string;
  };
  images: string[];
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  perNight: boolean;
  freeCancellation?: boolean;
  verified?: boolean;
  arEnabled?: boolean;
}

interface PropertyCardProps {
  property: Property;
  showLocation?: boolean;
  isLoading?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showLocation = true,
  isLoading = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return <PropertyCardSkeleton />;
  }

  const {
    id,
    name,
    type,
    location,
    images,
    rating,
    reviews,
    price,
    currency,
    perNight,
    freeCancellation,
    verified,
    arEnabled
  } = property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link 
        to={`/property/${id}`} 
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="bg-white dark:bg-booking-gray-600 rounded-lg overflow-hidden shadow-md transition-all duration-300 border border-booking-gray-200 dark:border-booking-gray-500 h-full card-hover"
          animate={{
            boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            {/* Property Image */}
            <div className="aspect-w-16 aspect-h-9 h-48 md:h-64 overflow-hidden">
              <ProgressiveImage 
                src={images[0]} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                placeholderSrc="/placeholder.svg"
              />
            </div>
            
            {/* Badge Container - Positioning these at the top of the image */}
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {/* Verified Badge */}
              {verified && (
                <motion.div 
                  className="enhanced-badge enhanced-badge-verified"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.6, repeat: 0 }}
                >
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </motion.div>
              )}
            </div>
            
            {/* AR Preview Badge */}
            {arEnabled && (
              <motion.div 
                className="absolute top-2 right-2 enhanced-badge enhanced-badge-ar"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.6, delay: 0.2, repeat: 0 }}
              >
                <Box size={12} className="mr-1" />
                AR Preview
              </motion.div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between">
              <div>
                {/* Property Type & Location */}
                <div className="text-xs text-booking-gray-500 dark:text-booking-gray-300 mb-1">
                  {type}
                  {showLocation && ` in ${location.city}, ${location.country}`}
                  {location.distance && ` • ${location.distance} from center`}
                </div>
                
                {/* Property Name */}
                <h3 className="font-bold text-lg text-booking-gray-600 dark:text-white mb-1 transition-colors duration-200 hover:text-booking-secondary">
                  {name}
                </h3>
              </div>
              
              {/* Rating */}
              {rating > 0 && (
                <div className="bg-booking-primary text-white text-sm font-bold px-2 py-1 rounded h-fit flex items-center transition-all duration-200 hover:scale-105">
                  {rating}
                </div>
              )}
            </div>
            
            {/* Reviews */}
            {reviews > 0 && (
              <div className="flex items-center mt-1 mb-2">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.round(rating) ? 'text-yellow-500' : 'text-booking-gray-300'} transition-all duration-200 hover:scale-110`} 
                      fill={i < Math.round(rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-booking-gray-500 dark:text-booking-gray-300">
                  {reviews} reviews
                </span>
              </div>
            )}
            
            {/* Free Cancellation */}
            {freeCancellation && (
              <div className="text-booking-success text-sm font-semibold mb-2">
                Free cancellation
              </div>
            )}
            
            {/* Price */}
            <div className="mt-2">
              <div className="text-right">
                <div className="text-xl font-bold transition-all duration-200 hover:scale-105">
                  {currency}{price}
                </div>
                {perNight && (
                  <p className="text-sm text-booking-gray-500 dark:text-booking-gray-300">per night</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const PropertyCardSkeleton = () => {
  return (
    <div className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-lg overflow-hidden shadow-md h-full transition-all duration-200 hover:shadow-lg">
      <ShimmerSkeleton className="h-48 md:h-64" />
      <div className="p-4 space-y-3">
        <ShimmerSkeleton className="h-4 w-1/2" />
        <ShimmerSkeleton className="h-6 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <ShimmerSkeleton className="h-4 w-1/4" />
          <ShimmerSkeleton className="h-6 w-1/6 rounded-md" />
        </div>
        <div className="flex justify-end">
          <ShimmerSkeleton className="h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

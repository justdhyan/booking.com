
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatSupport from '@/components/ui/AIChatSupport';
import { Button } from '@/components/ui/button';
import { Box, Phone, Camera, Tablet, Scan, Eye } from 'lucide-react';
import { properties } from '@/data/mockData';

const ARPropertyPreview = () => {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showARInstructions, setShowARInstructions] = useState(false);
  
  // AR-enabled properties (for demo purposes)
  const arEnabledProperties = properties.filter(p => p.arEnabled);
  
  // Check if WebXR is supported
  useEffect(() => {
    const checkARSupport = () => {
      if ('xr' in navigator) {
        // @ts-ignore - TypeScript doesn't know about this API yet
        navigator.xr?.isSessionSupported('immersive-ar')
          .then((supported) => {
            setIsARSupported(supported);
          })
          .catch(() => {
            setIsARSupported(false);
          });
      } else {
        setIsARSupported(false);
      }
    };
    
    checkARSupport();
  }, []);
  
  const launchAR = (propertyId: number) => {
    setSelectedProperty(propertyId);
    setShowARInstructions(true);
    
    // In a real app, this would trigger the WebXR session
    console.log(`Launching AR for property ID: ${propertyId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-booking-primary text-white py-12 text-center">
          <div className="booking-container">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">AR Property Preview</h1>
                <span className="new-feature-badge ml-2">NEW</span>
              </div>
              <p className="text-lg mb-6">
                Experience properties in augmented reality before you book
              </p>
            </div>
          </div>
        </div>
        
        <div className="booking-container py-8">
          {isARSupported === null ? (
            <div className="text-center py-8">
              <div className="animate-pulse flex justify-center">
                <div className="h-12 w-12 rounded-full bg-booking-gray-300"></div>
              </div>
              <p className="mt-4">Checking AR capabilities of your device...</p>
            </div>
          ) : isARSupported ? (
            <>
              <div className="bg-booking-secondary/10 dark:bg-booking-secondary/20 rounded-lg p-4 mb-8 flex items-center">
                <Box size={24} className="text-booking-secondary mr-3" />
                <div>
                  <p className="font-medium">Your device supports AR experiences!</p>
                  <p className="text-sm text-booking-gray-600 dark:text-booking-gray-300">
                    Click on any property below to explore in augmented reality.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">AR-Enabled Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {arEnabledProperties.map((property) => (
                  <div key={property.id} className="bg-white dark:bg-booking-gray-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-booking-gray-200 dark:border-booking-gray-500">
                    <div className="relative">
                      <img 
                        src={property.images[0]} 
                        alt={property.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-booking-primary text-white rounded-md px-2 py-1 text-xs flex items-center">
                        <Box size={14} className="mr-1" />
                        AR Preview
                        <span className="new-feature-badge ml-1 text-[10px] py-0">NEW</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{property.name}</h3>
                      <p className="text-sm text-booking-gray-500 dark:text-booking-gray-300 mb-2">
                        {property.location.city}, {property.location.country}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-booking-primary font-bold">
                          {property.currency}{property.price}
                          {property.perNight && <span className="text-xs font-normal text-booking-gray-500 dark:text-booking-gray-300"> / night</span>}
                        </div>
                        <Button 
                          onClick={() => launchAR(property.id)}
                          className="bg-booking-secondary text-white px-3 py-1 rounded hover:bg-opacity-90 transition-all flex items-center"
                        >
                          <Eye size={16} className="mr-1" />
                          View in AR
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <Phone size={48} className="text-booking-gray-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">AR Not Supported</h2>
              <p className="text-booking-gray-600 dark:text-booking-gray-300 mb-4">
                Unfortunately, your device or browser does not support augmented reality experiences.
              </p>
              <div className="bg-booking-gray-100 dark:bg-booking-gray-500 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Try one of these options:</h3>
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-start">
                    <Camera size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span>Use a modern smartphone with AR capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <Tablet size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span>Access this site from a supported tablet</span>
                  </li>
                  <li className="flex items-start">
                    <Scan size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span>Try using Chrome, Safari or Firefox on a newer device</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* AR Instructions Modal */}
        {showARInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-booking-gray-600 rounded-lg p-6 max-w-md w-full animate-fade-in">
              <h2 className="text-xl font-bold mb-4">AR Experience Instructions</h2>
              <div className="space-y-4">
                <p className="text-booking-gray-600 dark:text-booking-gray-300">
                  Follow these steps to view the property in augmented reality:
                </p>
                <ol className="text-sm space-y-3 list-decimal pl-5">
                  <li>Point your camera at a flat surface like a floor or table</li>
                  <li>Move your device around slowly to help it detect the surface</li>
                  <li>Once a surface is detected, tap to place the 3D model</li>
                  <li>Use pinch gestures to resize and rotate the model</li>
                </ol>
                <div className="pt-4 border-t border-booking-gray-200 dark:border-booking-gray-500 flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setShowARInstructions(false)}
                    className="border-booking-gray-300 dark:border-booking-gray-500"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowARInstructions(false);
                      // In a real app, this would continue to the actual AR experience
                      alert("This is where the AR experience would launch in a real app");
                    }}
                    className="bg-booking-secondary text-white hover:bg-opacity-90"
                  >
                    Start AR Experience
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default ARPropertyPreview;

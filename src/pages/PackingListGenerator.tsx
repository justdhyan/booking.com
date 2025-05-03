
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatSupport from '@/components/ui/AIChatSupport';
import { Button } from '@/components/ui/button';
import { Luggage, Check, Package } from 'lucide-react';

const PackingListGenerator = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [tripType, setTripType] = useState('');
  const [generatedList, setGeneratedList] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);

  // Sample packing lists based on trip type
  const packingLists = {
    beach: [
      'Swimsuit', 'Beach towel', 'Sunscreen', 'Sunglasses', 'Hat', 'Flip flops',
      'Light clothing', 'Summer dresses/shorts', 'Beach bag', 'Water bottle',
      'Insect repellent', 'After-sun lotion', 'Beach games', 'Book/e-reader'
    ],
    mountain: [
      'Hiking boots', 'Backpack', 'Water bottle', 'Hiking socks', 'Layered clothing',
      'Waterproof jacket', 'Hat', 'Sunscreen', 'Sunglasses', 'First aid kit',
      'Hiking poles', 'Insect repellent', 'Trail snacks', 'Map/compass'
    ],
    city: [
      'Comfortable walking shoes', 'City map/guide book', 'Camera', 'Day bag',
      'Umbrella', 'Light jacket', 'Dressy outfit for nice restaurants',
      'Power bank', 'Local currency', 'Copies of travel documents',
      'Travel adapters', 'Portable Wi-Fi', 'Comfortable clothing', 'Notebook/journal'
    ],
    business: [
      'Business attire', 'Laptop and charger', 'Business cards', 'Presentation materials',
      'Notebook and pen', 'Portable power bank', 'Travel adapters', 'Toiletries',
      'Comfortable shoes', 'Phone charger', 'Travel documents', 'Medication',
      'Professional backpack/briefcase', 'Portable iron/steamer'
    ]
  };

  // Common items for all trips
  const commonItems = [
    'Passport/ID', 'Travel tickets', 'Travel insurance', 'Credit/debit cards',
    'Currency', 'Phone and charger', 'Toiletries', 'Medication',
    'Underwear', 'Socks', 'Pajamas', 'Toothbrush and toothpaste'
  ];

  // Function to generate packing list based on inputs
  const generatePackingList = () => {
    let items: string[] = [...commonItems];
    
    // Add trip-specific items
    if (tripType === 'beach') {
      items = [...items, ...packingLists.beach];
    } else if (tripType === 'mountain') {
      items = [...items, ...packingLists.mountain];
    } else if (tripType === 'city') {
      items = [...items, ...packingLists.city];
    } else if (tripType === 'business') {
      items = [...items, ...packingLists.business];
    }

    // Add duration-specific items
    if (parseInt(duration) > 7) {
      items.push('Laundry supplies');
      items.push('Extra clothing');
    }

    // Add destination-specific items (simplified logic for demo)
    if (destination.toLowerCase().includes('tropical') || 
        destination.toLowerCase().includes('island') || 
        destination.toLowerCase().includes('beach')) {
      items.push('Extra sunscreen');
      items.push('Aloe vera gel');
      items.push('Light, breathable clothing');
    }
    
    if (destination.toLowerCase().includes('europe') || 
        destination.toLowerCase().includes('asia')) {
      items.push('Travel adapter');
      items.push('Phrase book/translation app');
    }

    setGeneratedList(items);
    setShowList(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-booking-primary text-white py-12 text-center">
          <div className="booking-container">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">Packing List Generator</h1>
                <span className="new-feature-badge ml-2">NEW</span>
              </div>
              <p className="text-lg mb-6">
                Customize your packing list based on your trip details
              </p>
            </div>
          </div>
        </div>
        
        <div className="booking-container py-8">
          <div className="max-w-2xl mx-auto bg-white dark:bg-booking-gray-600 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Trip Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="destination">
                    Destination
                  </label>
                  <input
                    id="destination"
                    type="text"
                    className="w-full p-2 border border-booking-gray-300 dark:border-booking-gray-500 rounded-md dark:bg-booking-gray-500 dark:text-white"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="duration">
                    Duration (days)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    className="w-full p-2 border border-booking-gray-300 dark:border-booking-gray-500 rounded-md dark:bg-booking-gray-500 dark:text-white"
                    placeholder="How many days?"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Trip Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['beach', 'mountain', 'city', 'business'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`p-3 flex items-center justify-center border rounded-md hover:bg-booking-gray-100 dark:hover:bg-booking-gray-500 transition-all ${
                          tripType === type 
                            ? 'border-booking-secondary bg-booking-gray-100 dark:bg-booking-gray-500 shadow-sm' 
                            : 'border-booking-gray-300 dark:border-booking-gray-500'
                        }`}
                        onClick={() => setTripType(type)}
                      >
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={generatePackingList}
                disabled={!destination || !duration || !tripType}
                className="bg-booking-secondary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all flex items-center space-x-2"
              >
                <Package className="mr-2" size={18} />
                Generate Packing List
              </Button>
            </div>
          </div>
          
          {showList && (
            <div className="max-w-2xl mx-auto mt-8 bg-white dark:bg-booking-gray-600 rounded-lg shadow-md p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Packing List</h2>
                <div className="flex items-center text-booking-gray-500 dark:text-booking-gray-300">
                  <Luggage size={18} className="mr-2" />
                  <span>{generatedList.length} items</span>
                </div>
              </div>
              
              <div className="border-t border-booking-gray-200 dark:border-booking-gray-500 pt-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {generatedList.map((item, index) => (
                    <li key={index} className="flex items-center p-2 hover:bg-booking-gray-100 dark:hover:bg-booking-gray-500 rounded-md transition-all">
                      <Check size={16} className="text-booking-secondary mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button className="bg-booking-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 mr-2">
                  Print List
                </Button>
                <Button className="bg-booking-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 mr-2">
                  Save List
                </Button>
                <Button variant="outline" className="border-booking-gray-300 dark:border-booking-gray-500 px-4 py-2 rounded-md hover:bg-booking-gray-100 dark:hover:bg-booking-gray-700">
                  Share List
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default PackingListGenerator;

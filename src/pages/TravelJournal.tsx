import React, { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatSupport from '@/components/ui/AIChatSupport';
import { journalEntries as initialEntries } from '@/data/mockData';
import { MapPin, Calendar, Plus, Image, Camera, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Define JournalEntry type
interface JournalEntry {
  id: number;
  title: string;
  location: string;
  date: string;
  content: string;
  images: string[];
  highlights?: string[];
  accommodation?: string;
}

// Form values type
interface FormValues {
  title: string;
  location: string;
  date: string;
  content: string;
  highlights: string;
  accommodation: string;
}

const TravelJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    location: '',
    date: '',
    content: '',
    highlights: '',
    accommodation: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
      
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully`,
      });
    }
  };
  
  // Handle taking a photo
  const handleTakePhoto = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSaveEntry = () => {
    // Validate form
    if (!formValues.title || !formValues.location || !formValues.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new entry
    const newEntry: JournalEntry = {
      id: Date.now(),
      title: formValues.title,
      location: formValues.location,
      date: formValues.date,
      content: formValues.content,
      images: uploadedImages.length > 0 ? uploadedImages : [
        'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=2560&q=80',
        'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=2560&q=80',
      ],
      highlights: formValues.highlights.split(',').map(item => item.trim()).filter(Boolean),
      accommodation: formValues.accommodation || undefined
    };
    
    // Add to entries
    setEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setFormValues({
      title: '',
      location: '',
      date: '',
      content: '',
      highlights: '',
      accommodation: ''
    });
    setUploadedImages([]);
    setShowAddForm(false);
    
    toast({
      title: "Journal entry saved",
      description: "Your travel memory has been added to your journal"
    });
  };
  
  // Handle entry deletion
  const handleDeleteEntry = (id: number) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast({
      title: "Entry deleted",
      description: "Journal entry has been removed"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-booking-primary text-white py-12 text-center">
          <div className="booking-container">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">My Travel Journal</h1>
                <span className="new-feature-badge ml-2">NEW</span>
              </div>
              <p className="text-lg mb-6">
                Document your adventures and share your travel memories
              </p>
              
              <Button 
                onClick={() => setShowAddForm(!showAddForm)} 
                className="bg-booking-accent text-booking-gray-600 py-2 px-6 rounded-md font-medium hover:bg-opacity-90 flex items-center mx-auto transition-transform hover:scale-105"
              >
                <Plus size={18} className="mr-2" />
                Create New Entry
              </Button>
            </div>
          </div>
        </div>
        
        <div className="booking-container py-8">
          {/* Add New Entry Form */}
          {showAddForm && (
            <div className="bg-white dark:bg-booking-gray-600 rounded-lg shadow-md p-6 mb-8 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Create New Journal Entry</h2>
              
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formValues.title}
                      onChange={handleInputChange}
                      placeholder="Give your trip a title"
                      className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formValues.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Date</label>
                    <input
                      type="text"
                      name="date"
                      value={formValues.date}
                      onChange={handleInputChange}
                      placeholder="Trip dates"
                      className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Accommodation</label>
                    <input
                      type="text"
                      name="accommodation"
                      value={formValues.accommodation}
                      onChange={handleInputChange}
                      placeholder="Where you stayed"
                      className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm mb-1">Trip Highlights</label>
                  <input
                    type="text"
                    name="highlights"
                    value={formValues.highlights}
                    onChange={handleInputChange}
                    placeholder="Add highlights separated by commas (beaches, food, culture)"
                    className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm mb-1">Journal Entry</label>
                  <textarea
                    name="content"
                    value={formValues.content}
                    onChange={handleInputChange}
                    placeholder="Write about your experience..."
                    className="w-full p-2 rounded-md border border-booking-gray-200 dark:border-booking-gray-500 dark:bg-booking-gray-500 dark:text-white h-36"
                  ></textarea>
                </div>
                
                <div className="border-t border-booking-gray-200 dark:border-booking-gray-500 pt-4 mb-4">
                  <h3 className="text-lg font-medium mb-2">Add Photos</h3>
                  
                  {/* Hidden file inputs */}
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <input
                    type="file" 
                    ref={cameraInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />
                  
                  <div className="flex flex-wrap gap-4">
                    {/* Show uploaded images */}
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative h-32 w-32">
                        <img 
                          src={img} 
                          alt={`Uploaded ${idx}`} 
                          className="h-full w-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Upload and Camera buttons */}
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center border-2 border-dashed border-booking-gray-300 dark:border-booking-gray-500 rounded-lg h-32 w-32 hover:border-booking-secondary transition-colors"
                    >
                      <div className="text-center">
                        <Image size={24} className="mx-auto mb-2 text-booking-gray-400" />
                        <span className="text-sm text-booking-gray-500 dark:text-booking-gray-300">Upload Photo</span>
                      </div>
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleTakePhoto}
                      className="flex items-center justify-center border-2 border-dashed border-booking-gray-300 dark:border-booking-gray-500 rounded-lg h-32 w-32 hover:border-booking-secondary transition-colors"
                    >
                      <div className="text-center">
                        <Camera size={24} className="mx-auto mb-2 text-booking-gray-400" />
                        <span className="text-sm text-booking-gray-500 dark:text-booking-gray-300">Take Photo</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="py-2 px-6 border border-booking-gray-300 dark:border-booking-gray-500 hover:bg-booking-gray-100 dark:hover:bg-booking-gray-500 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveEntry}
                    className="bg-booking-secondary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Save Entry
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Journal Entries */}
          <div className="space-y-8">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white dark:bg-booking-gray-600 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                {/* Entry Images */}
                <div className="grid grid-cols-2 gap-2 h-64">
                  {entry.images.map((image, idx) => (
                    <img 
                      key={idx} 
                      src={image} 
                      alt={`${entry.title} ${idx+1}`} 
                      className="w-full h-full object-cover"
                    />
                  ))}
                </div>
                
                <div className="p-6">
                  {/* Entry Header */}
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{entry.title}</h2>
                      <div className="flex items-center text-booking-gray-500 dark:text-booking-gray-300 mb-1">
                        <MapPin size={16} className="mr-1" />
                        <span>{entry.location}</span>
                      </div>
                      <div className="flex items-center text-booking-gray-500 dark:text-booking-gray-300 mb-4">
                        <Calendar size={16} className="mr-1" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost"
                        className="flex items-center text-booking-gray-500 hover:text-booking-primary transition-colors" 
                        size="sm"
                      >
                        <Edit size={18} className="mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost"
                        className="flex items-center text-booking-gray-500 hover:text-booking-error transition-colors" 
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 size={18} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  {/* Entry Content */}
                  <div className="mb-4">
                    <p>{entry.content}</p>
                  </div>
                  
                  {/* Entry Highlights */}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Highlights:</h3>
                      <div className="flex flex-wrap gap-2">
                        {entry.highlights.map((highlight, idx) => (
                          <span 
                            key={idx} 
                            className="bg-booking-gray-100 dark:bg-booking-gray-500 text-booking-gray-600 dark:text-white px-3 py-1 rounded-full text-sm transition-colors hover:bg-booking-gray-200 dark:hover:bg-booking-gray-400"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Accommodation */}
                  {entry.accommodation && (
                    <div className="text-booking-gray-500 dark:text-booking-gray-300 text-sm">
                      <span className="font-medium">Accommodation:</span> {entry.accommodation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {entries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✈️</div>
              <h2 className="text-2xl font-bold mb-2">Your travel journal is empty</h2>
              <p className="text-booking-gray-500 dark:text-booking-gray-300 mb-6">Start documenting your adventures by creating your first entry.</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-booking-secondary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all hover:scale-105"
              >
                Create First Entry
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default TravelJournal;

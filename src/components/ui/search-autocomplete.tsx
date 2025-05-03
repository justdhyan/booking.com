
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';

interface SearchAutocompleteProps {
  placeholder?: string;
  defaultValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

const sampleDestinations = [
  { name: 'New York, United States', category: 'Popular Cities' },
  { name: 'Paris, France', category: 'Popular Cities' },
  { name: 'Tokyo, Japan', category: 'Popular Cities' },
  { name: 'London, United Kingdom', category: 'Popular Cities' },
  { name: 'Barcelona, Spain', category: 'Popular Cities' },
  { name: 'Rome, Italy', category: 'Popular Cities' },
  { name: 'Dubai, United Arab Emirates', category: 'Popular Cities' },
  { name: 'Sydney, Australia', category: 'Popular Cities' },
];

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder = 'Where are you going?',
  defaultValue = '',
  onSelect,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof sampleDestinations>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = sampleDestinations.filter(destination =>
        destination.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && filteredSuggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp' && filteredSuggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[selectedIndex].name);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setInputValue(value);
    if (onSelect) onSelect(value);
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-booking-gray-300 dark:border-booking-gray-500 text-booking-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-booking-secondary dark:bg-booking-gray-600"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500" size={18} />
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-white dark:bg-booking-gray-600 border border-booking-gray-300 dark:border-booking-gray-500 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="py-2">
            <div className="px-4 py-1 text-xs text-booking-gray-500 dark:text-booking-gray-300 font-medium uppercase">
              Suggestions
            </div>
            {filteredSuggestions.map((destination, index) => (
              <div
                key={destination.name}
                onClick={() => handleSuggestionClick(destination.name)}
                className={`px-4 py-2 flex items-center cursor-pointer ${
                  index === selectedIndex
                    ? 'bg-booking-secondary/10 dark:bg-booking-secondary/20'
                    : 'hover:bg-booking-gray-100 dark:hover:bg-booking-gray-500'
                }`}
              >
                <MapPin size={16} className="mr-2 text-booking-secondary" />
                <span>{destination.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;

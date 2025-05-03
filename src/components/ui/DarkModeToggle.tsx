
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from local storage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Apply transition classes to elements that should animate
    document.documentElement.classList.add('transition-all', 'duration-300', 'ease-in-out');
  }, []);

  // Toggle theme function
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-booking-secondary focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 ease-in-out"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun size={20} className="transition-all duration-300 ease-in-out" />
      ) : (
        <Moon size={20} className="transition-all duration-300 ease-in-out" />
      )}
    </button>
  );
};

export default DarkModeToggle;

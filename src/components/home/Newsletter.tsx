
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to a server
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-booking-primary text-white py-12 mb-16">
      <div className="booking-container text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Save time, save money!
        </h2>
        <p className="text-lg mb-6">
          Subscribe to our newsletter and we'll send the best deals to you
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-3 px-4 rounded-md text-booking-gray-600 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-booking-accent text-booking-gray-600 font-semibold py-3 px-6 rounded-md hover:bg-opacity-90"
            >
              Subscribe
            </button>
          </div>
          
          {isSubmitted && (
            <p className="mt-2 text-booking-accent text-sm animate-fade-in">
              Thank you for subscribing! We'll be in touch.
            </p>
          )}
          
          <div className="mt-4 flex items-center justify-center">
            <input type="checkbox" id="consent" className="mr-2" />
            <label htmlFor="consent" className="text-sm">
              I'd like to receive travel deals, special offers and other information from Booking.com.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;

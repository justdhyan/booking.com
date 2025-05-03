
import React from 'react';
import Hero from '@/components/home/Hero';
import PropertyTypes from '@/components/home/PropertyTypes';
import PopularDestinations from '@/components/home/PopularDestinations';
import Newsletter from '@/components/home/Newsletter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatSupport from '@/components/ui/AIChatSupport';
import { properties } from '@/data/mockData';
import PropertyCard from '@/components/shared/PropertyCard';
import { AnimatedSection, AnimatedStaggerContainer } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  // Display featured properties (top rated)
  const featuredProperties = properties
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
    
  // Add verified and AR preview badges to the 3rd and 4th cards
  featuredProperties[2] = { ...featuredProperties[2], verified: true };
  featuredProperties[3] = { ...featuredProperties[3], arEnabled: true };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="flex-grow">
        <AnimatedSection>
          <PropertyTypes />
        </AnimatedSection>
        
        <AnimatedSection delay={100}>
          <PopularDestinations />
        </AnimatedSection>
        
        {/* Featured Properties */}
        <AnimatedSection className="booking-container mb-16" delay={200}>
          <h2 className="text-2xl font-bold mb-6">Featured properties</h2>
          <AnimatedStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </AnimatedStaggerContainer>
        </AnimatedSection>
        
        {/* Deals Section */}
        <AnimatedSection className="bg-booking-gray-100 dark:bg-booking-gray-600 py-12 mb-16" delay={300}>
          <div className="booking-container">
            <motion.h2 
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Deals & Promotions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white dark:bg-booking-gray-500 rounded-lg overflow-hidden shadow-md"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-booking-primary text-white p-4">
                  <h3 className="text-xl font-bold">Last Minute Deals</h3>
                  <p className="text-sm">Save up to 25% on stays this week</p>
                </div>
                <div className="p-4">
                  <p className="mb-4 text-booking-gray-600 dark:text-white">Need a place to stay soon? Check out these last-minute deals!</p>
                  <Button className="bg-booking-secondary text-white w-full">
                    Find Deals
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-booking-gray-500 rounded-lg overflow-hidden shadow-md"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-booking-primary text-white p-4">
                  <h3 className="text-xl font-bold">Early Bird Special</h3>
                  <p className="text-sm">Book early and save up to 20%</p>
                </div>
                <div className="p-4">
                  <p className="mb-4 text-booking-gray-600 dark:text-white">Plan ahead for your next trip and enjoy these early booking discounts.</p>
                  <Button className="bg-booking-secondary text-white w-full">
                    Book Now
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-booking-gray-500 rounded-lg overflow-hidden shadow-md"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-booking-primary text-white p-4">
                  <h3 className="text-xl font-bold">Weekend Getaways</h3>
                  <p className="text-sm">Perfect for short escapes</p>
                </div>
                <div className="p-4">
                  <p className="mb-4 text-booking-gray-600 dark:text-white">Need a break? Explore our weekend getaway packages at great prices.</p>
                  <Button className="bg-booking-secondary text-white w-full">
                    Explore
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Advertisement for New Features */}
        <AnimatedSection className="booking-container mb-16" delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gradient-to-r from-booking-primary to-booking-secondary text-white rounded-lg p-6 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-bold">Local Guides</h3>
                  <span className="new-feature-badge ml-2">NEW</span>
                </div>
                <p className="mt-2">Discover hidden gems and local favorites with our community-driven guides.</p>
              </div>
              <Button className="mt-4 bg-white text-booking-primary w-fit">
                Explore Guides
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-booking-secondary to-booking-accent text-white rounded-lg p-6 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-bold">Travel Journal</h3>
                  <span className="new-feature-badge ml-2">NEW</span>
                </div>
                <p className="mt-2">Document your adventures and share your travel experiences with others.</p>
              </div>
              <Button className="mt-4 bg-white text-booking-secondary w-fit">
                Start Writing
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={500}>
          <Newsletter />
        </AnimatedSection>
      </main>
      
      <Footer />
      <AIChatSupport />
    </div>
  );
};

export default Index;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Book, User, LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => {
    if (route === '/' && path === '/') return true;
    if (route !== '/' && path.startsWith(route)) return true;
    return false;
  };

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/listings', label: 'Explore', icon: Map },
    { to: '/travel-journal', label: 'Journal', icon: Book },
    { to: '/user-profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-booking-gray-600 shadow-lg border-t border-booking-gray-200 dark:border-booking-gray-500 z-40">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            isActive={isActive(item.to)}
          />
        ))}
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  label: string;
  // Update the icon type to match lucide-react's actual component type
  icon: React.ComponentType<LucideProps>;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon: Icon, isActive }) => {
  return (
    <Link to={to} className="flex flex-col items-center justify-center">
      <motion.div
        className="flex flex-col items-center"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
      >
        <Icon
          size={20}
          className={isActive ? "text-booking-primary" : "text-booking-gray-500"}
        />
        <motion.span 
          className={`text-xs mt-1 ${
            isActive ? 'text-booking-primary font-medium' : 'text-booking-gray-500'
          }`}
          animate={{ 
            y: isActive ? [2, 0] : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default MobileBottomNav;

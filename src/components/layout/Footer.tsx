
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-booking-gray-100 text-booking-gray-600 pt-12 pb-8 mt-12">
      {/* Main Footer Links */}
      <div className="booking-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Booking.com</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">About</Link></li>
              <li><Link to="/" className="hover:underline">How We Work</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Center</Link></li>
              <li><Link to="/" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Help & Support</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Help Center</Link></li>
              <li><Link to="/" className="hover:underline">Safety Information</Link></li>
              <li><Link to="/" className="hover:underline">Cancellation Options</Link></li>
              <li><Link to="/" className="hover:underline">COVID-19 Response</Link></li>
              <li><Link to="/" className="hover:underline">Support Disabled People</Link></li>
              <li><Link to="/" className="hover:underline">Report Neighborhood Concern</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Terms & Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:underline">Cookie Policy</Link></li>
              <li><Link to="/" className="hover:underline">Content Policy</Link></li>
              <li><Link to="/" className="hover:underline">Acceptable Use Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">New Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/local-guides" className="hover:underline">
                  Local Guides
                  <span className="new-feature-badge">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/packing" className="hover:underline">
                  Packing List Generator
                  <span className="new-feature-badge">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/travel-journal" className="hover:underline">
                  Travel Journal
                  <span className="new-feature-badge">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/ar-preview" className="hover:underline">
                  AR Property Preview
                  <span className="new-feature-badge">NEW</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-6 border-t border-booking-gray-300 text-sm">
          <p>© 2023 Booking.com Clone. All rights reserved.</p>
          <p className="mt-2 text-xs">This is a demo project and is not affiliated with the actual Booking.com.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

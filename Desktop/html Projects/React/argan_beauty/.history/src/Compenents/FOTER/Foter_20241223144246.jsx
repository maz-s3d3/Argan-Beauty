import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter, Pinterest, ArrowRight } from 'lucide-react';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter signup logic would go here
  };

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100 relative">
      {/* Moroccan pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMGwxMCAxMC0xMCAxMCAxMCAxMEwyMCA0MEwxMCAzMGwxMC0xMEwxMCAxMHoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="/api/placeholder/200/80" alt="Argan Beauty Logo" className="h-12" />
            <p className="text-amber-900 font-light italic">Embrace Nature's Luxury</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About Us', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(' ', '-')}`} 
                     className="text-amber-800 hover:text-amber-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:contact@arganbeauty.com" 
                 className="flex items-center gap-2 text-amber-800 hover:text-amber-600">
                <Mail size={18} />
                <span>contact@arganbeauty.com</span>
              </a>
              <a href="tel:+1234567890" 
                 className="flex items-center gap-2 text-amber-800 hover:text-amber-600">
                <Phone size={18} />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-4">Stay Connected</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:border-amber-400"
                  required
                />
                <button type="submit" 
                        className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-6">
                {[Instagram, Facebook, Twitter, Pinterest].map((Icon, index) => (
                  <a key={index} href="#" 
                     className="text-amber-700 hover:text-amber-500 transition-colors">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-amber-200 text-center text-amber-800">
          <p>&copy; {new Date().getFullYear()} Argan Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

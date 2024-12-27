// SearchBar.js
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const dummySuggestions = [
      'Huile d\'argan',
      'Savon noir',
      'Crème visage',
      'Masque cheveux'
    ].filter(item => 
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(value ? dummySuggestions : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Rechercher des produits..."
          className={`
            w-48 md:w-64 rounded-full px-4 py-2 pr-10
            focus:w-72 transition-all duration-300
            ${isDarkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-green-500' 
              : 'bg-white text-gray-800 border-green-200 focus:ring-green-300'}
            focus:outline-none focus:ring-2
          `}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Search 
            className={`
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              hover:text-green-500 transition-colors
            `}
            size={20}
          />
        </button>
      </form>

      {isSearchFocused && suggestions.length > 0 && (
        <div className={`
          absolute top-full left-0 right-0 mt-1
          border rounded-lg shadow-lg z-50
          ${isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'}
        `}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchQuery(suggestion);
                onSearch(suggestion);
                setSuggestions([]);
              }}
              className={`
                w-full text-left px-4 py-2
                hover:bg-green-50 hover:text-green-600
                transition-colors first:rounded-t-lg last:rounded-b-lg
                ${isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-800'}
              `}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ProHeader.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';

// Import your logo
import logo from '../../image/logo.jpg'; 
import Marque from './Marque';

function ProHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const headerRef = useRef(null);

  const links = React.useMemo(() => [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Products", path: "/card", icon: "🛍️" },
    { name: "About Us", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📞" }
  ], []);

  const handleScroll = useCallback(() => {
    const scrollThreshold = 20;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  useEffect(() => {
    const optimizedScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScrollHandler);
  }, [handleScroll]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (query) => {
    // Implement your search logic here
    console.log('Searching for:', query);
    // Example: navigate to search results page
    // history.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: isScrolled 
          ? (isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)') 
          : 'transparent'
      }}
      transition={{ duration: 0.3 }}
      className={`
        fixed w-full top-0 z-50 p-4 mb-5
        backdrop-blur-md transition-all duration-300
        ${isDarkMode ? 'dark:bg-gray-900/80' : 'bg-white/80'}
        ${isScrolled ? 'shadow-md' : ''}
      `}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
            <img
              src={logo}
              alt="Argan Beauty Logo"
              loading="lazy"
              className="h-12 w-12 mr-3 rounded-full shadow-lg object-cover transition-transform"
            />
            <span className={`
              text-xl font-bold transition-colors
              ${isDarkMode ? 'text-green-300' : 'text-green-600'}
            `}>
              ARGAN BEAUTY
            </span>
          </Link>
        </motion.div>

        <button 
          onClick={toggleTheme}
          className={`
            p-2 rounded-full transition-all
            ${isDarkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
          `}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className={`
            md:hidden focus:outline-none transition-colors
            ${isDarkMode ? 'text-green-300' : 'text-green-600'}
          `}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row 
          fixed md:static top-full left-0 w-full md:w-auto 
          ${isDarkMode ? 'bg-gray-800 md:bg-transparent' : 'bg-white md:bg-transparent'}
          p-4 md:p-0 gap-4 
          shadow-lg md:shadow-none
        `}>
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`
                    flex items-center gap-2
                    ${isDarkMode 
                      ? 'text-green-300 hover:text-green-200' 
                      : 'text-gray-800 hover:text-green-600'}
                    font-medium 
                    transition-colors 
                    py-2 md:py-0
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Go to ${link.name} page`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/login"
              className={`
                flex items-center gap-2
                px-4 py-2 rounded-full 
                transition-all duration-300
                ${isDarkMode 
                  ? 'bg-green-800 text-green-200 hover:bg-green-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'}
              `}
            >
              <User size={18} />
              Login
            </Link>
          </motion.div>
        </div>
      </div>
      <Marque/>
    </motion.header>
  );
}

export default ProHeader;
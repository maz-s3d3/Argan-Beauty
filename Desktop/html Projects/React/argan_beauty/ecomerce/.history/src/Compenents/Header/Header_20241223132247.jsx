import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Menu, X, User, Sun, Moon, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Optimized logo import with potential for webp/svg
import logo from '../../image/logo.jpg'; 
import Marque from './Marque'

function ProHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState(0); // Pour le compteur du panier
  const headerRef = useRef(null);

  // Memoized navigation links
  const links = React.useMemo(() => [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Products", path: "/card", icon: "🛍️" },
    { name: "About Us", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📞" }
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollThreshold = 20;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  // Performance-optimized scroll listener
  useEffect(() => {
    const optimizedScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScrollHandler);
  }, [handleScroll]);

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Mobile menu toggle with animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = () => {
    setCartItems(cartItems + 1);
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
        ${isScrolled ? 'shadow-md' : ''}`
      }
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section avec Advanced Interactions */}
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
            <span className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
              ARGAN BEAUTY
            </span>
          </Link>
        </motion.div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden focus:outline-none transition-colors ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className={`${
          isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:static top-full left-0 w-full md:w-auto 
          ${isDarkMode ? 'bg-gray-800 md:bg-transparent' : 'bg-white md:bg-transparent'} p-4 md:p-0 gap-4 shadow-lg md:shadow-none`}>
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
                  className={`flex items-center gap-2 ${isDarkMode ? 'text-green-300 hover:text-green-200' : 'text-gray-800 hover:text-green-600'} font-medium transition-colors py-2 md:py-0`}
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

        {/* Search, Cart and Login Section */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.div whileFocus={{ scale: 1.05 }} className="relative">
            <input
              type="text"
              placeholder="Search products"
              className={`w-48 rounded-full px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-green-200'} focus:outline-none focus:ring-2 transition-all duration-300`}
            />
            <Search 
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              size={20} 
            />
          </motion.div>
          
          {/* Bouton Panier */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
            <Link
              to="/CartContext"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-700 text-green-300 hover:bg-gray-600' : 'bg-gray-100 text-green-600 hover:bg-gray-200'}`}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} />
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                >
                  {addToCart}
                </motion.span>
              )}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-green-800 text-green-200 hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              <User size={18} />
              Login
            </Link>
          </motion.div>
        </div>
      </div>
      <Marque />
    </motion.header>
  );
}

export default ProHeader;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Menu, X, User, Sun, Moon, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../image/logo.jpg';

function ProHeader() {
  // États
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [id_cart, setIdCart] = useState(null);
  const [identity, setIdentity] = useState(null);
  const headerRef = useRef(null);

  // Navigation links
  const links = React.useMemo(() => [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Products", path: "/card", icon: "🛍️" },
    { name: "About Us", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📞" },
  ], []);

  // Gestion du scroll
  const handleScroll = useCallback(() => {
    const scrollThreshold = 20;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  // Mise à jour du compteur du panier
  const updateCartCount = useCallback(async () => {
    if (!id_cart) return;

    try {
      const response = await fetch(
        `https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php?id_cart=${id_cart}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true,
          },
        }
      );

      if (!response.ok) throw new Error('Erreur de chargement du panier');

      const data = await response.json();
      const totalItems = Array.isArray(data)
        ? data.reduce((sum, item) => sum + (parseFloat(item.quantity) || 1), 0)
        : 0;

      setCartCount(totalItems);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compteur:', error);
      setCartCount(0);
    }
  }, [id_cart]);

  // Effet pour charger les données initiales
  useEffect(() => {
    const storedCartId = localStorage.getItem('id_cart');
    const storedIdentity = localStorage.getItem('identity');
    setIdCart(storedCartId);
    setIdentity(storedIdentity);
  }, []);

  // Effet pour le scroll
  useEffect(() => {
    const optimizedScrollHandler = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScrollHandler);
  }, [handleScroll]);

  // Effet pour le compteur du panier
  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [updateCartCount]);

  // Handlers
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isScrolled
          ? (isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)')
          : 'transparent',
      }}
      transition={{ duration: 0.3 }}
      className={`
        fixed w-full top-0 z-50 p-4
        backdrop-blur-md transition-all duration-300
        ${isDarkMode ? 'dark:bg-gray-900/80' : 'bg-white/80'}
        ${isScrolled ? 'shadow-md' : ''}
      `}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Go to homepage">
          <img
            src={logo}
            alt="Argan Beauty Logo"
            className="h-12 w-12 mr-3 rounded-full shadow-lg object-cover"
          />
          <span
            className={`text-xl font-bold ${
              isDarkMode ? 'text-green-300' : 'text-green-600'
            }`}
          >
            ARGAN BEAUTY
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart */}
          {identity === "user" ? (
            <Link
              to={`/cart/${id_cart}`}
              className="relative flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          ) : (
            <Link to="/login">
              <User size={18} />
            </Link>
          )}

          {/* Menu */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-white shadow-md">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </motion.header>
  );
}

export default ProHeader;

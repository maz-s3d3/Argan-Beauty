import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Car, Clock, Shield, Star } from 'lucide-react';
import image from '../image/v1.jpg'

const Ss = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <Car className="w-8 h-8" />, title: "Large Gamme", desc: "Véhicules pour tous les besoins" },
    { icon: <Clock className="w-8 h-8" />, title: "24/7 Service", desc: "Assistance permanente" },
    { icon: <Shield className="w-8 h-8" />, title: "Sécurité", desc: "Véhicules entretenus" },
    { icon: <Star className="w-8 h-8" />, title: "Premium", desc: "Service de qualité" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section avec Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(rgba(0, 100, 0, 0.8), rgba(0, 50, 0, 0.9))`,
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 1 }}
          className="container mx-auto text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-200">
              Location de Voitures
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Découvrez notre flotte exclusive de véhicules pour une expérience de conduite inoubliable
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="./card"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-400 
                         text-white text-lg font-semibold py-4 px-8 rounded-full
                         hover:shadow-lg hover:from-green-600 hover:to-emerald-500
                         transition-all duration-300 transform"
            >
              Réserver maintenant
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-10 h-10 text-white opacity-80" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="lg:w-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={image}
                  alt="Notre flotte"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Une Expérience
                <span className="text-green-600"> Premium</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Notre service de location de voitures vous offre une flexibilité totale 
                pour vos déplacements, avec une large gamme de véhicules adaptés à tous 
                vos besoins. Profitez d'une expérience sur mesure avec notre service 
                client disponible 24h/24.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white py-3 px-8 rounded-full
                         hover:bg-green-700 transition-colors duration-300"
              >
                Découvrir notre flotte
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ss;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  Leaf, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

// Importez vos images
import image1 from '../../image/v1.jpg';
import image2 from '../../image/v2.jpg';
import image3 from '../../image/v3.jpg';

const ProHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      image: image1,
      title: "Huile d'Argan Pure",
      description: "Un trésor naturel millénaire, extrait avec passion et respect des traditions ancestrales marocaines.",
      features: [
        "Extraction artisanale certifiée",
        "100% naturelle et bio",
        "Traçabilité garantie"
      ],
      icon: Droplet,
      gradient: "from-green-100 via-green-50 to-white",
      iconBg: "bg-green-100",
      shadowColor: "shadow-green-200/50"
    },
    {
      image: image2,
      title: "Beauté & Bien-être Naturel",
      description: "Un élixir miracle qui transcende les soins, alliant beauté ancestrale et science moderne.",
      features: [
        "Régénération cellulaire",
        "Hydratation profonde",
        "Anti-âge naturel"
      ],
      icon: Sparkles,
      gradient: "from-green-100 via-green-50 to-white",
      iconBg: "bg-amber-100",
      shadowColor: "shadow-amber-200/50"
    },
    {
      image: image3,
      title: "Engagement Éthique",
      description: "Au-delà d'un produit, une histoire de respect, de durabilité et d'autonomisation des communautés.",
      features: [
        "Commerce équitable",
        "Soutien aux coopératives",
        "Impact social positif"
      ],
      icon: Globe,
      gradient: "from-green-100 via-green-50 to-white",
      iconBg: "bg-blue-100",
      shadowColor: "shadow-blue-200/50"
    }
  ];

  // Slider Control
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-50 z-0"></div>
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] z-10"></div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.7,
            ease: "easeInOut"
          }}
          className={`
            container mx-auto px-4 z-20 relative
            bg-gradient-to-r ${sliderData[currentSlide].gradient}
            rounded-3xl shadow-2xl overflow-hidden
            ${sliderData[currentSlide].shadowColor}
          `}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center min-h-screen p-8">
            {/* Content Section */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Title with Icon */}
              <div className="flex items-center space-x-4">
                <div className={`
                  p-4 rounded-full 
                  ${sliderData[currentSlide].iconBg}
                  shadow-md
                `}>
                 {React.createElement(sliderData[currentSlide].icon, {
  className: "w-12 h-12 text-green-600",
})}

                </div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {sliderData[currentSlide].title}
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-700 leading-relaxed">
                {sliderData[currentSlide].description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {sliderData[currentSlide].features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <ArrowRight 
                      className="w-6 h-6 text-green-500" 
                    />
                    <span className="text-lg text-gray-600">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-4 
                  bg-green-600 
                  text-white 
                  rounded-xl 
                  flex 
                  items-center 
                  space-x-3
                  shadow-lg
                  hover:bg-green-700
                  transition-all
                  group
                "
              >
                <span>Découvrir Notre Histoire</span>
                <ArrowRight 
                  className="
                    w-6 h-6 
                    group-hover:translate-x-1 
                    transition-transform
                  " 
                />
              </motion.button>
            </motion.div>

            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center items-center"
            >
              <img 
                src={sliderData[currentSlide].image} 
                alt={sliderData[currentSlide].title} 
                className="
                  w-full 
                  max-h-[600px] 
                  object-cover 
                  rounded-3xl 
                  shadow-2xl
                  transform 
                  hover:scale-105 
                  transition-transform
                  duration-500
                " 
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentSlide 
                ? 'bg-green-600 w-8' 
                : 'bg-green-200'}
            `}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 flex items-center justify-between w-full z-30 px-4">
        <button 
          onClick={prevSlide}
          className="
            bg-white/50 backdrop-blur-sm 
            rounded-full p-2 
            hover:bg-white/70 
            transition-all
            hidden md:block
          "
        >
          <ArrowRight className="w-8 h-8 text-green-600 rotate-180" />
        </button>
        <button 
          onClick={nextSlide}
          className="
            bg-white/50 backdrop-blur-sm 
            rounded-full p-2 
            hover:bg-white/70 
            transition-all
            hidden md:block
            ml-auto
          "
        >
          <ArrowRight className="w-8 h-8 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default ProHero;
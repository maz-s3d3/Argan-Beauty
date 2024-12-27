import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import video from '../../image/video.mp4';

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Gestion du défilement
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Animation de la flèche
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(currentScrollPos < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden mt-12">
      {/* Section vidéo */}
      <div className="absolute top-0 left-0 w-full h-full mt-12">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 mt-12" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>

      {/* Contenu principal */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold mb-6 text-center">
          Bienvenue sur notre site
        </h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Découvrez nos innovations et nos services exceptionnels
        </p>
        
        {/* Bouton flèche animé */}
        <button
          onClick={scrollToContent}
          className={`absolute bottom-8 animate-bounce transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Défiler vers le bas"
        >
          <ChevronDown size={48} strokeWidth={2} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Home;
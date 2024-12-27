import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import video from '../../image/video.mp4';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer l'opacité en fonction du scroll
  const contentOpacity = Math.min(scrollPosition / 300, 1);

  return (
    <div className="relative">
      {/* Section vidéo avec hauteur ajustée */}
      <div className="relative w-full h-[60vh] overflow-hidden">
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

        {/* Overlay qui devient plus opaque au scroll */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-300"
          style={{ opacity: contentOpacity * 0.7 }}
        />

        {/* Flèche de défilement */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={48} className="text-white" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative">
        {/* Contenu principal avec animation d'apparition */}
        <div
          className="max-w-6xl mx-auto px-4 py-16 transition-all duration-500"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 50}px)`,
          }}
        >
          <div className="bg-white/90 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-6">Notre Vision</h1>
            <p className="text-xl mb-8">
              Découvrez notre approche innovante et nos solutions créatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Innovation</h2>
                <p>Nous repoussons les limites de la créativité.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Excellence</h2>
                <p>La qualité est au cœur de nos services.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Impact</h2>
                <p>Des résultats concrets pour votre succès.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Facebook, Instagram, Twitter, LinkedIn } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* À propos de la marque */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">Argan Beauty</h3>
            <p className="text-sm text-gray-400">
              La beauté au naturel. Argan Beauty vous propose des produits à base d'argan pour révéler votre éclat naturel.
              Soin de la peau, cheveux et bien-être.
            </p>
          </div>

          {/* Liens importants */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens Utiles</h3>
            <ul className="text-sm text-gray-400">
              <li><a href="/" className="hover:text-yellow-500">Accueil</a></li>
              <li><a href="/about" className="hover:text-yellow-500">À propos</a></li>
              <li><a href="/shop" className="hover:text-yellow-500">Boutique</a></li>
              <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="hover:text-yellow-500" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://instagram.com" className="hover:text-yellow-500" aria-label="Instagram">
                <Instagram size={28} />
              </a>
              <a href="https://twitter.com" className="hover:text-yellow-500" aria-label="Twitter">
                <Twitter size={28} />
              </a>
              <a href="https://linkedin.com" className="hover:text-yellow-500" aria-label="LinkedIn">
                <LinkedIn size={28} />
              </a>
            </div>
          </div>

          {/* Formulaire d'abonnement */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Abonnez-vous à notre Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Recevez les dernières actualités et offres exclusives d'Argan Beauty.</p>
            <form className="flex items-center">
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                className="px-4 py-2 rounded-l-full w-3/4 text-gray-800 focus:outline-none"
              />
              <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-r-full hover:bg-yellow-600">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright et mention légale */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Argan Beauty. Tous droits réservés. | <a href="/terms" className="hover:text-yellow-500">Mentions légales</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

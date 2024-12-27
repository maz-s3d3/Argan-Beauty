import React from 'react';
import { Facebook, Instagram, Twitter, LinkedIn } from 'lucide-react'; // Utilisation des icônes Lucide

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos de la marque */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">Argan Beauty</h3>
            <p className="text-sm">
              Découvrez l'élégance de la nature avec Argan Beauty. Nos produits cosmétiques sont à base d'argan
              pur, pour nourrir et sublimer votre peau et vos cheveux. Faites confiance à la beauté authentique.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens</h3>
            <ul className="text-sm">
              <li><a href="/" className="hover:underline">Accueil</a></li>
              <li><a href="/about" className="hover:underline">À propos</a></li>
              <li><a href="/products" className="hover:underline">Nos produits</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-300" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-300" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-300" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-300" aria-label="LinkedIn">
                <LinkedIn size={24} />
              </a>
            </div>
          </div>

          {/* Abonnement à la newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Abonnez-vous</h3>
            <p className="text-sm mb-4">Recevez les dernières nouveautés et offres exclusives directement dans votre boîte e-mail.</p>
            <form className="flex items-center space-x-2">
              <input 
                type="email" 
                placeholder="Votre email"
                className="px-4 py-2 rounded-full w-3/4 text-gray-700 focus:outline-none"
              />
              <button className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-200">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Argan Beauty. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

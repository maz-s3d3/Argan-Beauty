import React from 'react';
import image from '../image/v2.jpg';
import { Link } from 'react-router-dom';
const Ss = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Bienvenue sur notre site de location de voitures</h1>
          <p className="text-lg mb-6">
            Trouvez la voiture parfaite pour vos besoins avec notre service de location rapide et facile.
          </p>
        <button className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700">
          <Link to={'./card'}>
            Réserver maintenant
            </Link>
          </button>
        </div>
      </section>

      {/* Professional Description Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row items-center bg-gray-50 rounded-lg shadow-xl p-8">
          <div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/2">
            <img
              src={image} // Remplacer par le chemin de votre image
              alt="Description professionnelle"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-extrabold text-green-800 mb-4">Description Professionnelle</h2>
            <p className="text-gray-700 text-lg mb-4">
              Notre service de location de voitures vous offre une flexibilité totale pour vos déplacements, avec une large gamme de véhicules adaptés à tous vos besoins. Que vous ayez besoin d'une voiture pour une courte durée ou pour un voyage longue distance, nous avons ce qu'il vous faut.
            </p>
            <p className="text-gray-600 mb-6">
              Tous nos véhicules sont soigneusement entretenus et disponibles avec une assistance 24h/24. Faites votre réservation en ligne et profitez d'une expérience de location sans tracas.
            </p>
            <button className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700">
              En savoir plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ss;

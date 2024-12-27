import React from 'react';
import bb from '../image/logo.jpg';
import CC from '../image/v1.jpg';
import l from '../image/v3.jpg';
import image from '../image/v1.jpg'
import { Award, Globe, Heart, Shield, Star } from 'lucide-react';

const PartnersBenefits = () => {
  // const partners = [
  //   { logo: bb, name: 'Partenaire 1', description: 'Collaboration stratégique' },
  //   { logo: CC, name: 'Partenaire 2', description: 'Innovation conjointe' },
  //   { logo: l, name: 'Partenaire 3', description: 'Support technologique' }
  // ];

  const benefits = [
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: 'Rayonnement International',
      description: 'Présence mondiale et expertise reconnue dans l\'industrie de la beauté et des soins naturels.'
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: 'Qualité Certifiée',
      description: 'Tous nos produits sont rigoureusement testés et certifiés, garantissant pureté et efficacité.'
    },
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: 'Engagement Durable',
      description: 'Commitment to sustainable and ethical practices, supporting local communities and environment.'
    }
  ];

  const testimonials = [
    {
      name: 'Sophie Dupont',
      review:
        'Les produits Argan Beauty sont incroyables ! Ma peau est visiblement plus éclatante depuis que j\'ai commencé à les utiliser.',
      rating: 5
    },
    {
      name: 'Jean-Luc Martin',
      review:
        'J\'adore leur engagement pour des pratiques durables. Les produits sont d\'une qualité exceptionnelle.',
      rating: 4
    },
    {
      name: 'Camille Leroy',
      review:
        'Le service client est impeccable, et les résultats des produits sont au-delà de mes attentes. Bravo !',
      rating: 5
    }
  ];

  return (
    <section className="container mx-auto py-16 px-4">
      {/* {notre experience} */}
      <div className="text-center mb-16">
    <h2 className="text-4xl font-extrabold text-green-900 mb-8">Nos Expériences</h2>
  </div>
  
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
              Notre agence de marketing spécialisée dans l'industrie de la beauté, en particulier autour de l'huile d'argan, vous offre une approche unique pour sublimer votre image et maximiser votre présence en ligne. Grâce à notre expertise en stratégie numérique et en branding, nous mettons en valeur les bienfaits naturels de l'argan pour attirer une clientèle soucieuse de qualité et de produits authentiques. Nous créons des campagnes publicitaires sur mesure, alliant esthétique et efficacité, pour toucher les consommateurs à travers les canaux les plus performants. Avec une approche centrée sur l’innovation et la créativité, nous vous accompagnons dans le développement de votre marque, en renforçant sa visibilité et sa crédibilité. Offrez à vos clients l’expérience de la beauté naturelle avec l'huile d'argan, et laissez-nous vous guider vers le succès.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white py-3 px-8 rounded-full
                         hover:bg-green-700 transition-colors duration-300"
              >
                Découvrir notre agence
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

      {/* Avantages Section */}
      <div className="bg-green-50 p-12 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-green-900 text-center mb-12">
          Les Avantages Argan Beauty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:translate-y-1"
            >
              <div className="flex justify-center mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-semibold text-green-800 mb-4">{benefit.title}</h3>
              <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Témoignages Section */}
      <div className="mt-16 bg-white p-12 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-green-900 text-center mb-12">Avis des Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md border border-green-100 text-center bg-green-50"
            >
              <h3 className="text-lg font-bold text-green-800">{testimonial.name}</h3>
              <div className="flex justify-center gap-1 my-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBenefits;

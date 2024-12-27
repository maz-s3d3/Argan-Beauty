import React from 'react';
import bb from '../image/logo.jpg';
import CC from '../image/v1.jpg';
import l from '../image/v3.jpg';
import image from '../image/'
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
  
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
    {/* Image à gauche */}
    <div className="flex-shrink-0">
      <img 
        src="https://via.placeholder.com/400" 
        alt="Notre expérience" 
        className="rounded-xl shadow-lg w-full md:w-[400px] object-cover"
      />
    </div>

    {/* Texte à droite */}
    <div className="text-center md:text-left">
      <h3 className="text-3xl font-semibold text-green-800 mb-4">
        Une Expertise Reconnue
      </h3>
      <p className="text-gray-700 leading-relaxed">
        Depuis plus de 10 ans, nous avons collaboré avec des experts et des 
        professionnels de divers domaines pour offrir des solutions innovantes 
        et des produits de qualité. Nos expériences incluent des partenariats 
        stratégiques avec des marques internationales, la création de solutions 
        durables et le développement de produits certifiés pour répondre aux 
        besoins de nos clients.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Nous sommes fiers d'avoir reçu des distinctions et certifications pour 
        notre engagement envers l'excellence et l'innovation dans le secteur des 
        soins naturels et biologiques.
      </p>
    </div>
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

import React from 'react';
import bb from '../image/logo.jpg';
import CC from '../image/v1.jpg';
import l from '../image/v3.jpg';
import { Award, Globe, Heart, Shield } from 'lucide-react';

const PartnersBenefits = () => {
  const partners = [
    { logo: bb, name: 'Partenaire 1', description: 'Collaboration stratégique' },
    { logo: CC, name: 'Partenaire 2', description: 'Innovation conjointe' },
    { logo: l, name: 'Partenaire 3', description: 'Support technologique' }
  ];

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

  return (
    <section className="container mx-auto py-16 px-4">
      {/* Partenaires Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-green-900 mb-8">Nos Partenaires Stratégiques</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="h-20 w-auto object-contain mb-4 grayscale group-hover:grayscale-0 transition-all"
                loading="lazy"
              />
              <p className="text-green-800 font-semibold">{partner.name}</p>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
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

      {/* Certification et Reconnaissance */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center bg-green-100 p-6 rounded-xl shadow-lg">
          <Award className="w-16 h-16 text-green-700 mr-6" />
          <div className="text-left">
            <h3 className="text-2xl font-extrabold text-green-900">Certifications et Prix</h3>
            <p className="text-green-800">
              Reconnu pour l'excellence et l'innovation dans les produits de beauté naturels
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersBenefits;

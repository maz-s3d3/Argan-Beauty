import React from 'react';
import { Leaf, Shield, Truck, Globe } from 'lucide-react';

const Marekting = () => {
  const features = [
    {
      icon: <Leaf color="#10B981" size={31} />,
      title: "100% Naturel",
      description: "Huile d'argan pure, extraite traditionnellement"
    },
    {
      icon: <Shield color="#10B981" size={31} />,
      title: "Qualité Garantie", 
      description: "Certifié par des laboratoires indépendants"
    },
    {
      icon: <Truck color="#10B981" size={31} />,
      title: "Livraison Rapide",
      description: "Expédition sous 48h dans toute la France"
    },
    {
      icon: <Globe color="#10B981" size={31} />,
      title: "Commerce Équitable",
      description: "Soutien direct aux coopératives marocaines"
    }
  ];

  return (
    <div className="bg-green-50 py-6 my-2  z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="font-bold text-green-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marekting; 
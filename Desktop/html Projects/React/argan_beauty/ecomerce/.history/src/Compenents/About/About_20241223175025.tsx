import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Leaf, 
  Globe, 
  Users, 
  Target, 
  Award, 
  Play, 
  Pause,
  CheckCircle,
  Rocket,
  Zap,
  BookOpen,
  Compass,
  MapPin,
  Star,
  Network,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';
import chouaib from '../../image/v1.jpg';

// Interfaces pour le typage
interface TimelineItem {
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  achievements?: string[];
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface ImpactMetric {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const About: React.FC = () => {
  // États
  const [activeSection, setActiveSection] = useState<'mission' | 'story' | 'team' | 'impact'>('mission');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Configuration de la navigation
  const navigationSections = [
    { 
      key: 'mission', 
      label: 'Notre Mission', 
      icon: <Target className="mr-2" />
    },
    { 
      key: 'story', 
      label: 'Notre Histoire', 
      icon: <BookOpen className="mr-2" />
    },
    { 
      key: 'team', 
      label: 'Notre Équipe', 
      icon: <Users className="mr-2" />
    },
    { 
      key: 'impact', 
      label: 'Notre Impact', 
      icon: <Compass className="mr-2" />
    }
  ];

  // Données de la timeline
  const timeline: TimelineItem[] = [
    {
      year: 2018,
      title: "Première Étincelle",
      description: "Née d'une passion pour résoudre un problème local, notre entreprise a commencé dans un petit garage avec une grande vision.",
      icon: <Leaf className="text-green-600" />,
      achievements: [
        "Concept initial développé",
        "Premier prototype créé",
        "Financement initial obtenu"
      ]
    },
    {
      year: 2020,
      title: "Première Expansion",
      description: "Nous avons lancé notre premier produit qui a révolutionné la façon dont les gens pensent à la durabilité.",
      icon: <Globe className="text-blue-600" />,
      achievements: [
        "Lancement du premier produit écologique",
        "Expansion à 3 nouveaux marchés",
        "Prix de l'innovation technologique"
      ]
    },
    {
      year: 2022,
      title: "Reconnaissance Nationale",
      description: "Récompensés pour notre innovation et notre impact social, nous avons prouvé que business et éthique peuvent aller de pair.",
      icon: <Award className="text-yellow-600" />,
      achievements: [
        "Prix de l'entrepreneuriat social",
        "10 000 clients satisfaits",
        "Partenariats stratégiques établis"
      ]
    }
  ];

  // Membres de l'équipe
  const teamMembers: TeamMember[] = [
    {
      name: "chouaib elhaddad",
      role: "Fondatrice & PDG",
      bio: "Experte en innovation sociale avec 15 ans d'expérience dans le développement durable.",
      image: chouaib,
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahdupont",
        twitter: "https://twitter.com/sarahdupont",
        email: "sarah.dupont@entreprise.com"
      }
    },
    {
      name: "ihab chaouki",
      role: "Fondatrice & PDG",
      bio: "Experte en innovation sociale avec 15 ans d'expérience dans le développement durable.",
      image: "/placeholder-avatar-1.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahdupont",
        twitter: "https://twitter.com/sarahdupont",
        email: "sarah.dupont@entreprise.com"
      }
    },
  
    {
      name: "othmane morphine",
      role: "manager de test",
      bio: "Pionnier technologique passionné par la résolution de problèmes complexes.",
      image: "/placeholder-avatar-2.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/mohammedfassi",
        email: "mohammed.elfassi@entreprise.com"
      }
    },
    {
      name: "saad esfroui",
      role: "Directeure finaniciere",
      bio: "Militante engagée pour le changement positif et l'autonomisation communautaire.",
      image: "/placeholder-avatar-3.jpg",
      socialLinks: {
        twitter: "https://twitter.com/fatimazara",
        email: "fatima.zara@entreprise.com"
      }
    },
    {
      name: "barae hajji",
      role: "Directrice de l'Impact Social",
      bio: "Militante engagée pour le changement positif et l'autonomisation communautaire.",
      image: "/placeholder-avatar-3.jpg",
      socialLinks: {
        twitter: "https://twitter.com/fatimazara",
        email: "fatima.zara@entreprise.com"
      }
    }
  ];

  // Métriques d'impact
  const impactMetrics: ImpactMetric[] = [
    {
      icon: <MapPin className="text-green-600" />,
      value: "+15",
      label: "Régions Couvertes",
      description: "Notre impact s'étend dans plus de 15 régions, touchant des communautés diversifiées."
    },
    {
      icon: <Network className="text-blue-600" />,
      value: "50 000+",
      label: "Personnes Impactées",
      description: "Plus de 50 000 personnes ont bénéficié directement de nos programmes."
    },
    {
      icon: <Star className="text-yellow-600" />,
      value: "7",
      label: "Prix d'Innovation",
      description: "Reconnaissance nationale et internationale pour notre approche innovante."
    }
  ];

  // Valeurs de base
  const coreValues = [
    { 
      name: "Intégrité", 
      description: "Agir avec transparence et honnêteté", 
      icon: <CheckCircle className="text-green-600" /> 
    },
    { 
      name: "Innovation", 
      description: "Repousser constamment les limites", 
      icon: <Rocket className="text-blue-600" /> 
    },
    { 
      name: "Impact", 
      description: "Mesurer le succès par le changement positif", 
      icon: <Zap className="text-yellow-600" /> 
    }
  ];

  // Gestionnaire de la vidéo
  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-9">
      <div className="max-w-7xl mx-auto space-y-16 mt-9">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mt-9">
            Notre Histoire, Notre Mission
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Nous croyons que chaque action, aussi petite soit-elle, peut créer un changement significatif.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mt-8 flex-wrap">
          {navigationSections.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key as any)}
              className={`
                flex items-center px-4 py-2 rounded-full transition-all duration-300
                ${activeSection === section.key 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-green-100'}
              `}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        {/* Contenu dynamique */}
        <div className="bg-white shadow-lg rounded-xl p-8 transition-all">
          {/* Section Mission */}
          {activeSection === 'mission' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  Transformer le Possible en Réalité
                </h2>
                <p className="text-gray-700 space-y-4">
                  Notre mission va au-delà du simple business.
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">
                    Nos Objectifs
                  </h3>
                  <ul className="list-disc pl-5">
                    <li>Promouvoir la durabilité environnementale</li>
                    <li>Autonomiser les communautés locales</li>
                    <li>Innover pour un avenir plus équitable</li>
                  </ul>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Nos Valeurs Fondamentales
                </h3>
                <div className="space-y-3">
                  {coreValues.map(value => (
                    <div key={value.name} className="flex items-center">
                      {value.icon}
                      <div className="ml-3">
                        <h4 className="font-bold text-green-800">{value.name}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section Histoire */}
          {activeSection === 'story' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
                Notre Parcours d'Innovation
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {timeline.map((item) => (
                  <div 
                    key={item.year} 
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center mb-4">
                      {item.icon}
                      <span className="ml-3 text-2xl font-bold text-gray-700">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Équipe */}
          {activeSection === 'team' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
                Notre Équipe Extraordinaire
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div 
                    key={member.name} 
                    className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-green-600"
                    />
                    <h3 className="text-xl font-bold text-green-800">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Impact */}
          {activeSection === 'impact' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
                Notre Impact Mesurable
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {impactMetrics.map((metric) => (
                  <div 
                    key={metric.label}
                    className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all"
                  >
                    <div className="mb-4 flex justify-center">
                      {metric.icon}
                    </div>
                    <h3 className="text-4xl font-extrabold text-green-800 mb-2">
                      {metric.value}
                    </h3>
                    <p className="text-xl font-semibold text-gray-700 mb-3">
                      {metric.label}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
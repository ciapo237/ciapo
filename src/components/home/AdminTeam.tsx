import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

// Import des images
import OYONO from '../../assets/teams/michel.jpg';
import sandrine from '../../assets/teams/SANDRINE.png';
import Charly from '../../assets/teams/CHARLY.png';
import marie from '../../assets/teams/MARIE.png';
import Nickson from '../../assets/teams/NICKSON.jpeg';
import Yaya from '../../assets/teams/YAYA.png';
import Frederic from '../../assets/teams/Frederic.png';
import Fadi from '../../assets/teams/Fadi.png';
import Boris from '../../assets/teams/BORIS.png';
import Florence from '../../assets/teams/FLORENCE.png';
import Bell from '../../assets/teams/Bell.png';
import Marc from '../../assets/teams/marc.png';
import Yvette from '../../assets/teams/yvette.jpg';

const AdminTeam: React.FC = () => {
  const team = [
    {
      name: 'M. Oyono Platini Michel',
      role: 'Directeur Général',
      image: OYONO,
      bio: 'Chef d\'entreprise promoteur CIAPO, président du conseil d\'administration',
      email: 'ciapocoopca@gmail.com',
      phone: '+237 621 752 020',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'Mme. Ngo Kona Sandrine',
      role: 'Secrétaire Générale',
      image: sandrine,
      bio: 'Secrétaire Générale à CIAPO',
      email: 'ciapocoopca@gmail.com',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'M. Gamogha Djantcha Geldas Nickson',
      role: 'Directeur De Projet',
      image: Nickson,
      bio: 'Ingénieur du Génie Rural à CIAPO-COOP-CA',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Bafoussam, Ouest Cameroun'
    },
    {
      name: 'M. TATCHOU Marc',
      role: 'Directeur des Systèmes d\'Information',
      image: Marc,
      bio: 'Responsable informatique à CIAPO-COOP-CA',
      email: 'marctatchou32@gmailcom',
      phone: '+32 465 57 92 23',
      linkedin: 'https://www.linkedin.com/in/marc-tatchou-85891a243/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BDjTzZPQ8Rl2ovbdVVGRzQQ%3D%3D',
      location: 'Alost, Belgique (UE)'
    },
    {
      name: 'M. Ndzana Franky Charly',
      role: 'Directeur Technique',
      image: Charly,
      bio: 'MSc en Analyse Agroenvironnement / Ingénieur Agroeconomiste',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Yaoundé, Centre Cameroun'
    },
    {
      name: 'Mme. Kowssima Marly Yaya',
      role: 'Expert Agronome',
      image: Yaya,
      bio: 'Ingénieur agronome option : Production Animale et Aquaculture',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Douala, Littoral Cameroun'
    },
    {
      name: 'M. MISSINAI Frédéric',
      role: 'Chef Service',
      image: Frederic,
      bio: 'Ingénieur de conception en production végétale',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Garoua, Nord Cameroun'
    },
    {
      name: 'Mme. Evina Marie Noëlle E.',
      role: 'Présidente du Conseil de Surveillance',
      image: marie,
      bio: 'Présidente du Conseil de Surveillance à CIAPO',
      email: 'ciapocoopca@gmail.com',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'Mme. NEBA Yvette NGENEFORM',
      role: 'Secrétaire de DIrection',
      image: Yvette,
      bio: 'Secrétaire de Direction Bilingue à CIAPO',
      email: 'ciapocoopca@gmail.com',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'Mme. Fadi Haman',
      role: 'Directrice Commerciale',
      image: Fadi,
      bio: 'Ingénieur Agronome, Spécialité: Économie Agricole et Management des Entreprises',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'M. Ndongo Mve Andre Boris',
      role: 'Informaticien',
      image: Boris,
      bio: 'Infographiste et Maintenancier informatique',
      email: 'technique@ciapo-coop-ca.org',
      phone: '+237 652 498 313',
      linkedin: 'https://linkedin.com',
      location: 'Ebolowa, Sud Cameroun'
    },
    {
      name: 'Mme. Florence Eba Metende',
      role: 'Expert Informaticienne',
      image: Florence,
      bio: 'Ingénieur Informaticienne / Développeuse',
      email: 'developpeur@ciapo-coop-ca.org',
      phone: '+237 691 918 168',
      linkedin: 'https://linkedin.com',
      location: 'Douala, Littoral Cameroun'
    },
    {
      name: 'Mme. Romane Brigitte Bell',
      role: 'Gestionnaire restaurant et pâtisserie',
      image: Bell,
      bio: 'Experte en restauration et boulangerie internationale',
      email: 'ciapocoopca@gmail.com',
      phone: '',
      linkedin: 'https://linkedin.com',
      location: 'Yaoundé, Centre Cameroun'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= team.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? team.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleTeam = team.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle 
          title="Notre Équipe Administrative" 
          subtitle="Professionnels dédiés au développement agricole et à la formation entrepreneuriale"
          centered
        />

        {/* Version Desktop - Carrousel */}
        <div className="hidden md:block relative">
          <div className="flex items-center justify-center space-x-6 overflow-hidden">
            {visibleTeam.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                className="flex-shrink-0 w-72"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary-300">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-neutral-600 mb-4 line-clamp-3">{member.bio}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-neutral-600">
                        <Mail size={16} className="mr-2 flex-shrink-0" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary-600 truncate">
                          {member.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center text-neutral-600">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        <a href={`tel:${member.phone}`} className="hover:text-primary-600">
                          {member.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center text-neutral-600">
                        <MapPin size={16} className="mr-2 flex-shrink-0" />
                        <span>{member.location}</span>
                      </div>
                      
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-800 mt-2"
                      >
                        <Linkedin size={16} className="mr-2" />
                        Voir le profil LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors z-10"
            aria-label="Précédent"
          >
            <ChevronLeft size={24} className="text-primary-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors z-10"
            aria-label="Suivant"
          >
            <ChevronRight size={24} className="text-primary-600" />
          </button>
        </div>

        {/* Version Mobile - Grille */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="col-span-1"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="relative h-60">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary-300">{member.role}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-neutral-600">
                      <Mail size={14} className="mr-2 flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary-600 truncate">
                        {member.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-600">
                      <Phone size={14} className="mr-2 flex-shrink-0" />
                      <a href={`tel:${member.phone}`} className="hover:text-primary-600">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indicateurs de pagination (desktop) */}
        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(team.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-3 h-3 rounded-full ${currentIndex === index * itemsPerPage ? 'bg-primary-600' : 'bg-neutral-300'}`}
              aria-label={`Aller à la page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminTeam;
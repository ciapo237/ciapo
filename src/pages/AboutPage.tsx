import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, ChevronRight, MapPin } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import { locations, missions } from '../data/mockData';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'À Propos | CIAPO COOP-CA';
  }, []);

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="flex items-center text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-neutral-300">Accueil</span>
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
              <span className="text-white font-medium">À Propos</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Former la Nouvelle Génération d'Agriculteurs
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl mb-8 text-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              CIAPO-COOP-CA est une coopérative agropastorale qui accompagne les jeunes dans toutes ses dimensions.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Qui somme nous?</h2>
              <p className="text-neutral-600 mb-6">
              CIAPO-COOP-CA est une coopérative agropastorale qui accompagne les jeunes dans toutes ses dimensions.              
              </p>
              <p className="text-neutral-600 mb-6">
              Nous offrons des cours en vidéo conférence et sur site           
              </p>
              <ul className="space-y-4">
                {[
                  "Formation pratique en agropastoral (élevage, cultures, gestion de projets).",
                  "Services conseils : Orientation professionnelle, implantation de projets, suivi technique.",
                  "Production agricole : Cacao, soja, banane, tomate, manioc, maïs, arachides, palmier à huile, produits maraîchers, céréales, etc.",
                  "Élevage & pisciculture : Aviculture, apiculture, aquaculture, escargots, etc. Protection de l’environnement et agroécologie.",
                  "Lutter contre le chômage, l’exode rural et les risques sociaux (délinquance, grossesses précoces, etc.).",
                  "Renforcer l’autonomie financière pour soutenir les familles et briser le cycle de la pauvreté."
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Formation agricole" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-neutral-600">années d'expérience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Missions" 
            subtitle="Des services complets pour le développement des métiers d'avenir"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  {/* <mission.icon size={32} className="text-primary-600" /> */}
                  <img 
                    src={mission.imageUrl} 
                    alt={mission.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
                <p className="text-neutral-600">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Impact" 
            subtitle="Des résultats concrets pour le développement des métiers d'avenir"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Users,
                number: "1000+",
                label: "Agriculteurs formés",
                description: "Jeunes entrepreneurs accompagnés vers le succès"
              },
              {
                icon: Target,
                number: "85%",
                label: "Taux de réussite",
                description: "De nos diplômés gèrent leur propre exploitation"
              },
              {
                icon: Award,
                number: "15",
                label: "Programmes",
                description: "Formations spécialisées dans différents domaines"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                  <stat.icon size={32} className="text-primary-600" />
                </div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-neutral-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Centres de Formation" 
            subtitle="Des installations modernes pour une formation pratique"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <div className="flex items-start mb-4">
                    <MapPin size={20} className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-neutral-600">{location.address}</p>
                      <p className="text-neutral-600">{location.city}, {location.region}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>📞 {location.phone}</p>
                    <p>✉️ {location.email}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 opacity-90"></div>
        
        <motion.div 
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white opacity-5"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        ></motion.div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez-nous dans cette aventure agricole
            </h2>
            <p className="text-lg mb-8 text-neutral-100">
              Ensemble, construisons l'avenir de l'agriculture camerounaise. Formez-vous, innovez et réussissez avec CIAPO COOP-CA.
            </p>
            <button className="button bg-white text-primary-700 hover:bg-neutral-100">
              Contactez-nous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
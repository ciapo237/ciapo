import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { programs } from '../data/mockData';
import SectionTitle from '../components/shared/SectionTitle';
import ProgramCard from '../components/programs/ProgramCard';

const ProgramsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Nos Programmes | CIAPO COOP-CA';
  }, []);

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Nos Programmes de Formation
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl mb-8 text-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Découvrez nos formations complètes pour devenir un entrepreneur agricole qualifié. Des programmes adaptés à vos besoins et au marché actuel.
            </motion.p>
            
            <motion.div 
              className="flex items-center text-neutral-200 text-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span>Accueil</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-white font-medium">Nos Programmes</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Programmes Disponibles" 
            subtitle="Des formations adaptées à tous les niveaux et objectifs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} program={program} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <SectionTitle 
            title="Pourquoi Choisir Nos Formations ?" 
            subtitle="Des avantages concrets pour votre réussite"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Expertise Reconnue',
                description: 'Formateurs qualifiés avec une expérience terrain',
                icon: '🎓'
              },
              {
                title: 'Formation Pratique',
                description: 'Plus de 70% du temps en situation réelle',
                icon: '🌱'
              },
              {
                title: 'Accompagnement',
                description: 'Suivi personnalisé pendant et après la formation',
                icon: '🤝'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
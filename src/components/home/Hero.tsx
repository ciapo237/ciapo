import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 lg:pt-36 xl:pt-44 overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
          style={{ backgroundPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pb-24 lg:pb-36 xl:pb-44">
        <div className="max-w-4xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Rejoignez-nous aux Salons des Métiers d'Avenir
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-snug">
              Apprenez les nouvelles technologies avec notre groupe d'experts CIAPO
              <span className="block text-primary-300 mt-2 text-xl">
                (Jeune réussit grâce à la force du nombre)
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg sm:text-xl text-neutral-100 leading-relaxed">
              La Coopérative Internationale d'Amélioration Professionnelle et d'Orientation (CIAPO) 
              vous invite à découvrir les opportunités qui façonneront votre avenir !
            </p>
            
            <p className="text-lg sm:text-xl text-neutral-100 leading-relaxed">
              Nous accompagnons la jeunesse vers l'excellence professionnelle en facilitant le montage 
              de projets innovants, proposant des formations adaptées aux réalités du terrain, et créant 
              des ponts stratégiques entre compétences et opportunités.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="font-bold text-2xl mb-4 text-primary-300">Nos avantages</h3>
            <ul className="space-y-3">
              {[
                "Délivrance d'un certificat de participation",
                "Assurance risque pour les exercices pratiques terrain",
                "Pause déjeuner offerte pendant les séminaires"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="flex-shrink-0 mt-1 mr-3 text-primary-400" size={20} />
                  <span className="text-lg text-neutral-100">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <p className="text-lg sm:text-xl text-neutral-100 mb-8 leading-relaxed">
              Découvrez nos programmes d'actions collectives avec nos experts et partenaires. 
              Contactez-nous pour des prestations de services sur vos projets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/programs" 
                className="button-primary group flex items-center"
              >
                Découvrir nos programmes
                <ChevronRight 
                  size={18} 
                  className="ml-1 transition-transform group-hover:translate-x-1" 
                />
              </Link>
              
              <Link 
                to="/elearning" 
                className="button-secondary bg-white text-primary-600 hover:bg-neutral-50"
              >
                Formation en ligne
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-0" />
    </section>
  );
};

export default Hero;
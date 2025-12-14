import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Users, Award, Coffee, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background avec overlay amélioré */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundPosition: 'center 30%',
            transform: 'scale(1.1)',
            transition: 'transform 10s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_80%)]" />
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche - Titre et description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mt-12 md:mt-0 mb-6"
            >
              <Users size={16} className="text-primary-300" />
              <span className="text-sm font-medium">Jeune réussit grâce à la force du nombre</span>
            </motion.div>

            {/* Titre principal */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-2">
              <span className="block mb-2">Salons des</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">
                Métiers d'Avenir
              </span>
            </h1>

            {/* Sous-titre */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 leading-snug">
              Apprenez les nouvelles technologies avec notre groupe d'experts CIAPO
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-neutral-100 leading-relaxed">
                La Coopérative Internationale d'Amélioration Professionnelle et d'Orientation (CIAPO) 
                vous invite à découvrir les opportunités qui façonneront votre avenir !
              </p>
              <p className="text-lg text-neutral-100 leading-relaxed">
                Nous accompagnons la jeunesse vers l'excellence professionnelle grâce à des formations 
                adaptées et un réseau d'experts dédiés.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link 
                to="/programs" 
                className="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Découvrir nos programmes
                <ChevronRight 
                  size={20} 
                  className="transition-transform group-hover:translate-x-1" 
                />
              </Link>
              
              <Link 
                to="/elearning" 
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl border border-white/20 flex items-center justify-center"
              >
                Formation en ligne
              </Link>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Avantages et détails */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Carte des avantages */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                <Award className="text-primary-300" />
                Vos avantages exclusifs
              </h3>
              
              <div className="space-y-1">
                {[
                  {
                    icon: Award,
                    title: "Certificat de participation",
                    description: "Valorisez votre parcours avec une attestation officielle"
                  },
                  {
                    icon: Shield,
                    title: "Assurance risque terrain",
                    description: "Protégé pendant tous vos exercices pratiques"
                  },
                  {
                    icon: Coffee,
                    title: "Pause déjeuner offerte",
                    description: "Profitez de moments conviviaux pendant les séminaires"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <item.icon className="text-primary-300" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>
                      <p className="text-neutral-200 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Citation/Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-primary-600/30 to-primary-800/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary-400/30"
            >
              <p className="text-lg sm:text-xl text-white italic leading-relaxed">
                "Découvrez nos programmes d'actions collectives avec nos experts et partenaires. 
                Contactez-nous pour des prestations de services sur vos projets."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-10 h-[2px] bg-primary-300"></div>
                <span className="text-primary-200 font-medium">CIAPO Team</span>
              </div>
            </motion.div>

            {/* Stats ou infos rapides */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "100+", label: "Experts" },
                { value: "50+", label: "Formations" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary-300">{stat.value}</div>
                  <div className="text-sm text-neutral-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
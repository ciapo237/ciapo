import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, AlignCenterVertical as Certificate, ChevronRight } from 'lucide-react';

const ELearningHero: React.FC = () => {
  return (
    <section className="pt-24 mt-20 lg:pt-32 relative">
      <div className="absolute inset-0 bg-elearning-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
      </div>
      
      <div className="container-custom relative z-10 pb-20 lg:pb-32">
        <div className="max-w-3xl text-white">
          <motion.span
            className="inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Plateforme E-Learning CIAPO COOP-CA
          </motion.span>
          
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Apprenez l'agriculture à votre rythme, où que vous soyez
          </motion.h1>
          
          <motion.p 
            className="text-lg lg:text-xl mb-8 text-neutral-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Notre plateforme de formation en ligne vous offre un accès aux meilleures formations en agriculture avec des vidéos interactives, des quiz et un suivi personnalisé.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/elearning/courses" className="button-primary">
              Parcourir les cours
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <Link to="/elearning/register" className="button bg-white text-primary-600 hover:bg-neutral-100">
              Créer un compte
            </Link>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="container-custom relative z-10 -mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <BookOpen size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cours Interactifs</h3>
                <p className="text-neutral-600">Vidéos, quiz et forums de discussion</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Webinaires en Direct</h3>
                <p className="text-neutral-600">Sessions avec des experts agricoles</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <Certificate size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Certificats Reconnus</h3>
                <p className="text-neutral-600">Valorisez vos compétences acquises</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-0"></div>
    </section>
  );
};

export default ELearningHero;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 opacity-90"></div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white opacity-5"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white opacity-5"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      ></motion.div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Prêt à Transformer l'Agriculture en Opportunité d'Affaires ?
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-8 text-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Rejoignez nos programmes de formation et devenez un entrepreneur agricole qualifié. Nous vous accompagnons de la formation à la commercialisation.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/contact" className="button bg-white text-primary-700 hover:bg-neutral-100">
              S'inscrire maintenant
              <ArrowRight size={18} className="ml-1" />
            </Link>
            <Link to="/elearning" className="button bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10">
              Découvrir l'e-learning
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
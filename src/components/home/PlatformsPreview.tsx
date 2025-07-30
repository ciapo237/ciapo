import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

const PlatformsPreview: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* E-Learning Platform */}
          <motion.div 
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-elearning-pattern bg-cover bg-center">
              <div className="absolute inset-0 bg-primary-900 bg-opacity-80 group-hover:bg-opacity-70 transition-all duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="p-3 bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen size={28} className="text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Plateforme E-Learning
              </h3>
              
              <p className="text-neutral-100 mb-8 max-w-md">
                Accédez à nos formations en ligne où que vous soyez. Apprenez à votre rythme avec des cours vidéos, des ressources et un suivi personnalisé.
              </p>
              
              <ul className="mb-8 space-y-2">
                {['Cours vidéo', 'Webinaires en direct', 'Quiz et évaluations', 'Certificats reconnus'].map((item, i) => (
                  <li key={i} className="flex items-center text-neutral-100">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link to="/elearning" className="button bg-white text-primary-700 hover:bg-neutral-100 group-hover:translate-y-0 translate-y-0 transition-transform">
                Accéder à la plateforme
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </motion.div>
          
          {/* Marketplace Platform */}
          <motion.div 
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-marketplace-pattern bg-cover bg-center">
              <div className="absolute inset-0 bg-secondary-700 bg-opacity-80 group-hover:bg-opacity-70 transition-all duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="p-3 bg-accent-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Marketplace Agricole
              </h3>
              
              <p className="text-neutral-100 mb-8 max-w-md">
                Notre marketplace met en relation les agriculteurs et les acheteurs. Vendez vos produits et achetez des équipements directement sur la plateforme.
              </p>
              
              <ul className="mb-8 space-y-2">
                {['Vente de produits agricoles', 'Location d\'équipements', 'Réseau d\'entraide', 'Paiements sécurisés'].map((item, i) => (
                  <li key={i} className="flex items-center text-neutral-100">
                    <span className="w-2 h-2 bg-accent-300 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link to="/marketplace" className="button bg-white text-secondary-700 hover:bg-neutral-100 group-hover:translate-y-0 translate-y-0 transition-transform">
                Visiter la marketplace
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformsPreview;
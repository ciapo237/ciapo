import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Handshake, Search, ChevronRight } from 'lucide-react';

const MarketplaceHero: React.FC = () => {
  return (
    <section className="pt-24 mt-20 lg:pt-32 relative">
      <div className="absolute inset-0 bg-marketplace-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-secondary-700"></div>
      </div>
      
      <div className="container-custom relative z-10 pb-20 lg:pb-32">
        <div className="max-w-3xl text-white">
          <motion.span
            className="inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Marketplace Agricole CIAPO COOP-CA
          </motion.span>
          
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Achetez et vendez des produits agricoles locaux
          </motion.h1>
          
          <motion.p 
            className="text-lg lg:text-xl mb-8 text-neutral-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Notre marketplace met en relation les producteurs et les acheteurs. Trouvez des produits frais, des équipements agricoles et des services spécialisés.
          </motion.p>
          
          <motion.div 
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Rechercher des produits, services ou équipements..."
              className="w-full px-5 py-4 pr-12 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/marketplace/products" className="button bg-accent-500 hover:bg-accent-600 text-white">
              Voir les produits
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <Link to="/marketplace/services" className="button bg-white text-secondary-700 hover:bg-neutral-100">
              Voir les services
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
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <ShoppingBag size={24} className="text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Produits Frais</h3>
                <p className="text-neutral-600">Directement des producteurs locaux</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <Truck size={24} className="text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Livraison Rapide</h3>
                <p className="text-neutral-600">Livraison dans toute la région</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <Handshake size={24} className="text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Réseau d'Entraide</h3>
                <p className="text-neutral-600">Échangez services et conseils</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-0"></div>
    </section>
  );
};

export default MarketplaceHero;
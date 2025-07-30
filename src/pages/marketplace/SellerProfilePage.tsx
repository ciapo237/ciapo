import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { products } from '../../data/mockData';
import ProductCard from '../../components/marketplace/ProductCard';

const SellerProfilePage: React.FC = () => {
  const { id } = useParams();
  const sellerProducts = products.filter(product => product.seller.id === id);
  const seller = sellerProducts[0]?.seller;

  if (!seller) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Vendeur non trouvé</h1>
        <Link to="/marketplace" className="text-secondary-600 hover:text-secondary-700">
          Retour à la marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32">
      <div className="container-custom">
        <motion.div 
          className="flex items-center text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-neutral-500 hover:text-neutral-700">Accueil</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/marketplace" className="text-neutral-500 hover:text-neutral-700">Marketplace</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium">{seller.name}</span>
        </motion.div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">{seller.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <Star size={20} className="text-yellow-400" />
                  <span className="ml-1 font-medium">{seller.rating}</span>
                </div>
                <span className="mx-3 text-neutral-300">|</span>
                <div className="flex items-center text-neutral-600">
                  <MapPin size={20} className="mr-1" />
                  {seller.location}
                </div>
              </div>
              
              <p className="text-neutral-600 mb-8">
                Producteur local spécialisé dans la culture et la distribution de produits agricoles de qualité.
              </p>
              
              <div className="flex gap-4">
                <button className="flex-1 button-secondary">
                  <Phone size={20} className="mr-2" />
                  Contacter
                </button>
                <button className="flex-1 button-outline">
                  <Mail size={20} className="mr-2" />
                  Message
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-50 p-6 rounded-lg"
            >
              <h3 className="font-semibold mb-4">Informations</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin size={20} className="text-neutral-500 mr-3" />
                  <span>{seller.location}</span>
                </li>
                <li className="flex items-center">
                  <Star size={20} className="text-neutral-500 mr-3" />
                  <span>{seller.rating} étoiles sur 5</span>
                </li>
                <li className="flex items-center">
                  <ExternalLink size={20} className="text-neutral-500 mr-3" />
                  <span>Membre depuis Janvier 2025</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Produits du vendeur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} delay={index * 0.1} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerProfilePage;
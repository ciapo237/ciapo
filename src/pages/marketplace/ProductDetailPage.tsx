import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Mail, ShoppingBag, ChevronRight } from 'lucide-react';
import { products } from '../../data/mockData';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  React.useEffect(() => {
    if (product) {
      document.title = `${product.name} | Marketplace CIAPO COOP-CA`;
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link to="/marketplace/products" className="text-secondary-600 hover:text-secondary-700">
          Retour aux produits
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
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <Star size={20} className="text-yellow-400" />
                <span className="ml-1 font-medium">{product.seller.rating}</span>
              </div>
              <span className="mx-3 text-neutral-300">|</span>
              <div className="flex items-center text-neutral-600">
                <MapPin size={20} className="mr-1" />
                {product.seller.location}
              </div>
            </div>
            
            <p className="text-neutral-600 mb-8">{product.description}</p>
            
            <div className="mb-8">
              <div className="text-3xl font-bold text-secondary-700 mb-2">
                {product.price.toLocaleString()} FCFA
                <span className="text-base text-neutral-500 ml-2">/{product.unit}</span>
              </div>
              {product.available ? (
                <span className="text-success-500">En stock</span>
              ) : (
                <span className="text-error-500">Rupture de stock</span>
              )}
            </div>
            
            <div className="p-6 bg-neutral-50 rounded-lg mb-8">
              <h3 className="font-semibold mb-4">Vendeur</h3>
              <Link 
                to={`/marketplace/sellers/${product.seller.id}`}
                className="flex items-center hover:bg-neutral-100 p-3 rounded-lg transition-colors"
              >
                <div className="flex-grow">
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-neutral-500">{product.seller.location}</p>
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </Link>
            </div>
            
            <button className="button-secondary w-full mb-4">
              <ShoppingBag size={20} className="mr-2" />
              Commander maintenant
            </button>
            
            <div className="flex gap-4">
              <button className="flex-1 button-outline">
                <Phone size={20} className="mr-2" />
                Contacter
              </button>
              <button className="flex-1 button-outline">
                <Mail size={20} className="mr-2" />
                Message
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
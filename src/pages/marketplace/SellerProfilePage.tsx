import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Phone, Mail, ExternalLink, ChevronRight, 
  Heart, Shield, Award, Calendar, Users, Truck, Clock 
} from 'lucide-react';
import { products } from '../../data/mockData';
import ProductCard from '../../components/marketplace/ProductCard';
import Rating from '../../components/ui/Rating';
import ContactModal from '../../components/marketplace/ContactModal';

const SellerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sellerProducts = products.filter(product => product.seller.id === id);
  const seller = sellerProducts[0]?.seller;
  const [activeTab, setActiveTab] = useState<string>('products');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactMethod, setContactMethod] = useState<'phone' | 'message' | null>(null);

  if (!seller) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Vendeur non trouvé</h1>
        <Link 
          to="/marketplace" 
          className="text-secondary-600 hover:text-secondary-700 inline-flex items-center"
        >
          Retour à la marketplace
        </Link>
      </div>
    );
  }

  const handleContactClick = (method: 'phone' | 'message') => {
    setContactMethod(method);
    setIsContactModalOpen(true);
  };

  // Calculer les statistiques du vendeur
  const totalProducts = sellerProducts.length;
  const availableProducts = sellerProducts.filter(p => p.available).length;
  const organicProducts = sellerProducts.filter(p => p.organic).length;

  return (
    <div className="pt-28 pb-16 bg-neutral-50 min-h-screen">
      {/* Bannière de couverture */}
      <div className="h-48 w-full bg-gradient-to-r from-white/10 to-primary-500">
        {seller.coverImage ? (
          <img 
            src={seller.coverImage} 
            alt={`Bannière de ${seller.name}`}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      <div className="container-custom -mt-16">
        {/* Fil d'Ariane */}
        <motion.div 
          className="flex items-center text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-neutral-500 hover:text-neutral-700 transition-colors">Accueil</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/marketplace" className="text-neutral-500 hover:text-neutral-700 transition-colors">Marketplace</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate max-w-xs">{seller.name}</span>
        </motion.div>

        {/* En-tête du profil */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center text-3xl font-bold text-secondary-700 border-4 border-white shadow-md">
                    {seller.profileImage ? (
                      <img 
                        src={seller.profileImage} 
                        alt={seller.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      seller.name.charAt(0)
                    )}
                  </div>
                  {seller.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
                      <Shield size={16} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{seller.name}</h1>
                    {seller.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <Shield size={12} className="mr-1" /> Vérifié
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Rating rating={seller.rating} />
                    <span className="ml-2 font-medium">{seller.rating}</span>
                    {seller.reviewCount && (
                      <span className="ml-2 text-neutral-500">({seller.reviewCount} avis)</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-neutral-600 mb-4">
                    <MapPin size={18} className="mr-2" />
                    {seller.location}
                  </div>
                  
                  {seller.specialty && seller.specialty.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {seller.specialty.map((item, index) => (
                        <span 
                          key={index}
                          className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-neutral-600 my-6">
                {seller.description || "Producteur local spécialisé dans la culture et la distribution de produits agricoles de qualité."}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => handleContactClick('phone')}
                  className="flex-1 button-secondary py-3"
                >
                  <Phone size={20} className="mr-2" />
                  Contacter
                </button>
                <button 
                  onClick={() => handleContactClick('message')}
                  className="flex-1 button-outline py-3"
                >
                  <Mail size={20} className="mr-2" />
                  Message
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-50 p-6 rounded-lg md:max-w-xs"
            >
              <h3 className="font-semibold mb-4 text-lg">Informations du vendeur</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin size={18} className="text-neutral-500 mr-3" />
                  <span>{seller.location}</span>
                </li>
                <li className="flex items-center">
                  <Star size={18} className="text-neutral-500 mr-3" />
                  <span>{seller.rating}/5 • {seller.reviewCount} avis</span>
                </li>
                {seller.joinDate && (
                  <li className="flex items-center">
                    <Calendar size={18} className="text-neutral-500 mr-3" />
                    <span>Membre depuis {new Date(seller.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                  </li>
                )}
                {seller.totalSales && (
                  <li className="flex items-center">
                    <Users size={18} className="text-neutral-500 mr-3" />
                    <span>{seller.totalSales} ventes effectuées</span>
                  </li>
                )}
                {seller.responseRate && (
                  <li className="flex items-center">
                    <Clock size={18} className="text-neutral-500 mr-3" />
                    <span>{seller.responseRate}% de réponse • {seller.responseTime}</span>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Statistiques du vendeur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <div className="text-3xl font-bold text-secondary-700 mb-2">{totalProducts}</div>
            <div className="text-neutral-600">Produits au total</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <div className="text-3xl font-bold text-secondary-700 mb-2">{availableProducts}</div>
            <div className="text-neutral-600">Produits disponibles</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <div className="text-3xl font-bold text-secondary-700 mb-2">{organicProducts}</div>
            <div className="text-neutral-600">Produits bio</div>
          </motion.div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="flex space-x-8">
            {['products', 'reviews', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-secondary-500 text-secondary-700'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab === 'products' && 'Produits'}
                {tab === 'reviews' && 'Avis'}
                {tab === 'about' && 'À propos'}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'products' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Produits du vendeur</h2>
            {sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellerProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    delay={index * 0.1} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-neutral-500">Ce vendeur n'a pas encore de produits disponibles.</p>
              </div>
            )}
          </motion.section>
        )}

        {activeTab === 'reviews' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Avis des clients</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-neutral-500">Section avis en cours de développement.</p>
            </div>
          </motion.section>
        )}

        {activeTab === 'about' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">À propos du vendeur</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="prose max-w-none">
                <p className="text-neutral-600 mb-4">
                  {seller.description || "Producteur local spécialisé dans la culture et la distribution de produits agricoles de qualité."}
                </p>
                
                <h3 className="font-semibold text-lg mb-3">Engagements</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Award size={18} className="text-secondary-600 mr-2 mt-1 flex-shrink-0" />
                    <span>Produits cultivés localement avec des méthodes durables</span>
                  </li>
                  <li className="flex items-start">
                    <Truck size={18} className="text-secondary-600 mr-2 mt-1 flex-shrink-0" />
                    <span>Livraison rapide et soignée dans toute la région</span>
                  </li>
                  <li className="flex items-start">
                    <Shield size={18} className="text-secondary-600 mr-2 mt-1 flex-shrink-0" />
                    <span>Garantie de satisfaction sur tous les produits</span>
                  </li>
                </ul>
                
                <h3 className="font-semibold text-lg mb-3">Méthodes de production</h3>
                <p className="text-neutral-600">
                  Notre exploitation privilégie les méthodes agricoles respectueuses de l'environnement, 
                  avec une attention particulière portée à la santé des sols et à la biodiversité.
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* Modal de contact */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        seller={seller}
        method={contactMethod}
      />
    </div>
  );
};

export default SellerProfilePage;
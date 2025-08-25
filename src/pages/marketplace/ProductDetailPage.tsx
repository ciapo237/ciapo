import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Phone, Mail, ShoppingBag, ChevronRight, 
  Heart, Minus, Plus, Shield, Truck, ArrowLeft, Check 
} from 'lucide-react';
import { products } from '../../data/mockData';

// Types améliorés
interface Seller {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalSales?: number;
  joinedDate?: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageGallery?: string[];
  category: string;
  unit: string;
  available: boolean;
  seller: Seller;
  variants?: ProductVariant[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  harvestDate?: string;
  organic?: boolean;
  minOrder?: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id) as Product | undefined;
  
  // États pour la gestion de l'interface
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  React.useEffect(() => {
    if (product) {
      document.title = `${product.name} | Marketplace CIAPO COOP-CA`;
      setActiveImage(product.imageUrl);
      
      // Sélectionner la première variante par défaut si elle existe
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].id);
      }
    }
  }, [product]);

  const handleQuantityChange = (change: number) => {
    const minOrder = product?.minOrder || 1;
    const newQuantity = quantity + change;
    if (newQuantity >= minOrder) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Simulation d'ajout au panier
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getCurrentPrice = (): number => {
    if (product?.variants && selectedVariant) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant ? variant.price : product.price;
    }
    return product?.price || 0;
  };

  const getCurrentVariant = (): ProductVariant | undefined => {
    if (product?.variants && selectedVariant) {
      return product.variants.find(v => v.id === selectedVariant);
    }
    return undefined;
  };

  if (!product) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link 
          to="/marketplace/products" 
          className="text-secondary-600 hover:text-secondary-700 inline-flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux produits
        </Link>
      </div>
    );
  }

  const currentVariant = getCurrentVariant();
  const currentPrice = getCurrentPrice();
  const isVariantAvailable = currentVariant ? currentVariant.available : product.available;
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="pt-28 pb-16 bg-neutral-50 min-h-screen">
      <div className="container-custom">
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
          <Link to={`/marketplace?category=${product.category}`} className="text-neutral-500 hover:text-neutral-700 transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Galerie d'images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6"
          >
            <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-4">
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart 
                  size={24} 
                  className={isFavorite ? "fill-rose-500 text-rose-500" : "text-neutral-400"} 
                />
              </button>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-error-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{discount}%
                </div>
              )}
            </div>
            
            {product.imageGallery && product.imageGallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                <button 
                  onClick={() => setActiveImage(product.imageUrl)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${activeImage === product.imageUrl ? 'border-secondary-500' : 'border-neutral-200'}`}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                {product.imageGallery.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${activeImage === img ? 'border-secondary-500' : 'border-neutral-200'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Détails du produit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>
              {product.organic && (
                <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Check size={14} className="mr-1" /> Bio
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {product.harvestDate && (
              <p className="text-neutral-500 text-sm mb-4">
                Récolté le {new Date(product.harvestDate).toLocaleDateString('fr-FR')}
              </p>
            )}
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={20} 
                    className={star <= (product.rating || product.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"} 
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating || product.seller.rating}</span>
                {product.reviewCount && (
                  <span className="ml-2 text-neutral-500">({product.reviewCount} avis)</span>
                )}
              </div>
              <span className="mx-3 text-neutral-300">|</span>
              <div className="flex items-center text-neutral-600">
                <MapPin size={18} className="mr-1" />
                {product.seller.location}
              </div>
            </div>
            
            <p className="text-neutral-600 mb-6 leading-relaxed">{product.description}</p>
            
            {product.detailedDescription && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description détaillée</h3>
                <p className="text-neutral-600 text-sm">{product.detailedDescription}</p>
              </div>
            )}
            
            {/* Variantes de produit */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Options disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.available}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                          : variant.available
                            ? 'border-neutral-300 hover:border-secondary-300 text-neutral-700'
                            : 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {variant.name} {!variant.available && '(Indisponible)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Prix et disponibilité */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-3xl font-bold text-secondary-700">
                  {currentPrice.toLocaleString()} FCFA
                </div>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <div className="ml-3 text-lg text-neutral-500 line-through">
                    {product.originalPrice.toLocaleString()} FCFA
                  </div>
                )}
                <span className="text-base text-neutral-500 ml-2">/{product.unit}</span>
              </div>
              
              <div className="flex items-center">
                {isVariantAvailable ? (
                  <span className="text-success-600 font-medium flex items-center">
                    <Check size={18} className="mr-1" /> En stock
                  </span>
                ) : (
                  <span className="text-error-600 font-medium">Rupture de stock</span>
                )}
                {product.minOrder && product.minOrder > 1 && (
                  <span className="ml-4 text-neutral-500 text-sm">
                    Commande minimum: {product.minOrder} {product.unit}
                  </span>
                )}
              </div>
            </div>
            
            {/* Sélecteur de quantité */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantité:</span>
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= (product.minOrder || 1)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 text-neutral-500 hover:text-neutral-700"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="ml-3 text-neutral-500">{product.unit}</span>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={!isVariantAvailable}
                className="button-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                Ajouter au panier
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 button-outline py-3">
                  <Phone size={20} className="mr-2" />
                  Appeler
                </button>
                <button className="flex-1 button-outline py-3">
                  <Mail size={20} className="mr-2" />
                  Message
                </button>
              </div>
            </div>
            
            {/* Garanties */}
            <div className="grid grid-cols-2 gap-4 text-center mb-8">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <Truck size={20} className="mx-auto mb-1 text-neutral-600" />
                <p className="text-xs text-neutral-600">Livraison gratuite</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <Shield size={20} className="mx-auto mb-1 text-neutral-600" />
                <p className="text-xs text-neutral-600">Paiement sécurisé</p>
              </div>
            </div>
            
            {/* Vendeur */}
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-semibold mb-3">Vendeur</h3>
              <Link 
                to={`/marketplace/sellers/${product.seller.id}`}
                className="flex items-center hover:bg-neutral-100 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-700 font-bold mr-3">
                  {product.seller.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-neutral-500">{product.seller.location}</p>
                  {product.seller.totalSales && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {product.seller.totalSales} ventes effectuées
                    </p>
                  )}
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Section produits similaires pourrait être ajoutée ici */}
      </div>

      {/* Notification d'ajout au panier */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <Check size={20} className="mr-2" />
            Produit ajouté au panier!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
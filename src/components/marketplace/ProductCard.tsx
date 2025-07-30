import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/marketplace/products/${product.id}`}>
        <div className="h-48 relative overflow-hidden group">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/marketplace/products/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-secondary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <Link 
            to={`/marketplace/sellers/${product.seller.id}`}
            className="flex items-center text-sm text-neutral-500 hover:text-neutral-700"
          >
            <MapPin size={16} className="mr-1" />
            <span>{product.seller.location}</span>
          </Link>
          
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span className="text-sm">{product.seller.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-secondary-700">
              {product.price.toLocaleString()} FCFA
            </span>
            <span className="text-sm text-neutral-500 ml-1">/{product.unit}</span>
          </div>
          
          <Link 
            to={`/marketplace/products/${product.id}`}
            className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
          >
            Détails
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
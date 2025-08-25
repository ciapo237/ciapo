// components/marketplace/ProductListItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link 
                to={`/marketplace/products/${product.id}`}
                className="text-lg font-semibold hover:text-secondary-600 transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-neutral-600 mt-1 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
            <button className="p-2 hover:bg-neutral-100 rounded-md">
              <Heart size={18} className="text-neutral-400" />
            </button>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-neutral-600">
            <MapPin size={14} className="mr-1" />
            {product.seller.location}
            <span className="mx-2">•</span>
            <Star size={14} className="text-yellow-400 mr-1" />
            {product.rating || product.seller.rating}
          </div>
          
          {product.organic && (
            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs mt-2">
              Bio
            </span>
          )}
        </div>
        
        <div className="md:text-right">
          <div className="text-2xl font-bold text-secondary-700">
            {product.price.toLocaleString()} FCFA
            <span className="text-sm text-neutral-500">/{product.unit}</span>
          </div>
          {product.originalPrice && (
            <div className="text-sm text-neutral-500 line-through">
              {product.originalPrice.toLocaleString()} FCFA
            </div>
          )}
          <div className={`text-sm font-medium mt-2 ${product.available ? 'text-green-600' : 'text-red-600'}`}>
            {product.available ? 'En stock' : 'Rupture de stock'}
          </div>
          <Link 
                to={`/marketplace/products/${product.id}`}
                className="button-secondary mt-4 w-full md:w-auto">
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
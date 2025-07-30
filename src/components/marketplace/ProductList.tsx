import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';

import SectionTitle from '../shared/SectionTitle';
import AnimatedCard from '../shared/AnimatedCard';
import { products } from '../../data/mockData';

const ProductList: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Produits Agricoles" 
          subtitle="Des produits frais et de qualité directement des producteurs"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedCard 
              key={product.id} 
              className="card h-full flex flex-col"
              delay={index * 0.1}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-neutral-600 mb-3 line-clamp-2 flex-grow">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-sm text-neutral-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{product.seller.location}</span>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="text-sm">{product.seller.rating}/5</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xl font-bold text-secondary-700">{product.price} FCFA</span>
                    <span className="text-sm text-neutral-500 ml-1">/{product.unit}</span>
                  </div>
                  
                  <Link to={`/marketplace/products/${product.id}`} className="inline-flex items-center text-secondary-700 hover:text-secondary-800 font-medium">
                    Détails
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/marketplace/products" className="button-outline">
            Voir tous les produits
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
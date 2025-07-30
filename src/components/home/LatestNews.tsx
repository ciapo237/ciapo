import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import SectionTitle from '../shared/SectionTitle';
import AnimatedCard from '../shared/AnimatedCard';
import { newsItems } from '../../data/mockData';

const LatestNews: React.FC = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Actualités" 
          subtitle="Restez informé des dernières nouvelles et événements"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <AnimatedCard 
              key={news.id} 
              className="card h-full"
              delay={index * 0.1}
            >
              <div>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-neutral-500">{formatDate(news.date)}</span>
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                  <p className="text-neutral-600 mb-4">{news.excerpt}</p>
                  
                  <Link to={`/news/${news.id}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                    Lire la suite
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/news" className="button-outline">
            Toutes les actualités
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
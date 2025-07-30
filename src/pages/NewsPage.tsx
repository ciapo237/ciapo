import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, User, Tag } from 'lucide-react';
import { newsItems } from '../data/mockData';

const NewsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Actualités | CIAPO COOP-CA';
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="flex items-center text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="text-neutral-300 hover:text-white">Accueil</Link>
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
              <span className="text-white font-medium">Actualités</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Actualités et Événements
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl mb-8 text-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Restez informé des dernières nouvelles et événements de CIAPO COOP-CA. Découvrez nos succès, innovations et initiatives dans le secteur agricole.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <motion.article
                key={news.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/news/${news.id}`}>
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={news.imageUrl} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                    <div className="flex items-center text-neutral-500 text-sm">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(news.date)}
                    </div>
                  </div>
                  
                  <Link to={`/news/${news.id}`}>
                    <h2 className="text-xl font-bold mb-3 hover:text-primary-600 transition-colors">
                      {news.title}
                    </h2>
                  </Link>
                  
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-neutral-500">
                      <User size={16} className="mr-1" />
                      <span>{news.author}</span>
                    </div>
                    
                    <Link 
                      to={`/news/${news.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      Lire la suite
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
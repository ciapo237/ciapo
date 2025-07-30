import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronRight, Share2 } from 'lucide-react';
import { newsItems } from '../data/mockData';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams();
  const news = newsItems.find(n => n.id === id);
  
  React.useEffect(() => {
    if (news) {
      document.title = `${news.title} | CIAPO COOP-CA`;
    }
  }, [news]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (!news) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <Link to="/news" className="text-primary-600 hover:text-primary-700">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const relatedNews = newsItems
    .filter(n => n.id !== news.id)
    .slice(0, 3);

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
          <Link to="/news" className="text-neutral-500 hover:text-neutral-700">Actualités</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium">{news.title}</span>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center text-neutral-500">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center text-neutral-500">
                <User size={18} className="mr-2" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center">
                <Tag size={18} className="mr-2 text-primary-600" />
                <span className="text-primary-600">{news.category}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-6">{news.title}</h1>
            
            <div className="prose max-w-none mb-12">
              <p className="text-lg text-neutral-600 mb-6">{news.content}</p>
              
              {/* Additional content sections would go here */}
              <h2 className="text-2xl font-bold mb-4">Impact et Perspectives</h2>
              <p className="text-neutral-600 mb-6">
                Cette initiative s'inscrit dans notre vision à long terme de modernisation du secteur agricole en Côte d'Ivoire. Elle permettra de former plus efficacement la nouvelle génération d'agriculteurs et d'entrepreneurs agricoles.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Prochaines Étapes</h2>
              <p className="text-neutral-600">
                Nous continuerons à développer nos programmes et à innover dans nos approches pédagogiques pour répondre aux besoins évolutifs du secteur agricole.
              </p>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="text-neutral-600">Partager:</span>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <Share2 size={20} className="text-neutral-600" />
                </button>
              </div>
              
              <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                Toutes les actualités
              </Link>
            </div>
          </motion.article>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Articles Similaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/news/${article.id}`}>
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    
                    <Link to={`/news/${article.id}`}>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-neutral-600 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
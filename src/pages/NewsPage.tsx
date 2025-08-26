import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Calendar, User, Tag, Search, Filter, Clock, 
  Share, Bookmark, Eye, ArrowLeft, ArrowRight, X, TrendingUp
} from 'lucide-react';
import { newsItems } from '../data/mockData';

// Types pour les filtres
interface FilterState {
  category: string;
  year: string;
  author: string;
  sortBy: 'recent' | 'popular' | 'trending';
}

const NewsPage: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    year: 'all',
    author: 'all',
    sortBy: 'recent'
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = 'Actualités | CIAPO COOP-CA';
  }, []);

  // Extraction des données pour les filtres
  const categories = useMemo(() => 
    ['all', ...new Set(newsItems.map(item => item.category))], 
    []
  );

  const years = useMemo(() => 
    ['all', ...new Set(newsItems.map(item => new Date(item.date).getFullYear().toString()))].sort((a, b) => b.localeCompare(a)), 
    []
  );

  const authors = useMemo(() => 
    ['all', ...new Set(newsItems.map(item => item.author))], 
    []
  );

  // Filtrage et tri des actualités
  const filteredNews = useMemo(() => {
    let filtered = newsItems.filter(news => {
      // Filtre par catégorie
      if (filterState.category !== 'all' && news.category !== filterState.category) {
        return false;
      }
      
      // Filtre par année
      if (filterState.year !== 'all' && new Date(news.date).getFullYear().toString() !== filterState.year) {
        return false;
      }
      
      // Filtre par auteur
      if (filterState.author !== 'all' && news.author !== filterState.author) {
        return false;
      }
      
      // Filtre par recherche
      if (searchQuery && !news.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    // Tri des résultats
    switch (filterState.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'trending':
        // Simuler un algorithme de tendance basé sur les vues et la date
        filtered.sort((a, b) => {
          const aScore = (a.views || 0) / (1 + (Date.now() - new Date(a.date).getTime()) / (1000 * 60 * 60 * 24));
          const bScore = (b.views || 0) / (1 + (Date.now() - new Date(b.date).getTime()) / (1000 * 60 * 60 * 24));
          return bScore - aScore;
        });
        break;
    }

    return filtered;
  }, [newsItems, filterState, searchQuery]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage, itemsPerPage]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const relativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return formatDate(dateString);
  };

  const clearFilters = () => {
    setFilterState({
      category: 'all',
      year: 'all',
      author: 'all',
      sortBy: 'recent'
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFilterCount = Object.values(filterState).filter(value => 
    value !== 'all' && value !== 'recent'
  ).length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="flex items-center text-sm mb-6 text-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium">Actualités</span>
          </motion.div>

          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Actualités & Événements
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-neutral-100 leading-relaxed">
              Restez informé des dernières nouvelles, événements et innovations de CIAPO COOP-CA. 
              Découvrez nos succès, projets et initiatives dans le secteur agricole.
            </p>

            {/* Search Bar */}
            <motion.div 
              className="relative max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher des actualités..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 sticky top-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Filtres</h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Tout effacer
                    </button>
                  )}
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Trier par</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'recent', label: 'Plus récent', icon: Clock },
                      { value: 'popular', label: 'Plus populaire', icon: Eye },
                      { value: 'trending', label: 'Tendances', icon: TrendingUp }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="sort"
                          checked={filterState.sortBy === option.value}
                          onChange={() => setFilterState(prev => ({ ...prev, sortBy: option.value as any }))}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <option.icon size={16} className="ml-2 mr-2 text-neutral-500" />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={filterState.category === category}
                          onChange={() => setFilterState(prev => ({ ...prev, category }))}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm capitalize">
                          {category === 'all' ? 'Toutes les catégories' : category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Année</h4>
                  <select
                    value={filterState.year}
                    onChange={(e) => setFilterState(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'all' ? 'Toutes les années' : year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Auteur</h3>
                  <select
                    value={filterState.author}
                    onChange={(e) => setFilterState(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  >
                    {authors.map(author => (
                      <option key={author} value={author}>
                        {author === 'all' ? 'Tous les auteurs' : author}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Newsletter Subscription */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-primary-600 rounded-xl p-6 mt-6 text-white"
              >
                <h3 className="font-semibold mb-3">Restez informé</h3>
                <p className="text-sm text-primary-100 mb-4">
                  Recevez nos dernières actualités directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 py-2 rounded-md text-sm text-neutral-800"
                  />
                  <button className="w-full bg-white text-primary-600 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors">
                    S'abonner
                  </button>
                </div>
              </motion.div>
            </aside>

            {/* News Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Dernières actualités</h2>
                    <p className="text-neutral-600 text-sm">
                      {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} trouvé{filteredNews.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Filter size={18} />
                    Filtres
                    {activeFilterCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        Recherche: "{searchQuery}"
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filterState.category !== 'all' && (
                      <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        Catégorie: {filterState.category}
                        <button 
                          onClick={() => setFilterState(prev => ({ ...prev, category: 'all' }))}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filterState.year !== 'all' && (
                      <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        Année: {filterState.year}
                        <button 
                          onClick={() => setFilterState(prev => ({ ...prev, year: 'all' }))}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </motion.div>

              {/* News Grid */}
              {paginatedNews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {paginatedNews.map((news, index) => (
                        <motion.article
                          key={news.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                        >
                          <Link to={`/news/${news.id}`}>
                            <div className="h-48 relative overflow-hidden">
                              <img 
                                src={news.imageUrl} 
                                alt={news.title} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {news.category}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </Link>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-sm text-neutral-500">
                                <Calendar size={14} className="mr-1" />
                                <span>{relativeDate(news.date)}</span>
                              </div>
                              {news.views && (
                                <div className="flex items-center text-sm text-neutral-500">
                                  <Eye size={14} className="mr-1" />
                                  <span>{news.views.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                            
                            <Link to={`/news/${news.id}`}>
                              <h2 className="text-xl font-bold mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                                {news.title}
                              </h2>
                            </Link>
                            
                            <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                              {news.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-neutral-500">
                                <User size={14} className="mr-1" />
                                <span>{news.author}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                                  <Bookmark size={16} />
                                </button>
                                <button className="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                                  <Share size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex justify-center mt-12"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-10 h-10 rounded-lg border transition-colors ${
                              currentPage === index + 1
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : 'border-neutral-300 hover:bg-neutral-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm p-12 text-center"
                >
                  <div className="text-primary-500 mb-4">
                    <Search size={48} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
                  <p className="text-neutral-600 mb-6">
                    Aucun article ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="button-primary"
                  >
                    Réinitialiser les filtres
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Banner */}
      {filteredNews.length > 0 && filterState.sortBy === 'recent' && (
        <section className="py-16 bg-primary-900 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {filteredNews[0].title}
                  </h2>
                  <p className="text-primary-100 mb-6 line-clamp-3">
                    {filteredNews[0].excerpt}
                  </p>
                  <Link
                    to={`/news/${filteredNews[0].id}`}
                    className="button bg-white text-primary-900 hover:bg-neutral-100 inline-flex items-center"
                  >
                    Lire l'article
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={filteredNews[0].imageUrl}
                    alt={filteredNews[0].title}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    À la une
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filtres</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 hover:bg-neutral-100 rounded-md"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                {/* Mobile filter content would go here */}
                <div className="text-center py-8">
                  <p className="text-neutral-600">Filtres mobiles</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPage;
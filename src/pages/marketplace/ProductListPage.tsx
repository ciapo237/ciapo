import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ChevronDown, X, Grid, List, SlidersHorizontal,
  MapPin, Star, Leaf, Clock, TrendingUp
} from 'lucide-react';
import { products } from '../../data/mockData';
import ProductCard from '../../components/marketplace/ProductCard';
import ProductListItem from '../../components/marketplace/ProductListItem';
import FilterSidebar from '../../components/marketplace/FilterSidebar';
import Pagination from '../../components/ui/Pagination';

// Types pour les filtres
interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  availability: 'all' | 'available' | 'unavailable';
  organic: boolean;
  location: string;
  seller: string;
  harvestDate: string; // 'recent' | 'week' | 'month'
}

interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const ProductListPage: React.FC = () => {
  // États pour les filtres et affichage
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 10000],
    rating: 0,
    availability: 'all',
    organic: false,
    location: '',
    seller: '',
    harvestDate: 'all'
  });
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Options de tri
  const sortOptions: SortOption[] = [
    { value: 'recent', label: 'Plus récents', icon: <Clock size={16} /> },
    { value: 'price-low', label: 'Prix croissant', icon: <TrendingUp size={16} /> },
    { value: 'price-high', label: 'Prix décroissant', icon: <TrendingUp size={16} className="rotate-180" /> },
    { value: 'rating', label: 'Meilleures notes', icon: <Star size={16} /> },
    { value: 'popular', label: 'Plus populaires', icon: <TrendingUp size={16} /> }
  ];

  // Extraction des données pour les filtres
  const categories = useMemo(() => 
    ['all', ...new Set(products.map(product => product.category))], 
    []
  );

  const locations = useMemo(() => 
    ['all', ...new Set(products.map(product => product.seller.location))], 
    []
  );

  const sellers = useMemo(() => 
    ['all', ...new Set(products.map(product => product.seller.name))], 
    []
  );

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtre par catégorie
      if (filterState.category !== 'all' && product.category !== filterState.category) {
        return false;
      }
      
      // Filtre par recherche
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par prix
      if (product.price < filterState.priceRange[0] || product.price > filterState.priceRange[1]) {
        return false;
      }
      
      // Filtre par note
      if (filterState.rating > 0 && (product.rating || product.seller.rating) < filterState.rating) {
        return false;
      }
      
      // Filtre par disponibilité
      if (filterState.availability !== 'all') {
        const isAvailable = filterState.availability === 'available';
        if (product.available !== isAvailable) {
          return false;
        }
      }
      
      // Filtre bio
      if (filterState.organic && !product.organic) {
        return false;
      }
      
      // Filtre par localisation
      if (filterState.location && filterState.location !== 'all' && 
          product.seller.location !== filterState.location) {
        return false;
      }
      
      // Filtre par vendeur
      if (filterState.seller && filterState.seller !== 'all' && 
          product.seller.name !== filterState.seller) {
        return false;
      }
      
      // Filtre par date de récolte (simplifié)
      if (filterState.harvestDate !== 'all' && product.harvestDate) {
        const harvestDate = new Date(product.harvestDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - harvestDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (filterState.harvestDate === 'recent' && diffDays > 3) return false;
        if (filterState.harvestDate === 'week' && diffDays > 7) return false;
        if (filterState.harvestDate === 'month' && diffDays > 30) return false;
      }
      
      return true;
    });
  }, [products, filterState, searchQuery]);

  // Tri des produits
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsCopy.sort((a, b) => 
          (b.rating || b.seller.rating) - (a.rating || a.seller.rating)
        );
      case 'popular':
        // Simuler la popularité par les ventes ou avis
        return productsCopy.sort((a, b) => 
          (b.seller.totalSales || 0) - (a.seller.totalSales || 0)
        );
      default:
        return productsCopy;
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const productsPerPage = viewMode === 'grid' ? 12 : 8;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage, productsPerPage]);

  // Gestion des filtres
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset à la première page lors du changement de filtre
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterState({
      category: 'all',
      priceRange: [0, 10000],
      rating: 0,
      availability: 'all',
      organic: false,
      location: '',
      seller: '',
      harvestDate: 'all'
    });
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Compteur de filtres actifs
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.category !== 'all') count++;
    if (filterState.priceRange[0] > 0 || filterState.priceRange[1] < 10000) count++;
    if (filterState.rating > 0) count++;
    if (filterState.availability !== 'all') count++;
    if (filterState.organic) count++;
    if (filterState.location) count++;
    if (filterState.seller) count++;
    if (filterState.harvestDate !== 'all') count++;
    if (searchQuery) count++;
    return count;
  }, [filterState, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* En-tête avec recherche */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-secondary-600 to-secondary-700 text-dark">
        <div className="container-custom">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Notre Marketplace
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 max-w-3xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Découvrez les meilleurs produits agricoles de nos producteurs locaux, frais et de qualité.
          </motion.p>
          
          <motion.div 
            className="max-w-2xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Rechercher des produits, producteurs, catégories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pr-12 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          </motion.div>

          {/* Filtres rapides */}
          <motion.div 
            className="flex flex-wrap gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => updateFilter('organic', true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                filterState.organic
                  ? 'bg-green-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Leaf size={16} className="mr-1" /> Bio
            </button>
            
            <button
              onClick={() => updateFilter('availability', 'available')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterState.availability === 'available'
                  ? 'bg-green-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              En stock
            </button>
            
            <button
              onClick={() => updateFilter('harvestDate', 'recent')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                filterState.harvestDate === 'recent'
                  ? 'bg-green-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Clock size={16} className="mr-1" /> Récent
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar des filtres (version desktop) */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filterState}
                onFilterChange={updateFilter}
                onClearFilters={clearAllFilters}
                categories={categories}
                locations={locations}
                sellers={sellers}
                activeFilterCount={activeFilterCount}
              />
            </aside>

            {/* Contenu principal */}
            <div className="flex-1">
              {/* Barre d'outils */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      <SlidersHorizontal size={18} />
                      Filtres
                      {activeFilterCount > 0 && (
                        <span className="bg-secondary-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    <div className="text-neutral-600">
                      {sortedProducts.length} produit{sortedProducts.length !== 1 ? 's' : ''} trouvé{sortedProducts.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sélecteur de vue */}
                    <div className="flex bg-neutral-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-secondary-600 shadow-sm' : 'text-neutral-600'
                        }`}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-secondary-600 shadow-sm' : 'text-neutral-600'
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>

                    {/* Sélecteur de tri */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-sm"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    </div>
                  </div>
                </div>

                {/* Filtres actifs */}
                {activeFilterCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                        Recherche: "{searchQuery}"
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:text-secondary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filterState.category !== 'all' && (
                      <span className="inline-flex items-center bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                        Catégorie: {filterState.category}
                        <button 
                          onClick={() => updateFilter('category', 'all')}
                          className="ml-1 hover:text-secondary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filterState.organic && (
                      <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Bio
                        <button 
                          onClick={() => updateFilter('organic', false)}
                          className="ml-1 hover:text-green-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {(filterState.priceRange[0] > 0 || filterState.priceRange[1] < 10000) && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Prix: {filterState.priceRange[0]} - {filterState.priceRange[1]} FCFA
                        <button 
                          onClick={() => updateFilter('priceRange', [0, 10000])}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
                    >
                      Tout effacer
                    </button>
                  </div>
                )}
              </div>

              {/* Liste des produits */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-2"
                  }>
                    <AnimatePresence mode="popLayout">
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          layout
                        >
                          {viewMode === 'grid' ? (
                            <ProductCard product={product} />
                          ) : (
                            <ProductListItem product={product} />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-secondary-500 mb-4">
                    <Search size={48} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
                  <p className="text-neutral-600 mb-6">
                    Aucun produit ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="button-secondary"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filtres mobiles */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
                <FilterSidebar
                  filters={filterState}
                  onFilterChange={updateFilter}
                  onClearFilters={clearAllFilters}
                  categories={categories}
                  locations={locations}
                  sellers={sellers}
                  activeFilterCount={activeFilterCount}
                  isMobile
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
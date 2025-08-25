import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronRight, ChevronDown, X, Grid, List, SlidersHorizontal,
  Clock, Users, Star, Award, BookOpen, Filter, Target
} from 'lucide-react';
import { courses } from '../../data/mockData';
import CourseCard from '../../components/elearning/CourseCard';
import CourseListItem from '../../components/elearning/CourseListItem';
import FilterSidebar from '../../components/elearning/FilterSidebar';
import Pagination from '../../components/ui/Pagination';

// Types pour les filtres
interface FilterState {
  level: string;
  category: string;
  duration: string;
  rating: number;
  price: 'all' | 'free' | 'paid';
  instructor: string;
  status: 'all' | 'ongoing' | 'upcoming' | 'completed';
  tags: string[];
}

interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const CourseListPage: React.FC = () => {
  // États pour les filtres et affichage
  const [filterState, setFilterState] = useState<FilterState>({
    level: 'all',
    category: 'all',
    duration: 'all',
    rating: 0,
    price: 'all',
    instructor: 'all',
    status: 'all',
    tags: []
  });
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Options de tri
  const sortOptions: SortOption[] = [
    { value: 'popular', label: 'Plus populaires', icon: <Users size={16} /> },
    { value: 'rating', label: 'Meilleures notes', icon: <Star size={16} /> },
    { value: 'duration', label: 'Durée', icon: <Clock size={16} /> },
    { value: 'newest', label: 'Plus récents', icon: <Award size={16} /> },
    { value: 'price', label: 'Prix', icon: <BookOpen size={16} /> }
  ];

  // Extraction des données pour les filtres
  const levels = useMemo(() => 
    ['all', ...new Set(courses.map(course => course.level))], 
    []
  );

  const categories = useMemo(() => 
    ['all', ...new Set(courses.map(course => course.category))], 
    []
  );

  const instructors = useMemo(() => 
    ['all', ...new Set(courses.map(course => course.instructor))], 
    []
  );

  const allTags = useMemo(() => 
    Array.from(new Set(courses.flatMap(course => course.tags || []))), 
    []
  );

  const durations = useMemo(() => 
    ['all', 'short', 'medium', 'long'], 
    []
  );

  // Filtrage des cours
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filtre par niveau
      if (filterState.level !== 'all' && course.level !== filterState.level) {
        return false;
      }
      
      // Filtre par catégorie
      if (filterState.category !== 'all' && course.category !== filterState.category) {
        return false;
      }
      
      // Filtre par recherche
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par durée
      if (filterState.duration !== 'all') {
        const courseDuration = course.duration.toLowerCase();
        if (filterState.duration === 'short' && !courseDuration.includes('heure')) return false;
        if (filterState.duration === 'medium' && !courseDuration.includes('jour')) return false;
        if (filterState.duration === 'long' && !courseDuration.includes('semaine')) return false;
      }
      
      // Filtre par note
      if (filterState.rating > 0 && course.rating < filterState.rating) {
        return false;
      }
      
      // Filtre par prix
      if (filterState.price !== 'all') {
        const isFree = course.price === 0;
        if (filterState.price === 'free' && !isFree) return false;
        if (filterState.price === 'paid' && isFree) return false;
      }
      
      // Filtre par instructeur
      if (filterState.instructor !== 'all' && course.instructor !== filterState.instructor) {
        return false;
      }
      
      // Filtre par tags
      if (filterState.tags.length > 0 && course.tags) {
        const hasMatchingTag = filterState.tags.some(tag => course.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      
      return true;
    });
  }, [courses, filterState, searchQuery]);

  // Tri des cours
  const sortedCourses = useMemo(() => {
    const coursesCopy = [...filteredCourses];
    
    switch (sortBy) {
      case 'popular':
        return coursesCopy.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
      case 'rating':
        return coursesCopy.sort((a, b) => b.rating - a.rating);
      case 'duration':
        // Simplification pour le tri par durée
        return coursesCopy.sort((a, b) => {
          const getDurationValue = (duration: string) => {
            if (duration.includes('heure')) return 1;
            if (duration.includes('jour')) return 2;
            if (duration.includes('semaine')) return 3;
            return 0;
          };
          return getDurationValue(a.duration) - getDurationValue(b.duration);
        });
      case 'newest':
        return coursesCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price':
        return coursesCopy.sort((a, b) => a.price - b.price);
      default:
        return coursesCopy;
    }
  }, [filteredCourses, sortBy]);

  // Pagination
  const coursesPerPage = viewMode === 'grid' ? 9 : 6;
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return sortedCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [sortedCourses, currentPage, coursesPerPage]);

  // Gestion des filtres
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset à la première page lors du changement de filtre
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilterState(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterState({
      level: 'all',
      category: 'all',
      duration: 'all',
      rating: 0,
      price: 'all',
      instructor: 'all',
      status: 'all',
      tags: []
    });
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Compteur de filtres actifs
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.level !== 'all') count++;
    if (filterState.category !== 'all') count++;
    if (filterState.duration !== 'all') count++;
    if (filterState.rating > 0) count++;
    if (filterState.price !== 'all') count++;
    if (filterState.instructor !== 'all') count++;
    if (filterState.status !== 'all') count++;
    if (filterState.tags.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [filterState, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* En-tête avec recherche */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-primary-700 to-primary-800 text-white">
        <div className="container-custom">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Centre de Formation
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 max-w-3xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Développez vos compétences agricoles avec nos cours en ligne dispensés par des experts du secteur.
          </motion.p>
          
          <motion.div 
            className="max-w-2xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Rechercher des cours, sujets, formateurs..."
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
              onClick={() => updateFilter('price', 'free')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                filterState.price === 'free'
                  ? 'bg-green-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <BookOpen size={16} className="mr-1" /> Gratuits
            </button>
            
            <button
              onClick={() => updateFilter('duration', 'short')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                filterState.duration === 'short'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Clock size={16} className="mr-1" />Courtes durées
            </button>
            
            <button
              onClick={() => updateFilter('rating', 4)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                filterState.rating === 4
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Star size={16} className="mr-1" /> Bien notés
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar des filtres (version desktop) */}
            <aside className="hidden lg:block lg:w-60 flex-shrink-0">
              <FilterSidebar
                filters={filterState}
                onFilterChange={updateFilter}
                onToggleTag={toggleTag}
                onClearFilters={clearAllFilters}
                levels={levels}
                categories={categories}
                instructors={instructors}
                durations={durations}
                allTags={allTags}
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
                        <span className="bg-primary-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    <div className="text-neutral-600">
                      {sortedCourses.length} cours{sortedCourses.length !== 1 ? 's' : ''} trouvé{sortedCourses.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sélecteur de vue */}
                    <div className="flex bg-neutral-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-600'
                        }`}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-600'
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
                        className="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                    
                    {filterState.level !== 'all' && (
                      <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        Niveau: {filterState.level}
                        <button 
                          onClick={() => updateFilter('level', 'all')}
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
                          onClick={() => updateFilter('category', 'all')}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filterState.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                        <button 
                          onClick={() => toggleTag(tag)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Tout effacer
                    </button>
                  </div>
                )}
              </div>

              {/* Liste des cours */}
              {paginatedCourses.length > 0 ? (
                <>
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-2"
                  }>
                    <AnimatePresence mode="popLayout">
                      {paginatedCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          layout
                        >
                          {viewMode === 'grid' ? (
                            <CourseCard course={course} />
                          ) : (
                            <CourseListItem course={course} />
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
                  <div className="text-primary-500 mb-4">
                    <Search size={48} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun cours trouvé</h3>
                  <p className="text-neutral-600 mb-6">
                    Aucun cours ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="button-primary"
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
                  onToggleTag={toggleTag}
                  onClearFilters={clearAllFilters}
                  levels={levels}
                  categories={categories}
                  instructors={instructors}
                  durations={durations}
                  allTags={allTags}
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

export default CourseListPage;
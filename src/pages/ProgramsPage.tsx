import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Filter, Search, Award, Users, Clock, 
  CheckCircle, Star, BookOpen, Target, Calendar, MapPin,
  Download, Phone, Mail, MessageCircle, Heart, Share
} from 'lucide-react';
import { programs } from '../data/mockData';
import SectionTitle from '../components/shared/SectionTitle';
import ProgramCard from '../components/programs/ProgramCard';
import ProgramComparisonModal from '../components/programs/ProgramComparisonModal';
import FilterSidebar from '../components/programs/FilterSidebar';

// Types pour les filtres
interface FilterState {
  category: string;
  duration: string;
  level: string;
  format: string;
  priceRange: [number, number];
  location: string;
}

const ProgramsPage: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    duration: 'all',
    level: 'all',
    format: 'all',
    priceRange: [0, 5000],
    location: 'all'
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  React.useEffect(() => {
    document.title = 'Nos Programmes de Formation | CIAPO COOP-CA';
  }, []);

  // Catégories disponibles
  const categories = useMemo(() => 
    ['all', ...new Set(programs.map(program => program.category))], 
    []
  );

  // Filtrage des programmes
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      // Filtre par catégorie
      if (filterState.category !== 'all' && program.category !== filterState.category) {
        return false;
      }
      
      // Filtre par recherche
      if (searchQuery && !program.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par durée
      if (filterState.duration !== 'all') {
        const programDuration = program.duration.toLowerCase();
        if (filterState.duration === 'short' && !programDuration.includes('mois')) return false;
        if (filterState.duration === 'medium' && !programDuration.includes('mois')) return false;
        if (filterState.duration === 'long' && !programDuration.includes('année')) return false;
      }
      
      // Filtre par niveau
      if (filterState.level !== 'all' && program.level !== filterState.level) {
        return false;
      }
      
      // Filtre par format
      if (filterState.format !== 'all' && program.format !== filterState.format) {
        return false;
      }
      
      // Filtre par prix
      if (program.price < filterState.priceRange[0] || program.price > filterState.priceRange[1]) {
        return false;
      }
      
      // Filtre par localisation
      if (filterState.location !== 'all' && program.location !== filterState.location) {
        return false;
      }
      
      return true;
    });
  }, [programs, filterState, searchQuery]);

  const toggleProgramSelection = (programId: string) => {
    setSelectedPrograms(prev => 
      prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const clearFilters = () => {
    setFilterState({
      category: 'all',
      duration: 'all',
      level: 'all',
      format: 'all',
      priceRange: [0, 5000],
      location: 'all'
    });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filterState).filter(value => 
    value !== 'all' && !(Array.isArray(value) && value[0] === 0 && value[1] === 5000)
  ).length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen pt-28 pb-20 md:pb-102 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl text-center mx-auto ">
            <motion.div 
              className="flex items-center justify-center text-neutral-200 text-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span>Accueil</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-white font-medium">Programmes de Formation</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold my-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Transformez Votre Passion en Expertise
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-xl mb-8 text-neutral-100 leading-relaxed md:mb-102"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Des programmes de formation complets pour devenir un professionnel qualifié 
              dans le secteur agricole. Apprenez avec des experts et développez des compétences concrètes.
            </motion.p>
          </div>
        </div>

        {/* Floating stats */}
        <motion.div 
          className="absolute bottom-1/8 left-0 right-0 z-50 transform translate-y-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, value: '500+', label: 'Étudiants Formés' },
                { icon: Award, value: '95%', label: 'Taux de Réussite' },
                { icon: Clock, value: '2000h', label: 'Heures de Formation' },
                { icon: Star, value: '4.9/5', label: 'Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <stat.icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary-700 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="pt-24 pb-16 bg-neutral-50 z-10">
        <div className="container-custom">
          {/* Filter and Search Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un programme, une compétence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Filter size={20} />
                  Filtres
                  {activeFilterCount > 0 && (
                    <span className="bg-primary-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {selectedPrograms.length > 0 && (
                  <button
                    onClick={() => setShowComparisonModal(true)}
                    className="hidden lg:flex items-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <span>Comparer ({selectedPrograms.length})</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
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
                      ×
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
                      ×
                    </button>
                  </span>
                )}
                
                <button 
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                filters={filterState}
                onFilterChange={setFilterState}
                categories={categories}
                activeFilterCount={activeFilterCount}
                onClearFilters={clearFilters}
              />
            </aside>

            {/* Programs Grid */}
            <div className="lg:col-span-3">
              {/* Category Tabs */}
              <div className="flex overflow-x-auto gap-1 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterState(prev => ({ ...prev, category }))}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      filterState.category === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {category === 'all' ? 'Tous' : category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-600">
                  {filteredPrograms.length} programme{filteredPrograms.length !== 1 ? 's' : ''} trouvé{filteredPrograms.length !== 1 ? 's' : ''}
                </p>
                {selectedPrograms.length > 0 && (
                  <button
                    onClick={() => setShowComparisonModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    <span>Comparer ({selectedPrograms.length})</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Programs Grid */}
              {filteredPrograms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredPrograms.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                      >
                        <ProgramCard 
                          program={program} 
                          isSelected={selectedPrograms.includes(program.id)}
                          onToggleSelect={() => toggleProgramSelection(program.id)}
                          delay={index * 0.1}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="text-primary-500 mb-4">
                    <Search size={48} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun programme trouvé</h3>
                  <p className="text-neutral-600 mb-6">
                    Aucun programme ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                  </p>
                  <button
                    onClick={clearFilters}
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Approche Pédagogique" 
            subtitle="Une méthode d'apprentissage unique pour une transformation réelle"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: '🎯',
                title: 'Apprentissage Pratique',
                description: '70% de mise en pratique avec des cas réels et des projets concrets'
              },
              {
                icon: '👨‍🏫',
                title: 'Mentorat Expert',
                description: 'Accompagnement personnalisé par des professionnels du secteur'
              },
              {
                icon: '🤝',
                title: 'Communauté Active',
                description: 'Échanges et networking avec une communauté de passionnés'
              },
              {
                icon: '📈',
                title: 'Suivi Post-Formation',
                description: 'Accompagnement continu après la formation pour votre réussite'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-neutral-50 rounded-xl hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-primary-900">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <SectionTitle 
            title="Ils Ont Transformé Leur Carrière" 
            subtitle="Découvrez les témoignages de nos anciens étudiants"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Aïcha Koné",
                role: "Agricultrice Bio",
                testimonial: "La formation m'a donné les compétences pour lancer mon exploitation bio. Aujourd'hui, je fournis des restaurants locaux.",
                image: "👩‍🌾",
                rating: 5
              },
              {
                name: "Mohamed Diop",
                role: "Manager Agricole",
                testimonial: "Le programme de gestion agricole a transformé ma façon de manager mon exploitation. Résultats: +40% de productivité.",
                image: "👨‍💼",
                rating: 5
              },
              {
                name: "Fatou Sow",
                role: "Formatrice Agricole",
                testimonial: "De participante à formatrice ! Cette formation m'a ouvert les portes d'une nouvelle carrière passionnante.",
                image: "👩‍🏫",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-primary-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"} 
                    />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">"{testimonial.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-custom text-center">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prêt à Transformer Votre Avenir ?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Rejoignez des centaines d'étudiants qui ont déjà franchi le pas vers une carrière réussie dans l'agriculture.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="button-secondary bg-white text-primary-900 hover:bg-neutral-100 px-8 py-3">
              Voir tous les programmes
            </button>
            <button className="button-outline border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3">
              Nous contacter
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
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
                  <span className="text-2xl">×</span>
                </button>
              </div>
              
              <div className="p-4">
                <FilterSidebar
                  filters={filterState}
                  onFilterChange={setFilterState}
                  categories={categories}
                  activeFilterCount={activeFilterCount}
                  onClearFilters={clearFilters}
                  isMobile
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <ProgramComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        programIds={selectedPrograms}
        programs={programs}
      />
    </div>
  );
};

export default ProgramsPage;
// components/programs/FilterSidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  activeFilterCount: number;
  onClearFilters: () => void;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  categories,
  activeFilterCount,
  onClearFilters,
  isMobile = false
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filtres</h3>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              Tout effacer
            </button>
          )}
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h4 className="font-medium mb-3">Catégorie</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => updateFilter('category', category)}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm capitalize">
                {category === 'all' ? 'Toutes les catégories' : category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div>
        <h4 className="font-medium mb-3">Durée</h4>
        <select
          value={filters.duration}
          onChange={(e) => updateFilter('duration', e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
        >
          <option value="all">Toutes les durées</option>
          <option value="short">Court terme (moins 3 mois)</option>
          <option value="medium">Moyen terme (3 à 6 mois)</option>
          <option value="long">Long terme (plus de 6 mois)</option>
        </select>
      </div>

      {/* Level Filter */}
      <div>
        <h4 className="font-medium mb-3">Niveau</h4>
        <select
          value={filters.level}
          onChange={(e) => updateFilter('level', e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
        >
          <option value="all">Tous les niveaux</option>
          <option value="débutant">Débutant</option>
          <option value="intermédiaire">Intermédiaire</option>
          <option value="avancé">Avancé</option>
        </select>
      </div>

      {isMobile && (
        <button className="w-full button-primary mt-6">
          Appliquer les filtres
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
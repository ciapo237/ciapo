// components/marketplace/FilterSidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  categories: string[];
  locations: string[];
  sellers: string[];
  activeFilterCount: number;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  categories,
  locations,
  sellers,
  activeFilterCount,
  isMobile = false
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filtres</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-secondary-600 hover:text-secondary-700"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Catégorie */}
      <div>
        <h5 className="font-medium mb-3">Catégorie</h5>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange('category', category)}
                className="text-secondary-600 focus:ring-secondary-500"
              />
              <span className="ml-2 text-sm capitalize">
                {category === 'all' ? 'Toutes les catégories' : category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <h5 className="font-medium mb-3">Fourchette de prix (FCFA)</h5>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => onFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
            placeholder="Min"
          />
          <span className="self-center text-neutral-500">-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Note minimum */}
      <div>
        <h5 className="font-medium mb-3">Note minimum</h5>
        <select
          value={filters.rating}
          onChange={(e) => onFilterChange('rating', Number(e.target.value))}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
        >
          <option value={0}>Toutes les notes</option>
          <option value={3}>3 étoiles et plus</option>
          <option value={4}>4 étoiles et plus</option>
          <option value={5}>5 étoiles</option>
        </select>
      </div>

      {/* Autres filtres */}
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.organic}
            onChange={(e) => onFilterChange('organic', e.target.checked)}
            className="text-secondary-600 focus:ring-secondary-500"
          />
          <span className="ml-2 text-sm">Produits bio uniquement</span>
        </label>

        <div>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'all'}
              onChange={() => onFilterChange('availability', 'all')}
              className="text-secondary-600 focus:ring-secondary-500"
            />
            <span className="ml-2 text-sm">Tous les produits</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'available'}
              onChange={() => onFilterChange('availability', 'available')}
              className="text-secondary-600 focus:ring-secondary-500"
            />
            <span className="ml-2 text-sm">En stock uniquement</span>
          </label>
        </div>
      </div>

      {isMobile && (
        <button
          onClick={() => {/* Fermer le sidebar mobile */}}
          className="w-full button-secondary mt-6"
        >
          Appliquer les filtres
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
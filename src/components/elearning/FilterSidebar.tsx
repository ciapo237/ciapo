import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onToggleTag: (tag: string) => void;
  onClearFilters: () => void;
  levels: string[];
  categories: string[];
  instructors: string[];
  durations: string[];
  allTags: string[];
  activeFilterCount: number;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onToggleTag,
  onClearFilters,
  levels,
  categories,
  instructors,
  durations,
  allTags,
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
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Niveau */}
      <div>
        <h5 className="font-medium mb-3">Niveau</h5>
        <div className="space-y-2">
          {levels.map(level => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="level"
                checked={filters.level === level}
                onChange={() => onFilterChange('level', level)}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm capitalize">
                {level === 'all' ? 'Tous les niveaux' : level}
              </span>
            </label>
          ))}
        </div>
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
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm capitalize">
                {category === 'all' ? 'Toutes les catégories' : category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Durée */}
      <div>
        <h5 className="font-medium mb-3">Durée</h5>
        <select
          value={filters.duration}
          onChange={(e) => onFilterChange('duration', e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
        >
          {durations.map(duration => (
            <option key={duration} value={duration}>
              {duration === 'all' ? 'Toutes les durées' : 
               duration === 'short' ? 'Court (< 1h)' :
               duration === 'medium' ? 'Moyen (1-4h)' : 'Long (> 4h)'}
            </option>
          ))}
        </select>
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

      {/* Prix */}
      <div>
        <h5 className="font-medium mb-3">Prix</h5>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.price === 'all'}
              onChange={() => onFilterChange('price', 'all')}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">Tous les prix</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.price === 'free'}
              onChange={() => onFilterChange('price', 'free')}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">Gratuits</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.price === 'paid'}
              onChange={() => onFilterChange('price', 'paid')}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">Payants</span>
          </label>
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <h5 className="font-medium mb-3">Tags</h5>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => {/* Fermer le sidebar mobile */}}
          className="w-full button-primary mt-6"
        >
          Appliquer les filtres
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
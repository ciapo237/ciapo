import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { courses } from '../../data/mockData';
import CourseCard from '../../components/elearning/CourseCard';

const CourseListPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = ['all', ...new Set(courses.map(course => course.level))];

  const filteredCourses = courses.filter(course => {
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrolledStudents - a.enrolledStudents;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-elearning-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Cours en Ligne
          </motion.h1>
          
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des cours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {level === 'all' ? 'Tous les niveaux' : level}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popular">Plus populaires</option>
                <option value="duration">Durée</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} delay={index * 0.1} />
            ))}
          </div>

          {sortedCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-600">Aucun cours ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseListPage;
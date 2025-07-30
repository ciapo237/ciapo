import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import SectionTitle from '../shared/SectionTitle';
import AnimatedCard from '../shared/AnimatedCard';
import { programs } from '../../data/mockData';

const ProgramHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
      <SectionTitle
      title="Prestations de Services & Séminaires de Formation"
      subtitle="Des ateliers pratiques, des formations à domicile et chez l'apprenant, pour développer vos compétences et réussir dans l'agriculture entrepreneuriale."
      centered
    />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <AnimatedCard 
              key={program.id} 
              className="card h-full"
              delay={index * 0.1}
            >
              <div>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.imageUrl} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">{program.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                      {program.duration}
                    </span>
                    <span className="text-sm bg-accent-100 text-accent-700 px-3 py-1 rounded-full">
                      {program.cost}
                    </span>
                  </div>
                  
                  <Link to={`/programs/${program.id}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                    Plus de détails
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/programs" className="button-outline">
            Voir tous nos programmes
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
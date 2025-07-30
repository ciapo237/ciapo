import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Program } from '../../types';

interface ProgramCardProps {
  program: Program;
  delay?: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-64 relative overflow-hidden group">
        <img 
          src={program.imageUrl} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-primary-500 text-white text-sm px-3 py-1 rounded-full">
            {program.duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
        <p className="text-neutral-600 mb-6">{program.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-neutral-500">
            <Calendar size={18} className="mr-2" />
            <span>Prochaine session: Juin 2025</span>
          </div>
          <div className="flex items-center text-neutral-500">
            <Users size={18} className="mr-2" />
            <span>20 places</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">{program.cost}</span>
            <span className="text-neutral-500 text-sm">/formation</span>
          </div>
          
          <Link 
            to={`/programs/${program.id}`}
            className="button-primary"
          >
            Détails
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
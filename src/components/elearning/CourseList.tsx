import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';

import SectionTitle from '../shared/SectionTitle';
import AnimatedCard from '../shared/AnimatedCard';
import { courses } from '../../data/mockData';

const CourseList: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Nos Cours en Ligne" 
          subtitle="Explorez notre catalogue de formations agricoles"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <AnimatedCard 
              key={course.id} 
              className="card h-full flex flex-col"
              delay={index * 0.1}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2">
                  <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-2 flex-grow">{course.description}</p>
                
                <div className="border-t border-neutral-100 pt-4 mt-2">
                  <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>{course.enrolledStudents} inscrits</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">Par: {course.instructor}</span>
                    </div>
                    
                    <Link to={`/elearning/courses/${course.id}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                      Détails
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/elearning/courses" className="button-outline">
            Voir tous les cours
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
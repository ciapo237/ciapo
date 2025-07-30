import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/elearning/courses/${course.id}`}>
        <div className="h-48 relative overflow-hidden group">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
              {course.level}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/elearning/courses/${course.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{course.enrolledStudents} étudiants</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            <span>{course.modules} modules</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-neutral-600">Par: </span>
            <span className="font-medium">{course.instructor}</span>
          </div>
          
          <Link 
            to={`/elearning/courses/${course.id}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Détails
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseListItemProps {
  course: Course;
}

const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-32 object-cover rounded-lg"
          />
          {course.isPremium && (
            <div className="mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium text-center">
              <Award size={12} className="inline mr-1" /> Premium
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link 
                to={`/elearning/courses/${course.id}`}
                className="text-lg font-semibold hover:text-primary-600 transition-colors"
              >
                {course.title}
              </Link>
              <p className="text-neutral-600 mt-1 text-sm line-clamp-2">
                {course.description}
              </p>
              <div className="mt-2 text-sm text-primary-600 font-medium">
                Par: {course.instructor}
              </div>
            </div>
            <div className="text-right">
              <Link 
                to={`/elearning/courses/${course.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Détails
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {course.enrolledStudents} étudiants
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1" />
              <span>{course.modules} modules</span>
            </div>
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
              {course.level}
            </span>
          </div>
          
          {course.tags && course.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {course.tags.map(tag => (
                <span key={tag} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
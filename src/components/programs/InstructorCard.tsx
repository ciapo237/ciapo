// components/programs/InstructorCard.tsx
import React from 'react';
import { Linkedin, Mail, Award, Users, BookOpen } from 'lucide-react';
import { Instructor } from '../../types';

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{instructor.name}</h3>
          <p className="text-primary-600 text-sm">{instructor.title}</p>
          <div className="flex items-center gap-2 mt-1">
            {instructor.linkedin && (
              <a
                href={instructor.linkedin}
                className="text-gray-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
              </a>
            )}
            <a
              href={`mailto:${instructor.email}`}
              className="text-gray-500 hover:text-primary-600"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{instructor.bio}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-500">
          <Award size={14} className="mr-2" />
          <span>{instructor.experience} d'expérience</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Users size={14} className="mr-2" />
          <span>{instructor.studentsTaught} étudiants formés</span>
        </div>
        <div className="flex items-center text-gray-500">
          <BookOpen size={14} className="mr-2" />
          <span>{instructor.coursesTaught} programmes</span>
        </div>
      </div>

      {instructor.specializations && (
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Expertises:</h4>
          <div className="flex flex-wrap gap-2">
            {instructor.specializations.map((spec, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCard;
// components/about/TeamModal.tsx
import React from 'react';
import { X, Linkedin, Mail, Phone } from 'lucide-react';

interface TeamModalProps {
  member: any;
  isOpen: boolean;
  onClose: () => void;
}

const TeamModal: React.FC<TeamModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
          
          <div className="aspect-video overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary-900 mb-2">{member.name}</h2>
            <p className="text-primary-600 font-medium">{member.position}</p>
            {member.department && (
              <p className="text-neutral-600 text-sm">{member.department}</p>
            )}
          </div>

          <div className="prose prose-primary max-w-none mb-6">
            <p className="text-neutral-700">{member.bio}</p>
          </div>

          {member.expertise && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-900 mb-3">Domaines d'expertise</h3>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-3 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <Mail size={20} />
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="p-3 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <Phone size={20} />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
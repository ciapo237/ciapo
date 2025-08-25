import React from 'react';
import { X, Download, Share } from 'lucide-react';
import { Program } from '../../types';

interface ProgramComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  programIds: string[];
  programs: Program[];
}

const ProgramComparisonModal: React.FC<ProgramComparisonModalProps> = ({
  isOpen,
  onClose,
  programIds,
  programs
}) => {
  if (!isOpen) return null;

  const selectedPrograms = programs.filter(p => programIds.includes(p.id));

  const features = [
    { name: 'Durée', key: 'duration' },
    { name: 'Niveau', key: 'level' },
    { name: 'Format', key: 'format' },
    { name: 'Prix', key: 'price' },
    { name: 'Certification', key: 'certification' },
    { name: 'Localisation', key: 'location' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold">Comparer les programmes</h2>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-neutral-100 rounded-lg">
              <Share size={20} />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg">
              <Download size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-neutral-50">
              <div className="font-semibold">Caractéristiques</div>
              {selectedPrograms.map(program => (
                <div key={program.id} className="text-center">
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="text-sm text-neutral-600">{program.category}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            {features.map((feature, index) => (
              <div 
                key={feature.key}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <div className="font-medium">{feature.name}</div>
                {selectedPrograms.map(program => (
                  <div key={program.id} className="text-center">
                    {program[feature.key as keyof Program]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-neutral-200">
          <div className="flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="button-outline"
            >
              Fermer
            </button>
            <button className="button-primary">
              Postuler maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramComparisonModal;
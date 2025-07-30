import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock, Users, MapPin, CheckCircle2, Percent, ArrowRight } from 'lucide-react';
import { programs } from '../data/mockData';
import Modal from '../components/programs/Modal';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams();
  const program = programs.find(p => p.id === id);
  const [showBrochure, setShowBrochure] = useState(false);

  React.useEffect(() => {
    if (program) {
      document.title = `${program.title} | CIAPO COOP-CA`;
    }
  }, [program]);

  if (!program) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Programme non trouvé</h1>
        <Link to="/programs" className="text-primary-600 hover:text-primary-700">
          Retour aux programmes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.imageUrl})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="flex items-center text-neutral-200 text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-white">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/programs" className="hover:text-white">Programmes</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium">{program.title}</span>
          </motion.div>

          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {program.title}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-neutral-100 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {program.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center text-white">
              <Calendar size={20} className="mr-2" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center text-white">
              <Percent size={20} className="mr-2" />
              <span>{program.format}</span>
            </div>
            <div className="flex items-center text-white">
              <Users size={20} className="mr-2" />
              <span>10 places disponibles</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={20} className="mr-2" />
              <span>Centre de formation Ebolowa</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Public Cible</h2>
                <div className="flex flex-wrap gap-2">
                  {program.targetAudience?.map((audience, index) => (
                    <span 
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Programme Détaillé</h2>
                <div className="space-y-6">
                  {program.modules?.map((module, index) => (
                    <div key={index} className="bg-neutral-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                          {module.duration}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-primary-600">Objectif:</p>
                        <p>{module.objective}</p>
                      </div>
                      <ul className="space-y-2">
                        {module.topics?.map((topic, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Livrables</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.deliverables?.map((item, index) => (
                    <li key={index} className="flex items-start bg-neutral-50 p-4 rounded-lg">
                      <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-neutral-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Inscription</h3>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {program.cost}
                  </div>
                  <p className="text-neutral-600">Formation complète avec certification</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Accès aux ressources pédagogiques</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Suivi personnalisé</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Certification officielle</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Stage pratique inclus</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-neutral-600">Avantages</p>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Assurance risque inclu</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Déjeuner offert</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3" />
                    <span>Possibilité d'auto-emploi ou entreprenariat</span>
                  </div>
                </div>
                
                <Link 
                  to={`/programs/${program.id}/register`}
                  className="button-primary w-full mb-4 text-center block"
                >
                  S'inscrire à la formation
                </Link>
                
                <button 
                  className="button-outline w-full" 
                  onClick={() => setShowBrochure(true)}
                >
                  Télécharger la brochure
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showBrochure}
        onClose={() => setShowBrochure(false)}
        title={`Brochure: ${program.title}`}
      >
        <div className="aspect-[210/297] bg-white">
          {program.pdfUrl ? (
            <iframe
              src={`${program.pdfUrl}`}
              className="w-full h-[600px]"
              title="PDF Viewer"
            />
          ) : (
            <div className="p-4 bg-gray-100 text-center">
              Document non disponible
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProgramDetailPage;
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, BarChart as ChartBar, Play, CheckCircle } from 'lucide-react';
import { courses } from '../../data/mockData';

const StudentDashboardPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Tableau de Bord | E-Learning CIAPO COOP-CA';
  }, []);

  const enrolledCourses = courses.slice(0, 2); // Simulating enrolled courses

  return (
    <div className="pt-32 pb-16 bg-neutral-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <h2 className="text-xl font-semibold">Kouamé Koffi</h2>
                <p className="text-neutral-600">Étudiant</p>
              </div>

              <nav className="space-y-2">
                <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-primary-50 text-primary-700">
                  <ChartBar size={20} className="mr-3" />
                  <span>Tableau de bord</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50">
                  <BookOpen size={20} className="mr-3" />
                  <span>Mes cours</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50">
                  <Award size={20} className="mr-3" />
                  <span>Certificats</span>
                </a>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen size={24} className="text-primary-600" />
                  <span className="text-3xl font-bold">2</span>
                </div>
                <h3 className="text-neutral-600">Cours en cours</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock size={24} className="text-primary-600" />
                  <span className="text-3xl font-bold">12h</span>
                </div>
                <h3 className="text-neutral-600">Temps d'apprentissage</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award size={24} className="text-primary-600" />
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="text-neutral-600">Certificats obtenus</h3>
              </div>
            </motion.div>

            {/* Current Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">Mes cours en cours</h2>
              <div className="space-y-6">
                {enrolledCourses.map((course, index) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                        <p className="text-neutral-600 mb-4">{course.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-neutral-600">
                            <Clock size={18} className="mr-2" />
                            <span>{course.duration}</span>
                          </div>
                          
                          <button className="button-primary">
                            <Play size={18} className="mr-2" />
                            Continuer
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neutral-600">Progression</span>
                        <span className="text-primary-600 font-medium">60%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-primary-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Mes réalisations</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <Award size={32} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Premier cours terminé</h3>
                      <p className="text-neutral-600">Obtenu le 15 février 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
                      <CheckCircle size={32} className="text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-600">5 cours terminés</h3>
                      <p className="text-neutral-500">En cours...</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
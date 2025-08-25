import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, BookOpen, ChevronRight, Play, CheckCircle2, Star, 
  ArrowLeft, Heart, Share, Download, FileText, BarChart3, User, Award,
  MessageCircle, ThumbsUp, Calendar, MapPin, Globe, Video, FileVideo
} from 'lucide-react';
import { courses } from '../../data/mockData';
import CourseCard from '../../components/elearning/CourseCard';
import Rating from '../../components/ui/Rating';
import VideoModal from '../../components/elearning/VideoModal';


interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  completed?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz';
  preview?: boolean;
  completed?: boolean;
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const courseInstructor = course?.instructor;
  
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userProgress, setUserProgress] = useState({
    enrolled: false,
    completed: 0,
    currentModule: 0,
    currentLesson: 0
  });

  // Données simulées pour les avis
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      user: 'Marie Konaté',
      rating: 5,
      comment: 'Excellent cours ! Les explications sont très claires et les techniques enseignées sont directement applicables.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: '2',
      user: 'Jean Traoré',
      rating: 4,
      comment: 'Contenu très utile pour mon exploitation. J\'aurais aimé plus d\'exemples pratiques.',
      date: '2024-01-10',
      helpful: 8
    }
  ]);

  // Données simulées pour les modules
  const [modules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction à l\'Agriculture Moderne',
      duration: '45 min',
      completed: true,
      lessons: [
        { id: '1-1', title: 'Bienvenue au cours', duration: '5 min', type: 'video', completed: true },
        { id: '1-2', title: 'Les défis de l\'agriculture contemporaine', duration: '15 min', type: 'video', completed: true },
        { id: '1-3', title: 'Guide des bonnes pratiques', duration: '10 min', type: 'article', completed: true },
        { id: '1-4', title: 'Quiz d\'introduction', duration: '15 min', type: 'quiz', completed: true }
      ]
    },
    {
      id: '2',
      title: 'Techniques de Production Durable',
      duration: '1h 30min',
      completed: false,
      lessons: [
        { id: '2-1', title: 'Principes de l\'agriculture durable', duration: '20 min', type: 'video', preview: true },
        { id: '2-2', title: 'Gestion des ressources naturelles', duration: '25 min', type: 'video' },
        { id: '2-3', title: 'Étude de cas: réussites locales', duration: '30 min', type: 'article' },
        { id: '2-4', title: 'Exercice pratique', duration: '15 min', type: 'quiz' }
      ]
    },
    {
      id: '3',
      title: 'Commercialisation et Marché',
      duration: '1h 15min',
      completed: false,
      lessons: [
        { id: '3-1', title: 'Stratégies de commercialisation', duration: '25 min', type: 'video' },
        {id: '3-2', title: 'Accès aux marchés locaux et internationaux', duration: '30 min', type: 'article' },
        { id: '3-3', title: 'Calcul de rentabilité', duration: '20 min', type: 'quiz' }
      ]
    }
  ]);

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.flatMap(m => m.lessons).filter(l => l.completed).length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | E-Learning CIAPO COOP-CA`;
    }
  }, [course]);

  const handleEnroll = () => {
    setUserProgress(prev => ({ ...prev, enrolled: true }));
    // Ici, vous ajouteriez la logique d'inscription réelle
  };

  const handleContinueLearning = () => {
    navigate(`/elearning/courses/${course?.id}/player`);
  };

  if (!course || !courseInstructor) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <Link to="/elearning/courses" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Retour aux cours
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 bg-neutral-50 min-h-screen">
      <div className="container-custom">
        {/* Navigation */}
        <motion.div 
          className="flex items-center text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-neutral-500 hover:text-neutral-700 transition-colors">Accueil</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/elearning" className="text-neutral-500 hover:text-neutral-700 transition-colors">E-Learning</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/elearning/courses" className="text-neutral-500 hover:text-neutral-700 transition-colors">Cours</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate max-w-xs">{course.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {course.level}
              </span>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

              <p className="text-neutral-600 text-lg mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center text-neutral-600">
                  <Clock size={20} className="mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <Users size={20} className="mr-2" />
                  <span>{course.enrolledStudents} étudiants</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <BookOpen size={20} className="mr-2" />
                  <span>{modules.length} modules • {totalLessons} leçons</span>
                </div>
                <div className="flex items-center">
                  <Rating rating={course.rating} />
                  <span className="ml-2 text-neutral-600">{course.rating} ({course.reviewCount} avis)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {course.tags?.map((tag, index) => (
                  <span key={index} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Navigation par onglets */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-neutral-200">
                <nav className="flex overflow-x-auto -mb-px">
                  {['overview', 'curriculum', 'instructor', 'reviews', 'resources'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-primary-500 text-primary-700'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      {tab === 'overview' && 'Aperçu'}
                      {tab === 'curriculum' && 'Programme'}
                      {tab === 'instructor' && 'Formateur'}
                      {tab === 'reviews' && 'Avis'}
                      {tab === 'resources' && 'Ressources'}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenu des onglets */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="prose max-w-none"
                    >
                      <h2 className="text-2xl font-bold mb-4">Description du cours</h2>
                      <p className="text-neutral-600 mb-6">{course.longDescription || course.description}</p>

                      <h2 className="text-2xl font-bold mb-4">Ce que vous apprendrez</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {[
                          "Comprendre les fondamentaux de l'agriculture moderne",
                          "Maîtriser les techniques de production durable",
                          "Gérer efficacement une exploitation agricole",
                          "Optimiser la commercialisation des produits",
                          "Appliquer les bonnes pratiques environnementales",
                          "Utiliser les outils numériques agricoles"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-neutral-700">{item}</span>
                          </div>
                        ))}
                      </div>

                      <h2 className="text-2xl font-bold mb-4">Public cible</h2>
                      <ul className="list-disc list-inside text-neutral-600 mb-8">
                        <li>Agriculteurs débutants et expérimentés</li>
                        <li>Étudiants en agronomie</li>
                        <li>Porteurs de projets agricoles</li>
                        <li>Techniciens agricoles</li>
                      </ul>

                      <h2 className="text-2xl font-bold mb-4">Prérequis</h2>
                      <p className="text-neutral-600">Aucun prérequis particulier. Ce cours est accessible à tous les passionnés d'agriculture.</p>
                    </motion.div>
                  )}

                  {activeTab === 'curriculum' && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Programme du cours</h2>
                        <div className="text-sm text-neutral-600">
                          {totalLessons} leçons • {course.duration}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {modules.map((module, moduleIndex) => (
                          <div key={module.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                            <div className="bg-neutral-50 px-6 py-4 flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold">Module {moduleIndex + 1}: {module.title}</h3>
                                <p className="text-sm text-neutral-600 flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {module.duration} • {module.lessons.length} leçons
                                </p>
                                              </div>
                                              {module.completed && (
                                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                  Terminé
                                                </div>
                                              )}
                                            </div>
                                            <div className="divide-y divide-neutral-100">
                                              {module.lessons.map((lesson, lessonIndex) => (
                                                <div key={lesson.id} className="px-6 py-4 flex items-center justify-between">
                                                  <div className="flex items-center">
                                                    <div className="mr-4">
                                                      {lesson.type === 'video' && <Video size={18} className="text-primary-600" />}
                                                      {lesson.type === 'article' && <FileText size={18} className="text-primary-600" />}
                                                      {lesson.type === 'quiz' && <BarChart3 size={18} className="text-primary-600" />}
                                                    </div>
                                                    <div>
                                                      <p className="font-medium">{lesson.title}</p>
                                                      <p className="text-sm text-neutral-600 flex items-center">
                                                        <Clock size={14} className="mr-1" />
                                                        {lesson.duration}
                                                        {lesson.preview && (
                                                          <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                                            Preview
                                                          </span>
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex items-center">
                                                    {lesson.completed ? (
                                                      <CheckCircle2 size={20} className="text-green-600" />
                                                    ) : (
                                                      <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}

                  {activeTab === 'instructor' && (
                    <motion.div
                      key="instructor"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-start gap-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{courseInstructor}</h2>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Avis des étudiants</h2>
                        <div className="flex items-center">
                          <div className="text-3xl font-bold mr-2">{course.rating}</div>
                          <div>
                            <Rating rating={course.rating} />
                            <p className="text-sm text-neutral-600">{course.reviewCount} avis</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold mr-3">
                                  {review.user.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{review.user}</p>
                                  <p className="text-sm text-neutral-500">{new Date(review.date).toLocaleDateString('fr-FR')}</p>
                                </div>
                              </div>
                              <Rating rating={review.rating} />
                            </div>
                            <p className="text-neutral-600 mb-3">{review.comment}</p>
                            <div className="flex items-center text-sm text-neutral-500">
                              <button className="flex items-center mr-4 hover:text-primary-600">
                                <ThumbsUp size={16} className="mr-1" />
                                Utile ({review.helpful})
                              </button>
                              <button className="flex items-center hover:text-primary-600">
                                <MessageCircle size={16} className="mr-1" />
                                Répondre
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'resources' && (
                    <motion.div
                      key="resources"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Ressources complémentaires</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center">
                            <FileText size={20} className="text-primary-600 mr-3" />
                            <div>
                              <p className="font-medium">Guide des bonnes pratiques agricoles</p>
                              <p className="text-sm text-neutral-600">PDF • 2.5 MB</p>
                            </div>
                                          </div>
                                          <button className="text-primary-600 hover:text-primary-700">
                                            <Download size={20} />
                                          </button>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                                          <div className="flex items-center">
                                            <FileVideo size={20} className="text-primary-600 mr-3" />
                                            <div>
                                              <p className="font-medium">Vidéo supplémentaire: Techniques avancées</p>
                                              <p className="text-sm text-neutral-600">MP4 • 15 min</p>
                                            </div>
                                          </div>
                                          <button className="text-primary-600 hover:text-primary-700">
                                            <Download size={20} />
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Player de vidéo */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-6 relative bg-neutral-900">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                    <span className="absolute bottom-4 left-4 text-white text-sm font-medium">
                      Voir l'aperçu
                    </span>
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2">
                    {course.price === 0 ? 'Gratuit' : `${course.price} FCFA`}
                  </h3>
                  <p className="text-neutral-600">Accès complet et illimité</p>
                </div>

                {userProgress.enrolled ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Votre progression</span>
                        <span className="text-sm text-primary-600">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <button 
                      onClick={handleContinueLearning}
                      className="button-primary w-full mb-4"
                    >
                      Continuer l'apprentissage
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="button-primary w-full mb-4"
                  >
                    S'inscrire maintenant
                  </button>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                    <span>Accès illimité à vie</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                    <span>Certificat de réussite</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                    <span>Support communautaire</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                    <span>Accès mobile et TV</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-200">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex-1 button-outline flex items-center justify-center"
                  >
                    <Heart size={18} className={isFavorite ? 'fill-current mr-2' : 'mr-2'} />
                    {isFavorite ? 'Favori' : 'Favoriser'}
                  </button>
                  <button className="flex-1 button-outline flex items-center justify-center">
                    <Share size={18} className="mr-2" />
                    Partager
                  </button>
                </div>
              </div>

              {/* Formateur */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Formateur</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="font-medium">{courseInstructor}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cours recommandés */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Cours recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter(c => c.id !== course.id && c.category === course.category)
              .slice(0, 3)
              .map((recommendedCourse, index) => (
                <CourseCard key={recommendedCourse.id} course={recommendedCourse} delay={index * 0.1} />
              ))}
          </div>
        </section>
      </div>

      {/* Modal de vidéo */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        course={course}
      />
    </div>
  );
};

export default CourseDetailPage;
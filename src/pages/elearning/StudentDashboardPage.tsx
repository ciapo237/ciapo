import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Award, BarChart3, Play, CheckCircle, 
  Calendar, Target, TrendingUp, Users, Star, Bookmark,
  Download, Bell, Settings, LogOut, ChevronRight, Trophy,
  BookText, Video, FileText, HelpCircle, Mail, MessageSquare
} from 'lucide-react';
import { courses } from '../../data/mockData';

// Types pour les données
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
  progress?: number;
  target?: number;
}

interface LearningGoal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  courses: string[];
}

interface RecentActivity {
  id: string;
  type: 'course' | 'quiz' | 'resource';
  title: string;
  description: string;
  time: string;
  courseId?: string;
}

const StudentDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  React.useEffect(() => {
    document.title = 'Tableau de Bord | E-Learning CIAPO COOP-CA';
  }, []);

  // Données simulées
  const enrolledCourses = courses.slice(0, 3);
  const completedCourses = courses.slice(3, 4);
  const recommendedCourses = courses.slice(4, 7);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Explorateur Agricole',
      description: 'Terminez votre premier cours',
      icon: <Award size={20} />,
      earned: true,
      date: '15 Fév 2025'
    },
    {
      id: '2',
      title: 'Étudiant Assidu',
      description: '10 heures d\'apprentissage',
      icon: <Clock size={20} />,
      earned: true,
      date: '20 Fév 2025'
    },
    {
      id: '3',
      title: 'Spécialiste des Cultures',
      description: 'Terminez 5 cours d\'agriculture',
      icon: <BookOpen size={20} />,
      earned: false,
      progress: 3,
      target: 5
    },
    {
      id: '4',
      title: 'Maître Formateur',
      description: 'Aidez 5 autres étudiants',
      icon: <Users size={20} />,
      earned: false,
      progress: 2,
      target: 5
    }
  ];

  const learningGoals: LearningGoal[] = [
    {
      id: '1',
      title: 'Maîtriser les techniques agricoles de base',
      targetDate: '30 Mars 2025',
      progress: 60,
      courses: ['Techniques de Base', 'Gestion des Cultures']
    },
    {
      id: '2',
      title: 'Obtenir la certification en agriculture durable',
      targetDate: '15 Avr 2025',
      progress: 30,
      courses: ['Agriculture Durable', 'Gestion Écologique']
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'course',
      title: 'Leçon terminée: Préparation du sol',
      description: 'Module Techniques de Base',
      time: 'Il y a 2 heures',
      courseId: '2'
    },
    {
      id: '2',
      type: 'quiz',
      title: 'Quiz réussi: Introduction à l\'agriculture',
      description: 'Score: 85%',
      time: 'Hier, 14:30',
      courseId: '1'
    },
    {
      id: '3',
      type: 'resource',
      title: 'Document téléchargé: Guide des semences',
      description: 'Module Techniques de Base',
      time: '25 Fév, 10:15',
      courseId: '2'
    }
  ];

  const stats = {
    enrolledCourses: enrolledCourses.length,
    completedCourses: completedCourses.length,
    learningHours: 24,
    certificates: 2,
    streak: 7,
    averageScore: 87
  };

  return (
    <div className="min-h-screen bg-neutral-50 mt-20">
      {/* Header Mobile */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <button 
          onClick={() => setShowMobileMenu(true)}
          className="p-2 rounded-lg bg-neutral-100"
        >
          <BarChart3 size={20} />
        </button>
        <h1 className="text-lg font-semibold">Tableau de bord</h1>
        <button className="p-2 rounded-lg bg-neutral-100">
          <Bell size={20} />
        </button>
      </div>

      <div className="container-custom py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.div
            className={`lg:col-span-1 ${showMobileMenu ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {showMobileMenu && (
              <button 
                onClick={() => setShowMobileMenu(false)}
                className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-neutral-100"
              >
                <span className="text-2xl">×</span>
              </button>
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <h2 className="text-xl font-semibold mb-1">Kouamé Koffi</h2>
                <p className="text-neutral-600 text-sm mb-3">Étudiant en Agriculture</p>
                <div className="flex items-center justify-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                  <TrendingUp size={14} />
                  <span>7 jours de suite</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1 mb-6">
                {[
                  { id: 'overview', icon: BarChart3, label: 'Vue d\'ensemble', active: true },
                  { id: 'courses', icon: BookOpen, label: 'Mes cours' },
                  { id: 'progress', icon: TrendingUp, label: 'Progression' },
                  { id: 'achievements', icon: Trophy, label: 'Réalisations' },
                  { id: 'goals', icon: Target, label: 'Objectifs' },
                  { id: 'calendar', icon: Calendar, label: 'Calendrier' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Secondary Navigation */}
              <div className="border-t border-neutral-200 pt-4">
                {[
                  { icon: Settings, label: 'Paramètres' },
                  { icon: HelpCircle, label: 'Aide & Support' },
                  { icon: LogOut, label: 'Déconnexion' }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white"
            >
              <h1 className="text-2xl font-bold mb-2">Bon retour, Kouamé !</h1>
              <p className="opacity-90 mb-4">Continuez votre apprentissage et développez vos compétences agricoles.</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {stats.learningHours}h d'apprentissage
                </span>
                <span className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  {stats.enrolledCourses} cours en cours
                </span>
                <span className="flex items-center">
                  <Award size={16} className="mr-1" />
                  {stats.certificates} certificats
                </span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {[
                {
                  icon: BookOpen,
                  value: stats.enrolledCourses,
                  label: 'Cours en cours',
                  color: 'text-blue-600'
                },
                {
                  icon: Clock,
                  value: `${stats.learningHours}h`,
                  label: 'Temps d\'apprentissage',
                  color: 'text-green-600'
                },
                {
                  icon: Award,
                  value: stats.certificates,
                  label: 'Certificats',
                  color: 'text-amber-600'
                },
                {
                  icon: Star,
                  value: `${stats.averageScore}%`,
                  label: 'Moyenne générale',
                  color: 'text-purple-600'
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg')} bg-opacity-10`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <span className="text-xl lg:text-2xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="text-neutral-600 text-sm">{stat.label}</h3>
                </div>
              ))}
            </motion.div>

            {/* Current Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Mes cours en cours</h2>
                <Link to="/elearning/courses" className="text-primary-600 hover:text-primary-700 text-sm">
                  Voir tous →
                </Link>
              </div>
              
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h5 className="font-semibold mb-1">{course.title}</h5>
                      <p className="text-neutral-600 text-sm mb-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-neutral-600 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>{course.duration}</span>
                          <span className="mx-2">•</span>
                          <span className="text-primary-600 font-medium">60% complété</span>
                        </div>
                        
                        <Link 
                          to={`/elearning/courses/${course.id}/player`}
                          className="button-primary text-sm px-4 py-2"
                        >
                          <Play size={16} className="mr-1" />
                          Continuer
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Progress and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Activités récentes</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                        {activity.type === 'course' && <Video size={16} className="text-primary-600" />}
                        {activity.type === 'quiz' && <FileText size={16} className="text-primary-600" />}
                        {activity.type === 'resource' && <Download size={16} className="text-primary-600" />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
                        <p className="text-neutral-600 text-xs mb-1">{activity.description}</p>
                        <span className="text-neutral-500 text-xs">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Voir toute l'activité →
                </button>
              </motion.div>

              {/* Learning Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Mes objectifs</h2>
                <div className="space-y-4">
                  {learningGoals.map((goal) => (
                    <div key={goal.id} className="p-4 rounded-lg border border-neutral-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">{goal.title}</h5>
                        <span className="text-primary-600 font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-primary-600 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-600">
                        <span>Échéance: {goal.targetDate}</span>
                        <span>{goal.progress}/100%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Définir un nouvel objectif →
                </button>
              </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Mes réalisations</h2>
                <span className="text-neutral-600 text-sm">
                  {achievements.filter(a => a.earned).length}/{achievements.length} obtenues
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-primary-200 bg-primary-50'
                        : 'border-neutral-200 bg-neutral-50 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-primary-100 text-primary-600' : 'bg-neutral-200 text-neutral-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-primary-900' : 'text-neutral-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-neutral-600">{achievement.description}</p>
                      </div>
                    </div>
                    
                    {achievement.earned ? (
                      <div className="text-xs text-primary-600 font-medium">
                        Obtenu le {achievement.date}
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-2">
                        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-600 rounded-full"
                            style={{ width: `${(achievement.progress / achievement.target!) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-neutral-600">
                          {achievement.progress}/{achievement.target} ({Math.round((achievement.progress / achievement.target!) * 100)}%)
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-neutral-500">
                        Non commencé
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Cours recommandés</h2>
                <Link to="/elearning/courses" className="text-primary-600 hover:text-primary-700 text-sm">
                  Explorer plus →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-sm line-clamp-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-neutral-600 mb-3">
                        <span>{course.duration}</span>
                        <span>{course.level}</span>
                      </div>
                      <Link 
                        to={`/elearning/courses/${course.id}`}
                        className="button-outline w-full text-sm py-2"
                      >
                        Voir le cours
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
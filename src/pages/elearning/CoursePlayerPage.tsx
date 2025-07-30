import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Download,
  MessageCircle,
  Settings
} from 'lucide-react';
import { courses } from '../../data/mockData';
import video1 from '../../assets/video/ciapo coop-ca.mp4'; // Adjusted path


const CoursePlayerPage: React.FC = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Mock course structure
  const courseModules = [
    {
      id: 1,
      title: "Introduction à l'Agriculture Moderne",
      lessons: [
        { id: 1, title: "Bienvenue dans le cours", duration: "5:30", completed: true },
        { id: 2, title: "Objectifs de la formation", duration: "8:15", completed: true },
        { id: 3, title: "Vue d'ensemble de l'agriculture moderne", duration: "12:45", completed: false }
      ]
    },
    {
      id: 2,
      title: "Techniques de Base",
      lessons: [
        { id: 4, title: "Préparation du sol", duration: "15:20", completed: false },
        { id: 5, title: "Sélection des semences", duration: "10:30", completed: false },
        { id: 6, title: "Techniques de plantation", duration: "18:45", completed: false }
      ]
    },
    {
      id: 3,
      title: "Gestion des Cultures",
      lessons: [
        { id: 7, title: "Irrigation et arrosage", duration: "14:15", completed: false },
        { id: 8, title: "Fertilisation naturelle", duration: "16:30", completed: false },
        { id: 9, title: "Protection contre les parasites", duration: "13:20", completed: false }
      ]
    }
  ];

  React.useEffect(() => {
    if (course) {
      document.title = `${course.title} - Cours | E-Learning CIAPO COOP-CA`;
    }
  }, [course]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const goToLesson = (moduleIndex: number, lessonIndex: number) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
    // In a real app, this would load the actual lesson video
  };

  const nextLesson = () => {
    const currentModuleData = courseModules[currentModule];
    if (currentLesson < currentModuleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < courseModules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(courseModules[currentModule - 1].lessons.length - 1);
    }
  };

  if (!course) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <Link to="/elearning/courses" className="text-primary-600 hover:text-primary-700">
          Retour aux cours
        </Link>
      </div>
    );
  }

  const currentModuleData = courseModules[currentModule];
  const currentLessonData = currentModuleData.lessons[currentLesson];

  return (
    <div className="pt-20 bg-black min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-neutral-900 px-6 py-3">
        <div className="flex items-center text-sm text-neutral-300">
          <Link to="/" className="hover:text-white">Accueil</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/elearning" className="hover:text-white">E-Learning</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/elearning/courses/${course.id}`} className="hover:text-white">{course.title}</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-white">{currentLessonData.title}</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="relative bg-black w-full min-h-[500px]">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              poster={course.imageUrl}
            >
              {/* <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" /> */}
              <source src={video1} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button onClick={previousLesson} className="text-white hover:text-primary-400">
                    <SkipBack size={24} />
                  </button>
                  
                  <button onClick={togglePlay} className="text-white hover:text-primary-400">
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  
                  <button onClick={nextLesson} className="text-white hover:text-primary-400">
                    <SkipForward size={24} />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button onClick={toggleMute} className="text-white hover:text-primary-400">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Speed Control */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                    className="bg-neutral-800 text-white text-sm rounded px-2 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>

                  <button onClick={toggleFullscreen} className="text-white hover:text-primary-400">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-neutral-900 p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{currentLessonData.title}</h1>
            <p className="text-neutral-300 mb-4">
              Module {currentModule + 1}: {currentModuleData.title}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{currentLessonData.duration}</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>{course.enrolledStudents} étudiants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-neutral-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              className={`flex-1 px-4 py-3 text-sm font-medium ${!showNotes ? 'text-white bg-neutral-700' : 'text-neutral-400 hover:text-white'}`}
              onClick={() => setShowNotes(false)}
            >
              <BookOpen size={16} className="inline mr-2" />
              Contenu
            </button>
            <button 
              className={`flex-1 px-4 py-3 text-sm font-medium ${showNotes ? 'text-white bg-neutral-700' : 'text-neutral-400 hover:text-white'}`}
              onClick={() => setShowNotes(true)}
            >
              <MessageCircle size={16} className="inline mr-2" />
              Notes
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!showNotes ? (
              /* Course Content */
              <div className="p-4">
                {courseModules.map((module, moduleIndex) => (
                  <div key={module.id} className="mb-6">
                    <h3 className="text-white font-semibold mb-3">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => goToLesson(moduleIndex, lessonIndex)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            currentModule === moduleIndex && currentLesson === lessonIndex
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle size={16} className="text-success-500 mr-2" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-neutral-500 rounded-full mr-2"></div>
                              )}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-neutral-400">{lesson.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Notes */
              <div className="p-4">
                <h3 className="text-white font-semibold mb-4">Mes Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Prenez des notes pendant le cours..."
                  className="w-full h-64 p-3 bg-neutral-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="mt-3 w-full button-primary text-sm py-2">
                  <Download size={16} className="mr-2" />
                  Télécharger les notes
                </button>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="p-4 border-t border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Progression</span>
              <span className="text-primary-400 text-sm">65%</span>
            </div>
            <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-primary-600 rounded-full"></div>
            </div>
            <p className="text-neutral-400 text-xs mt-2">
              6 leçons sur 9 terminées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;
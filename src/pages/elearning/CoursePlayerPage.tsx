import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, BookOpen, CheckCircle, Clock, Users, Download,
  MessageCircle, Settings, Bookmark, BookmarkCheck, Captions, Type,
  ChevronLeft, ChevronDown, ChevronUp, HelpCircle, Keyboard, X
} from 'lucide-react';
import { courses } from '../../data/mockData';
import video1 from '../../assets/video/ciapo coop-ca.mp4';

// Types pour les données
interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  resources?: string[];
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

interface Bookmark {
  id: string;
  time: number;
  note: string;
  lessonId: number;
  moduleId: number;
}

interface Note {
  id: string;
  content: string;
  timestamp: number;
  lessonId: number;
  moduleId: number;
}

const CoursePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'bookmarks' | 'resources'>('content');
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);

  // Mock course structure with enhanced data
  const [courseModules] = useState<Module[]>([
    {
      id: 1,
      title: "Introduction à l'Agriculture Moderne",
      completed: true,
      lessons: [
        { id: 1, title: "Bienvenue dans le cours", duration: "5:30", completed: true },
        { id: 2, title: "Objectifs de la formation", duration: "8:15", completed: true },
        { id: 3, title: "Vue d'ensemble de l'agriculture moderne", duration: "12:45", completed: false }
      ]
    },
    {
      id: 2,
      title: "Techniques de Base",
      completed: false,
      lessons: [
        { id: 4, title: "Préparation du sol", duration: "15:20", completed: false },
        { id: 5, title: "Sélection des semences", duration: "10:30", completed: false },
        { id: 6, title: "Techniques de plantation", duration: "18:45", completed: false }
      ]
    },
    {
      id: 3,
      title: "Gestion des Cultures",
      completed: false,
      lessons: [
        { id: 7, title: "Irrigation et arrosage", duration: "14:15", completed: false },
        { id: 8, title: "Fertilisation naturelle", duration: "16:30", completed: false },
        { id: 9, title: "Protection contre les parasites", duration: "13:20", completed: false }
      ]
    }
  ]);

  const currentModuleData = courseModules[currentModule];
  const currentLessonData = currentModuleData.lessons[currentLesson];
  const totalLessons = courseModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = courseModules.flatMap(m => m.lessons).filter(l => l.completed).length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  useEffect(() => {
    if (course) {
      document.title = `${currentLessonData.title} - ${course.title} | E-Learning CIAPO COOP-CA`;
    }
  }, [course, currentLessonData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(10);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(-10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(-0.1);
          break;
        case 'b':
          e.preventDefault();
          addBookmark();
          break;
        case 'n':
          e.preventDefault();
          setActiveTab('notes');
          break;
        case '?':
          e.preventDefault();
          setShowShortcuts(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, [volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!playerContainerRef.current) return;

    try {
      if (!isFullscreen) {
        await playerContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, []);

  const goToLesson = useCallback((moduleIndex: number, lessonIndex: number) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
    // Reset playback state when changing lessons
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const nextLesson = useCallback(() => {
    const currentModuleData = courseModules[currentModule];
    if (currentLesson < currentModuleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < courseModules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    }
  }, [currentModule, currentLesson, courseModules]);

  const previousLesson = useCallback(() => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(courseModules[currentModule - 1].lessons.length - 1);
    }
  }, [currentModule, currentLesson, courseModules]);

  const addBookmark = useCallback(() => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      time: currentTime,
      note: '',
      lessonId: currentLessonData.id,
      moduleId: currentModuleData.id
    };
    setBookmarks(prev => [...prev, newBookmark]);
  }, [currentTime, currentLessonData, currentModuleData]);

  const removeBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  }, []);

  const addNote = useCallback(() => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote,
        timestamp: currentTime,
        lessonId: currentLessonData.id,
        moduleId: currentModuleData.id
      };
      setNotes(prev => [...prev, newNote]);
      setCurrentNote('');
    }
  }, [currentNote, currentTime, currentLessonData, currentModuleData]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const formatDuration = useCallback((durationStr: string) => {
    const [minutes, seconds] = durationStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }, []);

  const goToBookmark = useCallback((bookmark: Bookmark) => {
    if (bookmark.moduleId !== currentModuleData.id || bookmark.lessonId !== currentLessonData.id) {
      const moduleIndex = courseModules.findIndex(m => m.id === bookmark.moduleId);
      const lessonIndex = courseModules[moduleIndex].lessons.findIndex(l => l.id === bookmark.lessonId);
      goToLesson(moduleIndex, lessonIndex);
    }
    
    if (videoRef.current) {
      videoRef.current.currentTime = bookmark.time;
      setCurrentTime(bookmark.time);
    }
  }, [currentModuleData, currentLessonData, courseModules, goToLesson]);

  if (!course) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <Link to="/elearning/courses" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
          <ChevronLeft size={16} className="mr-2" />
          Retour aux cours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 min-h-screen">
      {/* Header */}
      <div className="bg-neutral-900 px-6 py-3 mt-20 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-neutral-300">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/elearning" className="hover:text-white transition-colors">E-Learning</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/elearning/courses/${course.id}`} className="hover:text-white transition-colors truncate max-w-xs">
              {course.title}
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white truncate max-w-xs">{currentLessonData.title}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowShortcuts(true)}
              className="text-neutral-400 hover:text-white transition-colors"
              title="Raccourcis clavier"
            >
              <Keyboard size={18} />
            </button>
            <Link
              to={`/elearning/courses/${course.id}`}
              className="text-neutral-400 hover:text-white transition-colors"
              title="Retour au cours"
            >
              <ChevronLeft size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Video Player */}
        <div 
          ref={playerContainerRef}
          className="flex-1 flex flex-col relative bg-black group"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            poster={course.imageUrl}
          >
            <source src={video1} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {/* Video Overlay Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6"
              >
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-neutral-300 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-neutral-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={previousLesson}
                      className="text-white hover:text-primary-400 transition-colors p-2"
                      title="Leçon précédente"
                    >
                      <SkipBack size={24} />
                    </button>
                    
                    <button 
                      onClick={togglePlay}
                      className="text-white hover:text-primary-400 transition-colors p-2 bg-primary-600 rounded-full"
                      title={isPlaying ? 'Pause' : 'Lecture'}
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    
                    <button 
                      onClick={nextLesson}
                      className="text-white hover:text-primary-400 transition-colors p-2"
                      title="Leçon suivante"
                    >
                      <SkipForward size={24} />
                    </button>

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={toggleMute}
                        className="text-white hover:text-primary-400 transition-colors p-2"
                        title={isMuted ? 'Activer le son' : 'Désactiver le son'}
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                      />
                    </div>

                    <span className="text-white text-sm font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      className={`p-2 rounded transition-colors ${
                        subtitlesEnabled 
                          ? 'text-primary-400 bg-primary-400/10' 
                          : 'text-white hover:text-primary-400'
                      }`}
                      title="Sous-titres"
                    >
                      <Captions size={20} />
                    </button>

                    <select
                      value={playbackSpeed}
                      onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                      className="bg-neutral-800 text-white text-sm rounded px-3 py-1 border border-neutral-600 focus:outline-none focus:border-primary-500"
                      title="Vitesse de lecture"
                    >
                      <option value={0.5}>0.5×</option>
                      <option value={0.75}>0.75×</option>
                      <option value={1}>1×</option>
                      <option value={1.25}>1.25×</option>
                      <option value={1.5}>1.5×</option>
                      <option value={2}>2×</option>
                    </select>

                    <button
                      onClick={addBookmark}
                      className="text-white hover:text-primary-400 transition-colors p-2"
                      title="Ajouter un signet (B)"
                    >
                      <Bookmark size={20} />
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-primary-400 transition-colors p-2"
                      title="Plein écran (F)"
                    >
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>

                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:text-primary-400 transition-colors p-2"
                      title="Paramètres"
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lesson title overlay */}
          <div className="absolute top-4 left-4 bg-black/70 rounded-lg px-4 py-2">
            <h2 className="text-white text-sm font-medium">{currentLessonData.title}</h2>
          </div>

          {/* Play/Pause center button */}
          {!showControls && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <div className="bg-black/50 rounded-full p-4">
                {isPlaying ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white ml-2" />}
              </div>
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-neutral-900 flex flex-col border-l border-neutral-800">
          {/* Tabs */}
          <div className="flex border-b border-neutral-800">
            {[
              { id: 'content' as const, icon: BookOpen, label: 'Contenu' },
              { id: 'notes' as const, icon: MessageCircle, label: 'Notes' },
              { id: 'bookmarks' as const, icon: Bookmark, label: 'Signets' },
              { id: 'resources' as const, icon: Download, label: 'Ressources' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors ${
                  activeTab === tab.id
                    ? 'text-white bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'content' && (
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4 text-lg">Progression du cours</h3>
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">Total complété</span>
                      <span className="text-primary-400 text-sm font-medium">{progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-neutral-400 text-xs mt-2">
                      {completedLessons} leçons sur {totalLessons} terminées
                    </p>
                  </div>
                </div>

                {courseModules.map((module, moduleIndex) => (
                  <div key={module.id} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">
                        Module {moduleIndex + 1}: {module.title}
                      </h4>
                      {module.completed && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => goToLesson(moduleIndex, lessonIndex)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            currentModule === moduleIndex && currentLesson === lessonIndex
                              ? 'bg-primary-600 text-white shadow-lg'
                              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-neutral-500 rounded-full mr-3 flex-shrink-0"></div>
                              )}
                              <span className="text-sm truncate">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded ml-2 flex-shrink-0">
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="p-4">
                <h3 className="text-white font-semibold mb-4 text-lg">Mes Notes</h3>
                
                <div className="mb-4">
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Prenez des notes pendant le cours..."
                    className="w-full h-24 p-3 bg-neutral-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 border border-neutral-700"
                    onKeyDown={(e) => {
                      if (e.ctrlKey && e.key === 'Enter') {
                        addNote();
                      }
                    }}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-neutral-400 text-xs">
                      Ctrl+Enter pour sauvegarder
                    </span>
                    <button
                      onClick={addNote}
                      disabled={!currentNote.trim()}
                      className="button-primary text-sm px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {notes.filter(note => 
                    note.moduleId === currentModuleData.id && 
                    note.lessonId === currentLessonData.id
                  ).map((note) => (
                    <div key={note.id} className="bg-neutral-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-primary-400 text-sm">
                          {formatTime(note.timestamp)}
                        </span>
                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = note.timestamp;
                              setCurrentTime(note.timestamp);
                            }
                          }}
                          className="text-neutral-400 hover:text-white text-xs"
                        >
                          Aller à
                        </button>
                      </div>
                      <p className="text-white text-sm">{note.content}</p>
                    </div>
                  ))}
                  
                  {notes.filter(note => 
                    note.moduleId === currentModuleData.id && 
                    note.lessonId === currentLessonData.id
                  ).length === 0 && (
                    <p className="text-neutral-400 text-sm text-center py-8">
                      Aucune note pour cette leçon
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div className="p-4">
                <h3 className="text-white font-semibold mb-4 text-lg">Mes Signets</h3>
                
                <div className="space-y-3">
                  {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bg-neutral-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-primary-400 text-sm">
                          {formatTime(bookmark.time)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => goToBookmark(bookmark)}
                            className="text-neutral-400 hover:text-white text-xs"
                          >
                            Aller à
                          </button>
                          <button
                            onClick={() => removeBookmark(bookmark.id)}
                            className="text-neutral-400 hover:text-red-400 text-xs"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                      {bookmark.note && (
                        <p className="text-white text-sm mb-2">{bookmark.note}</p>
                      )}
                      <p className="text-neutral-400 text-xs">
                        Leçon: {courseModules
                          .find(m => m.id === bookmark.moduleId)?.lessons
                          .find(l => l.id === bookmark.lessonId)?.title}
                      </p>
                    </div>
                  ))}
                  
                  {bookmarks.length === 0 && (
                    <p className="text-neutral-400 text-sm text-center py-8">
                      Aucun signet. Appuyez sur 'B' pour ajouter un signet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-4">
                <h3 className="text-white font-semibold mb-4 text-lg">Ressources</h3>
                
                <div className="space-y-3">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Documents du cours</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors flex items-center justify-between">
                        <span className="text-white text-sm">Guide des bonnes pratiques.pdf</span>
                        <Download size={16} className="text-neutral-400" />
                      </button>
                      <button className="w-full text-left p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors flex items-center justify-between">
                        <span className="text-white text-sm">Fiches techniques.docx</span>
                        <Download size={16} className="text-neutral-400" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Liens utiles</h4>
                    <div className="space-y-2">
                      <a href="#" className="block text-primary-400 hover:text-primary-300 text-sm">
                        Site web de la coopérative
                      </a>
                      <a href="#" className="block text-primary-400 hover:text-primary-300 text-sm">
                        Documentation technique
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-neutral-800">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={previousLesson}
                disabled={currentModule === 0 && currentLesson === 0}
                className="button-outline text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={16} className="mr-1" />
                Précédent
              </button>
              <button
                onClick={nextLesson}
                disabled={currentModule === courseModules.length - 1 && 
                         currentLesson === courseModules[courseModules.length - 1].lessons.length - 1}
                className="button-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <SkipForward size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Raccourcis clavier</h3>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">Espace</span>
                  <span className="text-white">Lecture/Pause</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">F</span>
                  <span className="text-white">Plein écran</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">M</span>
                  <span className="text-white">Activer/Désactiver le son</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">← →</span>
                  <span className="text-white">Avancer/Reculer de 10s</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">↑ ↓</span>
                  <span className="text-white">Augmenter/Diminuer le volume</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">B</span>
                  <span className="text-white">Ajouter un signet</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-300">N</span>
                  <span className="text-white">Onglet Notes</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-300">?</span>
                  <span className="text-white">Afficher cette aide</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default CoursePlayerPage;
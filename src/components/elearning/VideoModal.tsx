import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { Course } from '../../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, course }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-4xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <button 
            onClick={handleClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="aspect-w-16 aspect-h-9">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            autoPlay
          >
            <source src={course.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
        
        <div className="p-4 bg-neutral-50">
          <p className="text-neutral-600">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
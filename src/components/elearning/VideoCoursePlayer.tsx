import { useState, useRef } from 'react';
import './VideoCoursePlayer.css';
import { VideoCourse } from '../../types';
import Course1 from '../../assets/video/ciapo coop-ca.mp4';

const VideoCoursePlayer = ({  }: VideoCourse) => {
  const [currentVideo, setCurrentVideo] = useState<VideoCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const courses: VideoCourse[] = [
    {
      id: 'course1',
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript',
      duration: '2 hours | 15 lessons',
      thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
      videoUrl: Course1,
    },
    {
      id: 'course2',
      title: 'Advanced JavaScript Patterns',
      description: 'Master design patterns and advanced concepts',
      duration: '3.5 hours | 22 lessons',
      thumbnail: 'https://via.placeholder.com/800x450?text=Advanced+Course',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
    },
  ];

  const openVideoModal = (course: VideoCourse) => {
    setCurrentVideo(course);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="course-container">
      {/* <h1>Available Courses</h1> */}

      {/* {courses.map((course) => (
        <div
          key={course.id}
          className="course-card"
          onClick={() => openVideoModal(course)}
        >
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
            <div className="play-button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="course-info">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="duration">{course.duration}</p>
          </div>
        </div>
      ))} */}

      {isModalOpen && currentVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoModal}>
              &times;
            </button>
            <video ref={videoRef} controls autoPlay>
              <source src={currentVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-info">
              <h2>{currentVideo.title}</h2>
              <p>{currentVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCoursePlayer;

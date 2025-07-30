import React from 'react';
import ELearningHero from '../components/elearning/Hero';
import CourseList from '../components/elearning/CourseList';
import CallToAction from '../components/home/CallToAction';

const ELearningPage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'Plateforme E-Learning | CIAPO COOP-CA';
  }, []);

  return (
    <div>
      <ELearningHero />
      <CourseList />
      <CallToAction />
    </div>
  );
};

export default ELearningPage;
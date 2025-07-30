import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ELearningPage from './pages/ELearningPage';
import MarketplacePage from './pages/MarketplacePage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import ProductListPage from './pages/marketplace/ProductListPage';
import ProductDetailPage from './pages/marketplace/ProductDetailPage';
import SellerProfilePage from './pages/marketplace/SellerProfilePage';
import CourseListPage from './pages/elearning/CourseListPage';
import CourseDetailPage from './pages/elearning/CourseDetailPage';
import StudentDashboardPage from './pages/elearning/StudentDashboardPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import VideoCoursePlayer from './components/elearning/VideoCoursePlayer';
import RegistrationPage from './pages/RegistrationPage';
import CoursePlayerPage from './pages/elearning/CoursePlayerPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/elearning" element={<ELearningPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:id" element={<ProgramDetailPage />} />
            <Route path="/programs/:id/register" element={<RegistrationPage />} />
            <Route path="/marketplace/products" element={<ProductListPage />} />
            <Route path="/marketplace/products/:id" element={<ProductDetailPage />} />
            <Route path="/marketplace/sellers/:id" element={<SellerProfilePage />} />
            <Route path="/elearning/courses" element={<CourseListPage />} />
            <Route path="/elearning/courses/:id" element={<CourseDetailPage />} />
            <Route path="/elearning/courses/:id/player" element={<CoursePlayerPage />} />
            <Route path="/elearning/courses/video/:id" element={<VideoCoursePlayer />} />
            <Route path="/elearning/dashboard" element={<StudentDashboardPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
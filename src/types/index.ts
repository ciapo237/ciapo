export interface TrainingModule {
  title: string;
  duration: string;
  objective: string;
  topics: string[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  cost: string;
  imageUrl: string;
  pdfUrl: string;
  modules?: TrainingModule[];
  deliverables?: string[];
  targetAudience?: string[];
  format?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  author: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  imageUrl: string;
  modules: number;
  enrolledStudents: number;
  videoDuration: string;
  thumbnail: string;
  videoUrl: string;
}

// export type VideoCourse = {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   thumbnail: string;
//   videoUrl: string;
// };

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  available: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  provider: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  category: string;
  imageUrl: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'headquarters' | 'training-center' | 'marketplace';
  phone: string;
  email: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
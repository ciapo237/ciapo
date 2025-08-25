import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Calendar, Clock, Users, MapPin, CheckCircle2, 
  Percent, ArrowRight, Download, Share, Heart, BookOpen, 
  Play, Award, User, Star, MessageCircle, Phone, Mail,
  ChevronDown, ChevronUp, Bookmark, X, Facebook, Twitter, Linkedin
} from 'lucide-react';
import { programs } from '../data/mockData';
import Modal from '../components/programs/Modal';
import ImageGallery from '../components/programs/ImageGallery';
import ProgramCard from '../components/programs/ProgramCard';

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find(p => p.id === id);
  
  const [showBrochure, setShowBrochure] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  React.useEffect(() => {
    if (program) {
      document.title = `${program.title} | CIAPO COOP-CA`;
    }
  }, [program]);

  // Données simulées pour la FAQ
  const faqItems = useMemo(() => [
    {
      question: "Quelles sont les conditions d'admission pour ce programme ?",
      answer: "Les conditions d'admission incluent un niveau minimum de formation, une lettre de motivation, et parfois une expérience préalable dans le domaine. Des dérogations sont possibles sur dossier."
    },
    {
      question: "Comment se déroule le processus de sélection ?",
      answer: "Le processus comprend l'analyse du dossier de candidature, un entretien motivationnel, et parfois des tests techniques. La sélection se fait sur la base du potentiel et de la motivation."
    },
    {
      question: "Y a-t-il des possibilités de financement ?",
      answer: "Plusieurs options de financement sont disponibles : bourses d'études, paiement échelonné, financement par des organismes partenaires, et possibilités d'emploi-formation."
    },
    {
      question: "Le programme inclut-il un stage pratique ?",
      answer: "Oui, tous nos programmes incluent un stage pratique en entreprise d'une durée variable selon le programme, avec accompagnement pour la recherche de stage."
    },
    {
      question: "Quelle est la reconnaissance du certificat ?",
      answer: "Notre certificat est reconnu par le ministère de l'Agriculture et est valorisé par les employeurs du secteur. Il atteste des compétences techniques et pratiques acquises."
    }
  ], []);

  // Programmes similaires
  const similarPrograms = useMemo(() => 
    programs
      .filter(p => p.id !== program?.id && p.category === program?.category)
      .slice(0, 3),
    [program]
  );

  if (!program) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Programme non trouvé</h1>
        <Link to="/programs" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
          <ArrowRight size={16} className="mr-2 transform rotate-180" />
          Retour aux programmes
        </Link>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const shareProgram = (platform: string) => {
    const shareUrl = window.location.href;
    const title = `Découvrez le programme: ${program.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.imageUrl})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.div 
            className="flex items-center text-neutral-200 text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/programs" className="hover:text-white transition-colors">Programmes</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium truncate max-w-xs">{program.title}</span>
          </motion.div>

          {/* Program Header */}
          <div className="max-w-4xl">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {program.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {program.description}
            </motion.p>
            
            {/* Program Metadata */}
            <motion.div 
              className="flex flex-wrap gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex items-center text-white">
                <Calendar size={20} className="mr-2" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center text-white">
                <Clock size={20} className="mr-2" />
                <span>{program.format}</span>
              </div>
              <div className="flex items-center text-white">
                <Users size={20} className="mr-2" />
                <span>{program.availableSpots} places disponibles</span>
              </div>
              <div className="flex items-center text-white">
                <MapPin size={20} className="mr-2" />
                <span>{program.location}</span>
              </div>
              {program.level && (
                <div className="flex items-center text-white">
                  <Award size={20} className="mr-2" />
                  <span className="capitalize">{program.level}</span>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link 
                to={`/programs/${program.id}/register`}
                className="button-primary px-8 py-3 text-lg"
              >
                S'inscrire maintenant
              </Link>
              
              <button 
                className="button-outline border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3"
                onClick={() => setShowBrochure(true)}
              >
                <Download size={20} className="mr-2" />
                Brochure
              </button>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg transition-colors ${
                    isFavorite 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <Share size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10"
                      >
                        <button
                          onClick={() => shareProgram('facebook')}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-neutral-100 rounded-md text-neutral-700"
                        >
                          <Facebook size={16} className="text-blue-600" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => shareProgram('twitter')}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-neutral-100 rounded-md text-neutral-700"
                        >
                          <Twitter size={16} className="text-blue-400" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => shareProgram('linkedin')}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-neutral-100 rounded-md text-neutral-700"
                        >
                          <Linkedin size={16} className="text-blue-700" />
                          <span>LinkedIn</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Navigation Tabs */}
          <div className="border-b border-neutral-200 mb-12">
            <nav className="flex overflow-x-auto -mb-px">
              {[
                { id: 'overview', label: 'Vue d\'ensemble' },
                { id: 'curriculum', label: 'Programme' },
                { id: 'instructors', label: 'Formateurs' },
                { id: 'testimonials', label: 'Témoignages' },
                { id: 'faq', label: 'FAQ' },
                { id: 'admission', label: 'Admission' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Target Audience */}
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold mb-6">Public Cible</h2>
                      <div className="flex flex-wrap gap-3">
                        {program.targetAudience?.map((audience, index) => (
                          <span 
                            key={index}
                            className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {audience}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Program Objectives */}
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold mb-6">Objectifs du Programme</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {program.objectives?.map((objective, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-neutral-700">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Opportunities */}
                    {program.careerOpportunities && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Débouchés Professionnels</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {program.careerOpportunities.map((opportunity, index) => (
                            <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-primary-700 mb-2">{opportunity.title}</h3>
                              <p className="text-neutral-600 text-sm">{opportunity.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Image Gallery */}
                    {program.gallery && program.gallery.length > 0 && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Galerie du Programme</h2>
                        <ImageGallery images={program.gallery} />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <motion.div
                    key="curriculum"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Programme Détaillé</h2>
                    <div className="space-y-6">
                      {program.modules?.map((module, index) => (
                        <div key={index} className="bg-neutral-50 p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-primary-900">{module.title}</h3>
                              <p className="text-neutral-600 mt-1">{module.objective}</p>
                            </div>
                            <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full whitespace-nowrap">
                              {module.duration}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-primary-700 mb-2">Contenu du module:</h4>
                            <ul className="space-y-2">
                              {module.topics?.map((topic, i) => (
                                <li key={i} className="flex items-center">
                                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></span>
                                  <span className="text-neutral-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {module.learningOutcomes && (
                            <div>
                              <h4 className="font-medium text-primary-700 mb-2">Compétences acquises:</h4>
                              <div className="flex flex-wrap gap-2">
                                {module.learningOutcomes.map((outcome, i) => (
                                  <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-neutral-600 border">
                                    {outcome}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Deliverables */}
                    {program.deliverables && (
                      <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Livrables et Certifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {program.deliverables.map((item, index) => (
                            <div key={index} className="flex items-start bg-white p-4 rounded-lg border">
                              <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-neutral-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Questions Fréquentes</h2>
                    <div className="space-y-4">
                      {faqItems.map((faq, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-neutral-50 transition-colors"
                          >
                            <span className="font-medium text-primary-900">{faq.question}</span>
                            {expandedFaq === index ? (
                              <ChevronUp size={20} className="text-primary-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown size={20} className="text-primary-600 flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedFaq === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 bg-neutral-50 border-t">
                                  <p className="text-neutral-700">{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Admission Tab */}
                {activeTab === 'admission' && (
                  <motion.div
                    key="admission"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Processus d'Admission</h2>
                    
                    <div className="bg-primary-50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4">Prochaine Session</h3>
                      <div className="flex items-center gap-4 text-primary-700">
                        <Calendar size={20} />
                        <span>Début: {program.nextStartDate}</span>
                      </div>
                      <p className="text-sm text-primary-600 mt-2">
                        Date limite d'inscription: {program.applicationDeadline}
                      </p>
                    </div>

                    <div className="space-y-8">
                      {[
                        {
                          step: 1,
                          title: "Dépôt de candidature",
                          description: "Remplissez le formulaire en ligne et téléchargez les documents requis",
                          duration: "24-48h de traitement"
                        },
                        {
                          step: 2,
                          title: "Entretien motivationnel",
                          description: "Rencontre avec notre équipe pédagogique pour discuter de vos objectifs",
                          duration: "30 minutes environ"
                        },
                        {
                          step: 3,
                          title: "Tests techniques",
                          description: "Évaluation des compétences de base selon le programme choisi",
                          duration: "1-2 heures"
                        },
                        {
                          step: 4,
                          title: "Décision d'admission",
                          description: "Réception de la réponse sous 5 jours ouvrables",
                          duration: ""
                        },
                        {
                          step: 5,
                          title: "Inscription définitive",
                          description: "Finalisation administrative et paiement des frais",
                          duration: ""
                        }
                      ].map((step, index) => (
                        <div key={index} className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                              {step.step}
                            </div>
                            {index < 4 && (
                              <div className="w-1 h-16 bg-primary-200 my-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h3 className="text-lg font-semibold text-primary-900 mb-2">{step.title}</h3>
                            <p className="text-neutral-600 mb-2">{step.description}</p>
                            {step.duration && (
                              <p className="text-sm text-primary-600">{step.duration}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white border rounded-lg p-6 mt-8">
                      <h3 className="text-lg font-semibold mb-4">Documents Requis</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                          <span>CV à jour</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                          <span>Lettre de motivation</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                          <span>Copie des diplômes</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                          <span>Pièce d'identité</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-primary-600 mr-2" />
                          <span>Photo d'identité</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-primary-50 border border-primary-200 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-primary-900 mb-4">Inscription</h3>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary-700 mb-2">
                      {program.cost}
                    </div>
                    <p className="text-primary-600 text-sm">Formation complète avec certification</p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-primary-900">Ce qui est inclus:</h4>
                    {[
                      "Accès à toutes les ressources pédagogiques",
                      "Encadrement personnalisé par des experts",
                      "Certification reconnue par l'État",
                      "Stage pratique en entreprise",
                      "Accès à la plateforme en ligne",
                      "Support technique pendant 6 mois"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 size={16} className="text-primary-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-primary-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Benefits */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-primary-900">Avantages supplémentaires:</h4>
                    {[
                      "Assurance risque incluse",
                      "Déjeuner offert les jours de formation",
                      "Accès à l'espace coworking",
                      "Réseau alumni exclusif",
                      "Service d'orientation professionnelle"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 size={16} className="text-primary-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-primary-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={`/programs/${program.id}/register`}
                    className="button-primary w-full mb-4 text-center block"
                  >
                    S'inscrire maintenant
                  </Link>
                  
                  <button 
                    className="button-outline w-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                    onClick={() => setShowBrochure(true)}
                  >
                    <Download size={16} className="mr-2" />
                    Télécharger la brochure
                  </button>

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-primary-200">
                    <p className="text-sm text-primary-700 mb-3">Questions ? Contactez-nous:</p>
                    <div className="space-y-2">
                      <a href="tel:+237699999999" className="flex items-center text-primary-600 hover:text-primary-700 text-sm">
                        <Phone size={16} className="mr-2" />
                        +237 699 999 999
                      </a>
                      <a href="mailto:formation@ciapo-coopca.cm" className="flex items-center text-primary-600 hover:text-primary-700 text-sm">
                        <Mail size={16} className="mr-2" />
                        formation@ciapo-coopca.cm
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Facts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-4">En Bref</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Début:</span>
                      <span className="font-medium">{program.nextStartDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Durée:</span>
                      <span className="font-medium">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Format:</span>
                      <span className="font-medium capitalize">{program.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Niveau:</span>
                      <span className="font-medium capitalize">{program.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Places:</span>
                      <span className="font-medium">{program.availableSpots} disponibles</span>
                    </div>
                  </div>
                </motion.div>

                {/* Scholarship Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-success-50 border border-success-200 rounded-xl p-6"
                >
                  <h3 className="font-semibold text-success-900 mb-3">Bourses Disponibles</h3>
                  <p className="text-success-700 text-sm mb-3">
                    Des bourses couvrant jusqu'à 50% des frais de formation sont disponibles pour les candidats éligibles.
                  </p>
                  <button className="text-success-700 hover:text-success-800 text-sm font-medium">
                    En savoir plus →
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Programs */}
      {similarPrograms.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Programmes Similaires</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Découvrez d'autres formations qui pourraient vous intéresser dans la même catégorie.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} delay={index * 0.1} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/programs" className="button-primary">
                Voir tous les programmes
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brochure Modal */}
      <Modal
        isOpen={showBrochure}
        onClose={() => setShowBrochure(false)}
        title={`Brochure: ${program.title}`}
        size="lg"
      >
        <div className="aspect-[210/297] bg-gray-100 rounded-lg">
          {program.brochureUrl ? (
            <iframe
              src={program.brochureUrl}
              className="w-full h-[600px] rounded-lg"
              title="Brochure du programme"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <Download size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-500 text-center mb-4">
                La brochure n'est pas disponible pour le moment.
              </p>
              <p className="text-gray-400 text-sm text-center">
                Contactez-nous pour obtenir plus d'informations sur ce programme.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
          <button
            onClick={() => setShowBrochure(false)}
            className="button-outline"
          >
            Fermer
          </button>
          {program.brochureUrl && (
            <a
              href={program.brochureUrl}
              download
              className="button-primary"
            >
              <Download size={16} className="mr-2" />
              Télécharger
            </a>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProgramDetailPage;
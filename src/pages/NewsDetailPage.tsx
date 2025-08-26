import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, Tag, ChevronRight, Share2, ArrowLeft, 
  Bookmark, Heart, MessageCircle, Clock, Eye, Facebook, 
  Twitter, Linkedin, Mail, Copy, CheckCircle, X,
  Minus, Plus, Printer, Download, BookOpen, TrendingUp
} from 'lucide-react';
import { newsItems } from '../data/mockData';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsItems.find(n => n.id === id);
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(news?.likes || 0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [viewCount, setViewCount] = useState(news?.views || 0);

  useEffect(() => {
    if (news) {
      document.title = `${news.title} | CIAPO COOP-CA`;
      // Simuler l'incrémentation du compteur de vues
      setViewCount(prev => prev + 1);
      
      // Observer les sections pour la table des matières
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      document.querySelectorAll('h2, h3').forEach((section) => {
        if (section.id) {
          observer.observe(section);
        }
      });

      return () => observer.disconnect();
    }
  }, [news]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s/g).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lecture`;
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const title = news?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      mail: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    setShowShareModal(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const generateTableOfContents = () => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    return headings.map((heading, index) => ({
      id: heading.id,
      text: heading.textContent,
      level: heading.tagName,
      index
    }));
  };

  const tocItems = generateTableOfContents();

  if (!news) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <Link to="/news" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const relatedNews = newsItems
    .filter(n => n.id !== news.id && n.category === news.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Navigation */}
      <div className="container-custom mb-8">
        <motion.div 
          className="flex items-center text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => navigate(-1)} className="text-neutral-500 hover:text-neutral-700 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Retour
          </button>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/news" className="text-neutral-500 hover:text-neutral-700">Actualités</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate max-w-xs">{news.title}</span>
        </motion.div>
      </div>

      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden mb-8 relative">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  {news.category}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-neutral-600">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{readingTime(news.content)}</span>
              </div>
              <div className="flex items-center">
                <Eye size={18} className="mr-2" />
                <span>{viewCount.toLocaleString()} vues</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-900 leading-tight">
              {news.title}
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              {news.excerpt}
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {/* Action Bar */}
              <div className="flex items-center justify-between mb-8 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                    <span>{likeCount}</span>
                  </button>
                  
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                  </button>
                  
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="p-2 rounded-lg bg-white text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-white text-neutral-600 hover:bg-neutral-100 transition-colors">
                    <Printer size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-white text-neutral-600 hover:bg-neutral-100 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <h3 className="text-blue-900 font-semibold mb-2">📋 Points clés de l'article</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Initiative de modernisation du secteur agricole</li>
                    <li>• Formation de la nouvelle génération d'agriculteurs</li>
                    <li>• Approche pédagogique innovante</li>
                    <li>• Impact à long terme sur l'agriculture ivoirienne</li>
                  </ul>
                </div>

                <h2 id="introduction">Introduction</h2>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {news.content}
                </p>
                
                <h2 id="impact-perspectives">Impact et Perspectives</h2>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  Cette initiative s'inscrit dans notre vision à long terme de modernisation du secteur agricole en Côte d'Ivoire. Elle permettra de former plus efficacement la nouvelle génération d'agriculteurs et d'entrepreneurs agricoles.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
                  <h4 className="text-green-900 font-semibold mb-2">💡 Le saviez-vous ?</h4>
                  <p className="text-green-700">
                    Cette initiative pourrait augmenter la productivité agricole de jusqu'à 40% dans les régions concernées.
                  </p>
                </div>

                <h3 id="defis-releves">Défis Relevés</h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  Le projet a permis de surmonter plusieurs défis techniques et logistiques, ouvrant la voie à de nouvelles innovations dans le domaine de la formation agricole.
                </p>

                <h2 id="prochaines-etapes">Prochaines Étapes</h2>
                <p className="text-neutral-700 leading-relaxed mb-8">
                  Nous continuerons à développer nos programmes et à innover dans nos approches pédagogiques pour répondre aux besoins évolutifs du secteur agricole. Les prochaines phases incluront l'intégration de technologies avancées et l'expansion à de nouvelles régions.
                </p>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-12">
                  <h3 className="text-lg font-semibold mb-4">À propos de l'auteur</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                      {news.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">{news.author}</h4>
                      <p className="text-neutral-600 text-sm mb-2">Expert en développement agricole</p>
                      <p className="text-neutral-700 text-sm">
                        Spécialiste avec plus de 15 ans d'expérience dans la formation et le développement des compétences agricoles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Agriculture', 'Formation', 'Innovation', 'Développement', 'Technologie'].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share and Navigation */}
              <div className="flex items-center justify-between py-8 border-t border-neutral-200">
                <div className="flex items-center gap-4">
                  <span className="text-neutral-600">Partager cet article:</span>
                  <div className="flex gap-2">
                    {[
                      { icon: Facebook, platform: 'facebook', color: 'text-blue-600' },
                      { icon: Twitter, platform: 'twitter', color: 'text-blue-400' },
                      { icon: Linkedin, platform: 'linkedin', color: 'text-blue-700' },
                      { icon: Mail, platform: 'mail', color: 'text-neutral-600' }
                    ].map((social, index) => (
                      <button
                        key={index}
                        onClick={() => handleShare(social.platform)}
                        className={`w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors ${social.color}`}
                      >
                        <social.icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/news" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Toutes les actualités
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-12">
                <h3 className="text-xl font-semibold mb-4">Restez informé</h3>
                <p className="mb-6 text-primary-100">
                  Recevez nos derniers articles et actualités directement dans votre boîte mail.
                </p>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-1 px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
                    S'abonner
                  </button>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <BookOpen size={18} className="mr-2 text-primary-600" />
                      Sommaire
                    </h3>
                    <button
                      onClick={() => setShowTableOfContents(!showTableOfContents)}
                      className="lg:hidden p-1 hover:bg-neutral-100 rounded"
                    >
                      {showTableOfContents ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                  </div>

                  <div className={`${showTableOfContents ? 'block' : 'hidden'} lg:block`}>
                    <nav className="space-y-2">
                      {tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                            currentSection === item.id
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                          } ${item.level === 'H3' ? 'pl-6' : ''}`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.div>

                {/* Related Articles */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-neutral-200 rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-4 flex items-center">
                    <TrendingUp size={18} className="mr-2 text-primary-600" />
                    Articles populaires
                  </h3>
                  <div className="space-y-4">
                    {newsItems
                      .filter(n => n.id !== news.id)
                      .sort((a, b) => (b.views || 0) - (a.views || 0))
                      .slice(0, 3)
                      .map((article) => (
                        <Link
                          key={article.id}
                          to={`/news/${article.id}`}
                          className="block p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                        >
                          <h4 className="font-medium text-sm text-neutral-900 group-hover:text-primary-600 mb-1 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-neutral-500">{formatDate(article.date)}</p>
                        </Link>
                      ))}
                  </div>
                </motion.div>

                {/* Newsletter Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary-50 border border-primary-100 rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-3 text-primary-900">💌 Newsletter</h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Recevez nos meilleurs articles chaque semaine.
                  </p>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 py-2 rounded-lg text-sm mb-2 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                    S'abonner
                  </button>
                </motion.div>
              </div>
            </aside>
          </div>

          {/* Related Articles Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-primary-900">Articles similaires</h2>
              <Link 
                to="/news" 
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                Voir tous
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/news/${article.id}`}>
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-neutral-500">
                        {formatDate(article.date)}
                      </span>
                      {article.views && (
                        <span className="text-xs text-neutral-500 flex items-center">
                          <Eye size={12} className="mr-1" />
                          {article.views.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/news/${article.id}`}>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    
                    <Link 
                      to={`/news/${article.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                    >
                      Lire la suite
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Partager cet article</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-neutral-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Facebook, label: 'Facebook', platform: 'facebook' },
                  { icon: Twitter, label: 'Twitter', platform: 'twitter' },
                  { icon: Linkedin, label: 'LinkedIn', platform: 'linkedin' },
                  { icon: Mail, label: 'Email', platform: 'mail' }
                ].map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleShare(social.platform)}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <social.icon size={24} className="mb-2 text-neutral-600" />
                    <span className="text-xs text-neutral-600">{social.label}</span>
                  </button>
                ))}
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">Lien de partage</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => handleShare('copy')}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors flex items-center"
                  >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-xs mt-2 flex items-center"
                  >
                    <CheckCircle size={12} className="mr-1" />
                    Lien copié !
                  </motion.span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsDetailPage;
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  MapPin, Phone, Mail, Clock, ChevronRight, ChevronDown, 
  Send, MessageCircle, Users, Building, Download, FileText,
  CheckCircle, XCircle, Loader2, Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';
import { locations } from '../data/mockData';
import gicambyLogo from '../assets/GICAMBY.png';
import apiLogo from '../assets/API.png';
import cohimmsLogo from '../assets/COHIMMS.png';
import scptteLogo from '../assets/SCPTTE.png';
import { ContactForm } from '../types';

const ContactPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'locations' | 'partners'>('form');
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: ''
  });
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = 'Contact | CIAPO COOP-CA';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!form.current) {
        throw new Error('Form reference not found');
      }

      const result = await emailjs.sendForm(
        'service_rti6nkb',
        'template_i3bl98o',
        form.current,
        'SFv4Qh_fWABmxvAD9'
      );

      console.log('Email successfully sent!', result.text);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqs = [
    {
      question: "Comment puis-je m'inscrire à une formation ?",
      answer: "Vous pouvez vous inscrire en ligne via notre plateforme e-learning ou directement dans l'un de nos centres de formation. Notre équipe vous guidera tout au long du processus d'inscription."
    },
    {
      question: "Quels sont les prérequis pour suivre une formation ?",
      answer: "Les prérequis varient selon les formations. En général, nous demandons un niveau minimum d'études et une forte motivation pour l'agriculture. Contactez-nous pour plus de détails sur une formation spécifique."
    },
    {
      question: "Proposez-vous des formations à distance ?",
      answer: "Oui, nous proposons des formations en ligne via notre plateforme e-learning et en vidéo conférence. Ces formations combinent cours théoriques en ligne et sessions pratiques dans nos centres."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons plusieurs modes de paiement : virement bancaire, Mobile Money, et paiement en espèces dans nos centres. Des facilités de paiement sont également disponibles."
    }
  ];

  const departments = [
    'Formation et éducation',
    'Services conseils',
    'Production agricole',
    'Élevage & pisciculture',
    'Partenariats',
    'Recrutement',
    'Autre'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="flex items-center text-sm mb-6 text-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hover:text-white transition-colors">Accueil</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium">Contact</span>
          </motion.div>

          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Contactez Notre Équipe
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-neutral-100 leading-relaxed">
              Une question, un projet ou besoin d'informations ? Notre équipe est là pour vous accompagner 
              dans votre réussite agricole. Ensemble, cultivons l'avenir.
            </p>

            {/* Quick Contact Stats */}
            <motion.div 
              className="flex flex-wrap gap-6 text-neutral-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {[
                { icon: Clock, text: 'Réponse sous 24h' },
                { icon: Users, text: 'Équipe dédiée' },
                { icon: CheckCircle, text: 'Support personnalisé' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon size={18} className="mr-2 text-green-300" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Navigation Tabs */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12 border-b border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { id: 'form' as const, label: 'Formulaire de contact', icon: MessageCircle },
              { id: 'locations' as const, label: 'Nos centres', icon: MapPin },
              { id: 'partners' as const, label: 'Partenaires', icon: Building }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-700 font-medium'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            {activeTab === 'form' && (
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-6 p-4 rounded-lg flex items-center ${
                          submitStatus === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {submitStatus === 'success' ? (
                          <CheckCircle size={20} className="mr-3" />
                        ) : (
                          <XCircle size={20} className="mr-3" />
                        )}
                        <span>
                          {submitStatus === 'success' 
                            ? 'Message envoyé avec succès! Nous vous répondrons bientôt.'
                            : 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
                          }
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          required
                          placeholder="Votre nom complet"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          placeholder="+237 6 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-2">
                          Service concerné *
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Sélectionnez un service</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Formation">Information sur les formations</option>
                        <option value="Inscription">Inscription</option>
                        <option value="Partenariat">Proposition de partenariat</option>
                        <option value="Autre">Autre demande</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      className={`button-primary w-full py-4 text-lg font-medium ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send size={20} className="mr-2" />
                          Envoyer le message
                        </span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-8">Nos Centres de Formation</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        {/* <div className="h-48 overflow-hidden">
                          <img 
                            src={location.imageUrl || "https://images.unsplash.com/photo-1590649880760-2d4b0f523de7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                            alt={location.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div> */}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-primary-900">{location.name}</h3>
                          <div className="flex items-start mb-4">
                            <MapPin size={20} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-neutral-700 font-medium">{location.address}</p>
                              <p className="text-neutral-600">{location.city}, {location.region}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <a href={`tel:${location.phone}`} className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors">
                              <Phone size={16} className="mr-2" />
                              {location.phone}
                            </a>
                            <a href={`mailto:${location.email}`} className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors">
                              <Mail size={16} className="mr-2" />
                              {location.email}
                            </a>
                          </div>
                          {/* <div className="mt-4 pt-4 border-t border-neutral-100">
                            <div className="flex items-center text-sm text-neutral-500">
                              <Clock size={14} className="mr-2" />
                              {location.hours}
                            </div>
                          </div> */}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Partners Tab */}
            {activeTab === 'partners' && (
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-8">Nos Partenaires Stratégiques</h2>
                  
                  <div className="bg-neutral-50 rounded-xl p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center mb-8">
                      {[
                        { src: gicambyLogo, alt: 'GICAMBY', name: 'GICAMBY' },
                        { src: apiLogo, alt: 'API', name: 'API' },
                        { src: scptteLogo, alt: 'SCPTTE', name: 'SCPTTE' },
                        { src: cohimmsLogo, alt: 'COHIMMS', name: 'COHIMMS' }
                      ].map((partner, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <img 
                            src={partner.src}
                            alt={partner.alt}
                            className="w-16 h-16 object-contain mb-3"
                          />
                          <span className="text-sm font-medium text-neutral-700">{partner.name}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-4">Devenez Partenaire</h3>
                      <p className="text-neutral-600 mb-6">
                        Rejoignez notre réseau de partenaires et contribuez au développement 
                        de l'agriculture durable au Cameroun.
                      </p>
                      <button className="button-primary">
                        <Building size={18} className="mr-2" />
                        Proposer un partenariat
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Sidebar - Always visible except on partners tab */}
            {activeTab !== 'partners' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="bg-gradient-to-br from-primary-50 to-green-50 p-6 rounded-xl shadow-sm sticky top-24">
                  <h3 className="text-xl font-semibold mb-6 text-primary-900">Contact Direct</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <MapPin size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Adresse Principale</h4>
                        <p className="text-neutral-700">
                          Mvan Essakoe<br />
                          Ebolowa<br />
                          Sud Cameroun
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Phone size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Téléphone</h4>
                        <div className="space-y-1">
                          <a href="tel:+237652498313" className="block text-neutral-700 hover:text-primary-600 transition-colors">
                            +237 652 498 313
                          </a>
                          <a href="tel:+237621752020" className="block text-neutral-700 hover:text-primary-600 transition-colors">
                            +237 621 752 020
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Mail size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <a href="mailto:ciapocoopca@gmail.com" className="text-neutral-700 hover:text-primary-600 transition-colors">
                          ciapocoopca@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Clock size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Horaires</h4>
                        <p className="text-neutral-700">
                          Lun - Ven: 8h - 18h<br />
                          Sam: 8h - 12h
                        </p>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="pt-6 border-t border-primary-200">
                      <h4 className="font-medium mb-3">Suivez-nous</h4>
                      <div className="flex gap-3">
                        {[
                          { icon: Facebook, url: '#', color: 'text-blue-600' },
                          { icon: Twitter, url: '#', color: 'text-blue-400' },
                          { icon: Instagram, url: '#', color: 'text-pink-600' },
                          { icon: Linkedin, url: '#', color: 'text-blue-700' }
                        ].map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow ${social.color}`}
                          >
                            <social.icon size={18} />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-primary-100 rounded-lg p-4 mt-6">
                      <h4 className="font-medium mb-2 text-primary-900">Urgence</h4>
                      <p className="text-sm text-primary-700 mb-2">
                        Pour les demandes urgentes en dehors des horaires d'ouverture
                      </p>
                      <a href="tel:+237677777777" className="text-primary-600 hover:text-primary-700 font-medium">
                        +237 677 777 777
                      </a>
                    </div>
                  </div>
                </div>

                {/* Download Brochure */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-sm mt-6 border border-primary-100"
                >
                  <div className="text-center">
                    <FileText size={32} className="text-primary-600 mx-auto mb-3" />
                    <h4 className="font-medium mb-2">Brochure Institutionnelle</h4>
                    <p className="text-sm text-neutral-600 mb-4">
                      Téléchargez notre brochure complète pour tout savoir sur nos services
                    </p>
                    <button className="button-outline w-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                      <Download size={16} className="mr-2" />
                      Télécharger
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-primary-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Questions Fréquentes
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:bg-neutral-50 transition-colors group"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="font-medium text-left text-primary-900 group-hover:text-primary-700">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform text-primary-600 ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border-t border-neutral-100">
                        <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Transformer l'Agriculture Avec Nous ?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Rejoignez notre communauté d'agriculteurs passionnés et bénéficiez d'un accompagnement 
              personnalisé pour réussir votre projet agricole.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button bg-white text-primary-700 hover:bg-neutral-100 px-8 py-4 font-semibold">
                Devenir Partenaire
              </button>
              <button className="button border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 font-semibold">
                Visiter Notre Ferme
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
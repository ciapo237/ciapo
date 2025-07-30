import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { locations } from '../data/mockData';
import gicambyLogo from '../assets/GICAMBY.png';
import apiLogo from '../assets/API.png';
import cohimmsLogo from '../assets/COHIMMS.png';
import scptteLogo from '../assets/SCPTTE.png';
import { ContactForm } from '../types';

const ContactPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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
        message: ''
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

  return (
    <div>
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="flex items-center text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-neutral-300">Accueil</span>
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
              <span className="text-white font-medium">Contact</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Contactez-nous
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl mb-8 text-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Une question ? Un projet ? Contactez-nous pour en discuter. Notre équipe est là pour vous accompagner dans votre réussite agricole.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                    Message envoyé avec succès! Nous vous répondrons bientôt.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                    Une erreur s'est produite. Veuillez réessayer plus tard.
                  </div>
                )}

                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
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
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Formation">Information sur les formations</option>
                        <option value="Inscription">Inscription</option>
                        <option value="Partenariat">Proposition de partenariat</option>
                        <option value="Autre">Autre demande</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`button-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : 'Envoyer le message'}
                  </button>
                </form>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-primary-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Adresse</h4>
                      <p className="text-neutral-600">
                        Mvan Essakoe<br />
                        Ebolowa<br />
                        Sud Cameroun
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone size={20} className="text-primary-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Téléphone</h4>
                      <p className="text-neutral-600">+237 652 498 313 / +237 621 752 020</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail size={20} className="text-primary-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-neutral-600">ciapocoopca@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock size={20} className="text-primary-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Horaires d'ouverture</h4>
                      <p className="text-neutral-600">
                        Lundi - Vendredi: 8h - 18h<br />
                        Samedi: 8h - 12h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 mt-6"
            >
              <div className="bg-neutral-50 p-6 rounded-lg h-full">
                <h3 className="text-xl font-semibold mb-6">Filiales et partenaires </h3>
                
                <div className="flex flex-wrap">
                  <div className="flex items-center">
                    <img 
                      src={gicambyLogo}
                      className="w-16 h-16 object-cover rounded-full mr-3"
                      alt='logo' 
                    />
                  </div>

                  <div className="flex items-center">
                    <img 
                      src={apiLogo}
                      className="w-16 h-16 object-cover rounded-full mr-3"
                      alt='logo' 
                    />
                  </div>

                  <div className="flex items-center">
                    <img 
                      src={scptteLogo}
                      className="w-16 h-16 object-cover rounded-full mr-3"
                      alt='logo' 
                    />
                  </div>

                  <div className="flex items-center">
                    <img 
                      src={cohimmsLogo}
                      className="w-16 h-16 object-cover rounded-full mr-3"
                      alt='logo' 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Questions Fréquentes
          </motion.h2>

          <div className="max-w-3xl mx-auto">
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
                  className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-sm hover:bg-neutral-50 transition-colors"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === index && (
                  <div className="p-6 bg-white border-t border-neutral-100">
                    <p className="text-neutral-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Centres de Formation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <div className="flex items-start mb-4">
                    <MapPin size={20} className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-neutral-600">{location.address}</p>
                      <p className="text-neutral-600">{location.city}, {location.region}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>📞 {location.phone}</p>
                    <p>✉️ {location.email}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
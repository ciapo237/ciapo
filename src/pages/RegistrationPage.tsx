import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ChevronRight, User, Mail, Phone, MapPin, Calendar, CreditCard, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { programs } from '../data/mockData';

const RegistrationPage: React.FC = () => {
  const { id } = useParams();
  const program = programs.find(p => p.id === id);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address
    address: '',
    city: '',
    region: '',
    
    // Education & Experience
    startDate: '',
    educationLevel: '',
    language: '',
    previousExperience: '',
    motivation: '',
    
    // Payment
    paymentMethod: '',
    
    // Documents
    idDocument: null as File | null,
    educationCertificate: null as File | null,
    
    // Terms
    acceptTerms: false,
    acceptNewsletter: false
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    if (program) {
      document.title = `Inscription - ${program.title} | CIAPO COOP-CA`;
    }
  }, [program]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Prepare the template parameters for EmailJS
      const inscriptionForm = {
        program_title: program?.title,
        program_cost: program?.cost,
        program_duration: program?.duration,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        region: formData.region,
        start_date: formData.startDate,
        education_level: formData.educationLevel,
        language: formData.language,
        previous_experience: formData.previousExperience,
        motivation: formData.motivation,
        payment_method: formData.paymentMethod,
        accept_terms: formData.acceptTerms ? 'Oui' : 'Non',
        accept_newsletter: formData.acceptNewsletter ? 'Oui' : 'Non',
        registration_date: new Date().toLocaleDateString('fr-FR')
      };

       // Send email using EmailJS
       await emailjs.send(
        'service_rti6nkb',
        'template_i8lhe8f',
        inscriptionForm,
        'SFv4Qh_fWABmxvAD9'
      );

      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
        setCurrentStep(1);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          city: '',
          region: '',
          startDate: '',
          educationLevel: '',
          language: '',
          previousExperience: '',
          motivation: '',
          paymentMethod: '',
          idDocument: null,
          educationCertificate: null,
          acceptTerms: false,
          acceptNewsletter: false
        });
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.address && formData.city && formData.region;
      case 3:
        return formData.educationLevel && formData.motivation;
      case 4:
        return formData.paymentMethod && formData.acceptTerms;
      default:
        return false;
    }
  };

  if (!program) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Programme non trouvé</h1>
        <Link to="/programs" className="text-primary-600 hover:text-primary-700">
          Retour aux programmes
        </Link>
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-success-500">Inscription Réussie !</h1>
              <p className="text-lg text-neutral-600 mb-6">
                Votre inscription au programme "{program.title}" a été enregistrée avec succès.
              </p>
              <p className="text-neutral-600 mb-8">
                Vous recevrez un email de confirmation avec tous les détails dans les prochaines minutes.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Link to="/programs" className="button-outline">
                  Voir d'autres programmes
                </Link>
                <Link to="/elearning" className="button-primary">
                  Accéder à l'e-learning
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 bg-neutral-50">
      <div className="container-custom">
        <motion.div 
          className="flex items-center text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-neutral-500 hover:text-neutral-700">Accueil</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to="/programs" className="text-neutral-500 hover:text-neutral-700">Programmes</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link to={`/programs/${program.id}`} className="text-neutral-500 hover:text-neutral-700">{program.title}</Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-900 font-medium">Inscription</span>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={program.imageUrl} 
                alt={program.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{program.title}</h1>
                <p className="text-neutral-600">Durée: {program.duration} • Coût: {program.cost}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <User size={24} className="mr-2 text-primary-600" />
                    Informations Personnelles
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Genre
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Sélectionner</option>
                        <option value="male">Masculin</option>
                        <option value="female">Féminin</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <MapPin size={24} className="mr-2 text-primary-600" />
                    Adresse
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Adresse complète *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Région *
                        </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        >
                          <option value="">Sélectionner une région</option>
                          <option value="Adamaoua">Adamaoua</option>
                          <option value="Centre">Centre</option>
                          <option value="Est">Est</option>
                          <option value="Extreme-nord">Extrême-Nord</option>
                          <option value="Littoral">Littoral</option>
                          <option value="Nord">Nord</option>
                          <option value="Nord-ouest">Nord-Ouest</option>
                          <option value="Ouest">Ouest</option>
                          <option value="Sud">Sud</option>
                          <option value="Sud-ouest">Sud-Ouest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Education & Experience */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Calendar size={24} className="mr-2 text-primary-600" />
                    Programme de Formation
                  </h2>

                  <div className="space-y-6">
                  <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Date de début souhaitée *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Mode de formation *
                      </label>
                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">Sélectionner</option>
                        <option value="primary">En presentiel</option>
                        <option value="secondary">En vidéo conférence</option>
                        <option value="high-school">Les deux</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Langue de formation *
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">Sélectionner</option>
                        <option value="Français">Français</option>
                        <option value="Anglais">Anglais</option>
                        <option value="Bilingue">Bilingue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Expérience agricole précédente
                      </label>
                      <textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Décrivez votre expérience dans le domaine agricole..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Motivation pour cette formation *
                      </label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Expliquez pourquoi vous souhaitez suivre cette formation..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Pièce d'identité
                        </label>
                        <input
                          type="file"
                          name="idDocument"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <p className="text-xs text-neutral-500 mt-1">PDF, JPG ou PNG (max 5MB)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          2 photos d'identité
                        </label>
                        <input
                          type="file"
                          name="educationCertificate"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <p className="text-xs text-neutral-500 mt-1">PDF, JPG ou PNG (max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Payment & Terms */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard size={24} className="mr-2 text-primary-600" />
                    Paiement et Conditions
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Récapitulatif</h3>
                      <div className="flex justify-between items-center">
                        <span>Formation: {program.title}</span>
                        <span className="font-bold text-primary-600">{program.cost}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Mode de paiement *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank-transfer"
                            checked={formData.paymentMethod === 'bank-transfer'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span>Virement bancaire</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="mobile-money"
                            checked={formData.paymentMethod === 'mobile-money'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span>Mobile Money (Orange Money / MTN Mobile Money)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formData.paymentMethod === 'cash'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span>Paiement en espèces (au centre)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="installments"
                            checked={formData.paymentMethod === 'installments'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span>Paiement en plusieurs fois</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="mr-3 mt-1"
                          required
                        />
                        <span className="text-sm">
                          J'accepte les <Link to="/terms" className="text-primary-600 hover:text-primary-700">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-primary-600 hover:text-primary-700">politique de confidentialité</Link> *
                        </span>
                      </label>

                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="acceptNewsletter"
                          checked={formData.acceptNewsletter}
                          onChange={handleInputChange}
                          className="mr-3 mt-1"
                        />
                        <span className="text-sm">
                          Je souhaite recevoir des informations sur les nouvelles formations et actualités de CIAPO COOP-CA
                        </span>
                      </label>

                      <h4 className="font-medium mb-2">Politique de remboursement</h4>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="acceptNewsletter"
                          checked={formData.acceptNewsletter}
                          onChange={handleInputChange}
                          className="mr-3 mt-1"
                        />
                        <span className="text-sm">
                          Les annulations jusqu'à 15 jours avant le début de la formation donnent droit à un remboursement intégral. 
                          Passé ce délai, seul 50% des frais seront remboursés.
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`button-outline ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Précédent
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`button-primary ${!isStepValid(currentStep) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid(4) || isSubmitting}
                    className={`button-primary ${(!isStepValid(4) || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Inscription en cours...
                      </span>
                    ) : (
                      'Finaliser l\'inscription'
                    )}
                  </button>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className="mt-4 flex items-center text-error-500 bg-error-500/10 p-4 rounded-lg">
                  <AlertCircle size={20} className="mr-2" />
                  <span>Une erreur est survenue. Veuillez réessayer.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div> 
  );
  
};

export default RegistrationPage;
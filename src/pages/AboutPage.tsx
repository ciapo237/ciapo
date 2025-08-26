import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, Award, ChevronRight, MapPin, Phone, Mail, 
  Clock, Shield, Heart, BookOpen, GraduationCap, Leaf,
  BarChart3, CheckCircle, Star, Calendar, Globe, Coffee
} from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import { locations, missions } from '../data/mockData';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'À Propos | CIAPO COOP-CA';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 md:h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="flex items-center text-sm mb-6 text-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>Accueil</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium">À Propos</span>
          </motion.div>

          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Transformer l'Agriculture <br className="hidden lg:block" />
              <span className="text-green-300">Par la Formation</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-neutral-100 leading-relaxed">
              CIAPO-COOP-CA est une coopérative agropastorale qui accompagne les jeunes 
              vers l'excellence dans toutes les dimensions de l'agriculture moderne.
            </p>

            <motion.div 
              className="flex flex-wrap gap-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {[
                { icon: Users, text: 'Communauté active' },
                { icon: Leaf, text: 'Agriculture durable' },
                { icon: GraduationCap, text: 'Formation certifiante' },
                { icon: Heart, text: 'Impact social' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon size={20} className="mr-2 text-green-300" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 transform translate-y-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, value: '1000+', label: 'Agriculteurs Formés' },
                { icon: Target, value: '85%', label: 'Taux de Réussite' },
                { icon: Award, value: '15', label: 'Programmes Actifs' },
                { icon: Calendar, value: '10+', label: "Ans d'Expérience" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <stat.icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary-700 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="text-sm font-semibold text-primary-600 mb-2">NOTRE HISTOIRE</div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-900">
                  Qui Sommes-Nous ?
                </h2>
                
                <div className="prose prose-lg text-neutral-700 mb-8">
                  <p className="text-lg leading-relaxed mb-6">
                    <strong>CIAPO-COOP-CA</strong> est une coopérative agropastorale visionnaire qui 
                    accompagne les jeunes dans toutes les dimensions de l'agriculture moderne. 
                    Notre mission est de former la nouvelle génération d'agriculteurs entrepreneurs.
                  </p>
                  
                  <p className="leading-relaxed mb-8">
                    Nous combinons formation théorique en vidéoconférence et pratique sur site 
                    pour offrir un apprentissage complet et adapté aux réalités du terrain.
                  </p>
                </div>

                <motion.div 
                  className="grid grid-cols-2 gap-6 mb-8"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: BookOpen, text: 'Formation théorique et pratique' },
                    { icon: Shield, text: 'Accompagnement personnalisé' },
                    { icon: Globe, text: 'Approche agroécologique' },
                    { icon: Coffee, text: 'Réseau communautaire actif' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      variants={fadeIn}
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <item.icon size={20} className="text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Formation agricole pratique" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Experience Badge */}
                <motion.div
                  className="absolute bottom-6 right-6 bg-white p-6 rounded-2xl shadow-xl"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
                  <div className="text-sm font-medium text-neutral-600">Années d'expérience</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-green-50">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Mission & Vision" 
            subtitle="Transformer l'agriculture par l'éducation et l'innovation"
            centered
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <img 
                    src={mission.imageUrl} 
                    alt={mission.title} 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary-900 group-hover:text-primary-700 transition-colors">
                  {mission.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{mission.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Impact" 
            subtitle="Des résultats concrets qui font la différence"
            centered
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                number: "1000+",
                label: "Jeunes Formés",
                description: "Agriculteurs entrepreneurs accompagnés"
              },
              {
                icon: BarChart3,
                number: "85%",
                label: "Taux de Réussite",
                description: "Diplômés gèrent leur exploitation"
              },
              {
                icon: Award,
                number: "15",
                label: "Programmes",
                description: "Formations spécialisées disponibles"
              },
              {
                icon: Heart,
                number: "200+",
                label: "Familles Impactées",
                description: "Amélioration des conditions de vie"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-neutral-50 rounded-2xl hover:shadow-lg transition-all"
                variants={fadeIn}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                  <stat.icon size={32} className="text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-700 mb-2">{stat.number}</div>
                <h3 className="text-lg font-semibold mb-3 text-primary-900">{stat.label}</h3>
                <p className="text-neutral-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Impact */}
          <motion.div 
            className="mt-16 bg-primary-900 rounded-2xl p-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold mb-12 text-center">Notre Approche Holistique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Formation Complète",
                  description: "Théorie et pratique combinées pour une maîtrise parfaite"
                },
                {
                  title: "Accompagnement",
                  description: "Suivi personnalisé jusqu'à l'autonomie complète"
                },
                {
                  title: "Innovation",
                  description: "Techniques modernes et méthodes agroécologiques"
                },
                {
                  title: "Communauté",
                  description: "Réseau d'entraide et d'échanges entre apprenants"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-green-400" />
                  </div>
                  <h4 className="font-semibold mb-2 text-green-300">{item.title}</h4>
                  <p className="text-primary-100 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Domaines d'Expertise" 
            subtitle="Des services complets pour le développement agricole"
            centered
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "🌱 Production Agricole",
                items: [
                  "Cacao, soja, banane, tomate, manioc",
                  "Maïs, arachides, palmier à huile",
                  "Produits maraîchers et céréales diversifiés"
                ]
              },
              {
                title: "🐄 Élevage & Pisciculture",
                items: [
                  "Aviculture moderne et traditionnelle",
                  "Apiculture et production de miel",
                  "Aquaculture et élevage d'escargots"
                ]
              },
              {
                title: "📚 Formation & Conseil",
                items: [
                  "Formation pratique en agropastoral",
                  "Services conseils et orientation professionnelle",
                  "Implantation et suivi technique de projets"
                ]
              },
              {
                title: "🌍 Impact Social",
                items: [
                  "Lutte contre le chômage et l'exode rural",
                  "Prévention des risques sociaux",
                  "Autonomisation financière des familles"
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary-900">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Centers Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Centres de Formation" 
            subtitle="Des installations modernes accessibles à tous"
            centered
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                {/* <div className="h-48 overflow-hidden">
                  <img 
                    src={location. || "https://images.unsplash.com/photo-1590649880760-2d4b0f523de7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-5"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-green-400 opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Transformer Votre Avenir Agricole ?
            </h2>
            <p className="text-xl mb-8 text-primary-100 leading-relaxed">
              Rejoignez une communauté dynamique de passionnés et construisez 
              l'avenir de l'agriculture camerounaise avec nous.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="button bg-white text-primary-700 hover:bg-neutral-100 px-8 py-4 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Commencer Votre Formation
              </motion.button>
              <motion.button 
                className="button border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nous Contacter
              </motion.button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-primary-100 text-sm">
              {[
                { icon: Star, text: 'Formation Certifiante' },
                { icon: Users, text: 'Communauté Active' },
                { icon: Shield, text: 'Accompagnement Personnalisé' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon size={16} className="mr-2" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
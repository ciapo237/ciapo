import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import ProgramHighlights from '../components/home/ProgramHighlights';
import PlatformsPreview from '../components/home/PlatformsPreview';
import AdminTeam from '../components/home/AdminTeam';
import Partners from '../components/home/Partners';
import CallToAction from '../components/home/CallToAction';
import about from "../assets/agriculture.jpg"

const HomePage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'CIAPO COOP-CA | Formation & Entrepreneuriat Agricole';
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Section "Qui sommes-nous" */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Qui sommes-nous ?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                CIAPO-COOP-CA est une coopérative agropastorale qui accompagne les jeunes dans toutes leurs dimensions entrepreneuriales.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous offrons des formations pratiques en présentiel et à distance pour développer les compétences agricoles.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Formation pratique en agropastoral (élevage, cultures, gestion de projets)",
                  "Services conseils : Orientation professionnelle, implantation de projets, suivi technique",
                  "Production agricole : Cacao, soja, banane, tomate, manioc, maïs, arachides, palmier à huile",
                  "Élevage & pisciculture : Aviculture, apiculture, aquaculture, escargots",
                  "Protection de l'environnement et agroécologie",
                  "Lutte contre le chômage et renforcement de l'autonomie financière"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-lg text-gray-700"
                  >
                    <span className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3 mr-3"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={about} 
                  alt="Équipe CIAPO en formation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Notre équipe d'experts</h3>
                  <p className="text-primary-200">Engagés pour votre réussite</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Activités Secondaires */}
      <section className="py-20 lg:py-28 bg-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-95"></div>
        
        {/* Éléments décoratifs animés */}
        <motion.div 
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white opacity-5"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white opacity-5"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Activités Secondaires
              </h2>
              <p className="text-xl text-primary-100">
                Diversification de nos services pour répondre à tous vos besoins
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Transformation",
                  items: ["Cacao", "Produits agricoles", "Dérivés"]
                },
                {
                  title: "Marché des intrants",
                  items: ["Vente groupée de semences", "Outils agro-pastoraux"]
                },
                {
                  title: "Commercialisation",
                  items: ["Centralisation des besoins", "Promotion des ventes groupées"]
                },
                {
                  title: "Diversification",
                  items: ["Santé", "BTP", "Audiovisuel", "Éducation", "Restauration"]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-primary-100">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-300 rounded-full mt-2 mr-3"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections des composants */}
      <ProgramHighlights />
      <PlatformsPreview />
      <AdminTeam />
      <Partners />
      <CallToAction />
    </div>
  );
};

export default HomePage;
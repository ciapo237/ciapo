import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import { partners } from '../../data/mockData';

const Partners: React.FC = () => {
  // Fonction pour regrouper les partenaires par lignes
  const chunkArray = (arr: typeof partners, size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, [] as typeof partners[]);
  };

  const partnerRows = chunkArray(partners, 4);

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle 
          title="Nos Partenaires Stratégiques" 
          subtitle="Organisations et institutions qui soutiennent notre mission"
          centered
        />
        
        {/* Version desktop - Carrousel horizontal */}
        <div className="hidden md:block overflow-hidden py-8">
          <motion.div 
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 px-4"
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="flex flex-col items-center h-full">
                    <div className="h-32 w-full flex items-center justify-center mb-4">
                      <img 
                        src={partner.logoUrl} 
                        alt={`Logo ${partner.name}`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2 text-gray-900 w-64">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center line-clamp-2 w-64">
                      {partner.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Version mobile - Grille responsive */}
        <div className="md:hidden grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.floor(index / 2) * 0.1 }}
              whileHover={{ y: -5 }}
              className="col-span-1"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all h-full"
              >
                <div className="flex flex-col items-center h-full">
                  <div className="h-20 w-full flex items-center justify-center mb-3">
                    <img 
                      src={partner.logoUrl} 
                      alt={`Logo ${partner.name}`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-center mb-1 text-gray-900 line-clamp-1">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-gray-600 text-center line-clamp-2">
                    {partner.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA pour devenir partenaire */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Vous souhaitez devenir partenaire ?
          </h3>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Contactez-nous
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  lightText?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = false,
  lightText = false
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold mb-2 ${lightText ? 'text-white' : 'text-neutral-800'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={`text-lg ${lightText ? 'text-neutral-200' : 'text-neutral-600'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className={`w-20 h-1 bg-primary-500 mt-4 ${centered ? 'mx-auto' : ''}`}
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.div>
    </div>
  );
};

export default SectionTitle;
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Logo white />
              <div className="ml-3">
                <span className="block font-heading font-bold text-xl">CIAPO COOP-CA</span>
                <span className="text-xs text-neutral-300">Formation & Entrepreneuriat Agricole</span>
              </div>
            </div>
            <p className="text-neutral-300 mb-4">
              CIAPO COOP-CA est une institution dédiée à la formation des jeunes entrepreneurs agricoles et au développement du secteur agricole au cameroun.
            </p>
            <div className="flex space-x-3">
              <a href="https://web.facebook.com/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-700 hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/home?lang=fr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-700 hover:bg-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-700 hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/watch?v=3EYAWK7M-uk" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-700 hover:bg-primary-600 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-neutral-700 hover:bg-primary-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-neutral-300 hover:text-primary-400 transition-colors">Nos Programmes</Link></li>
              <li><Link to="/news" className="text-neutral-300 hover:text-primary-400 transition-colors">Actualités</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-primary-400 transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/elearning" className="text-neutral-300 hover:text-primary-400 transition-colors">Plateforme E-Learning</Link></li>
              <li><Link to="/marketplace" className="text-neutral-300 hover:text-primary-400 transition-colors">Marketplace Agricole</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-neutral-300">Sud Cameroun à Ebolowa Mvan Essakoe, Cameroun</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary-400" />
                <span className="text-neutral-300">(+237) 652 498 313 / (+237) 621 752 020</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-400" />
                <a href="mailto:info@ciapo-coop-ca.org" className="text-neutral-300 hover:text-primary-400 transition-colors">ciapocoopca@gmail.com</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-neutral-300 mb-4">Abonnez-vous pour recevoir nos actualités et offres de formation.</p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 rounded-l-md w-full text-neutral-800 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  S'abonner
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CIAPO COOP-CA. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-neutral-400 text-sm hover:text-primary-400 transition-colors">Conditions d'utilisation</Link>
              <Link to="/privacy" className="text-neutral-400 text-sm hover:text-primary-400 transition-colors">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
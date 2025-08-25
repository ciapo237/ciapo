// components/marketplace/ContactModal.tsx
import React from 'react';
import { X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Seller } from '../../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller;
  method: 'phone' | 'message' | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, seller, method }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold">
            Contacter {seller.name}
          </h3>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {method === 'phone' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Appeler le vendeur</h4>
              <p className="text-neutral-600 mb-6">
                Contactez {seller.name} directement par téléphone pour discuter de vos commandes
              </p>
              <a 
                href="tel:+2250000000000"
                className="button-secondary inline-flex items-center"
              >
                <Phone size={20} className="mr-2" />
                Appeler maintenant
              </a>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Envoyer un message</h4>
              <p className="text-neutral-600 mb-6">
                Envoyez un message à {seller.name} pour poser vos questions ou discuter des détails de commande
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <button type="button" className="button-secondary w-full">
                  Envoyer le message
                </button>
              </form>
            </div>
          )}
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-b-xl">
          <div className="flex items-center text-sm text-neutral-600">
            <MapPin size={16} className="mr-2" />
            {seller.location}
          </div>
          {seller.responseTime && (
            <div className="flex items-center text-sm text-neutral-600 mt-2">
              <Clock size={16} className="mr-2" />
              Réponse généralement dans les {seller.responseTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
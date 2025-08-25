// components/programs/ImageGallery.tsx
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
          >
            <img
              src={image}
              alt={`Galerie ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
          
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-full">
            <img
              src={images[selectedImage]}
              alt={`Galerie ${selectedImage + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === selectedImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
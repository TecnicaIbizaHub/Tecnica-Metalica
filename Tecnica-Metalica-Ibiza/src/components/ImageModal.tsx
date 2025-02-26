import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  images: Array<{
    url: string;
    title: string;
    description?: string;
  }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          showPrevious();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const showNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      clipPath: direction > 0 
        ? 'inset(0% 0% 100% 0%)'
        : 'inset(100% 0% 0% 0%)',
      opacity: 0,
      transition: {
        clipPath: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }),
    center: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        clipPath: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      clipPath: direction < 0 
        ? 'inset(0% 0% 100% 0%)'
        : 'inset(100% 0% 0% 0%)',
      opacity: 0,
      transition: {
        clipPath: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    })
  };

  const renderImage = () => {
    if (imageError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl">Error al cargar la imagen</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        )}
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
      </>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="fixed top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={showPrevious}
              className="fixed left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={showNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </>
        )}

        {/* Image container */}
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ willChange: 'transform' }}
              className="relative w-full"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                {renderImage()}
              </div>

              {/* Image info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
              >
                <h2 id="modal-title" className="text-xl font-bold text-white mb-2">
                  {currentImage.title}
                </h2>
                {currentImage.description && (
                  <p className="text-gray-200">{currentImage.description}</p>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ImageModal;
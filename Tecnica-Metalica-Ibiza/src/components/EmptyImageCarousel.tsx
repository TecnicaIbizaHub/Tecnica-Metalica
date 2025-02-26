import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array of 15 empty slots (increased from 10)
  const emptySlots = Array(15).fill({
    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Cpath d="M30,50 L70,50 M50,30 L50,70" stroke="%23d1d5db" stroke-width="2"/%3E%3C/svg%3E',
    alt: 'Empty slot',
    title: 'Imagen por añadir',
    description: 'Este espacio está reservado para una futura imagen'
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % emptySlots.length);
      }, 4000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + emptySlots.length) % emptySlots.length);
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg shadow-xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <img
              src={emptySlots[currentIndex].url}
              alt={emptySlots[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-xl font-bold text-white mb-2">{emptySlots[currentIndex].title}</h3>
              <p className="text-gray-200">{emptySlots[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {emptySlots.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-green-600 w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/proyectos"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 hover:scale-105 transform"
        >
          Ver Más Proyectos
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default EmptyImageCarousel;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const portfolioImages = [
  {
    url: '/Proyec Images 2 /Techo inox.jpeg',
    alt: 'Acero Inoxidable',
    title: 'Acabados en Acero Inoxidable',
    description: 'Diseño y fabricación de elementos en acero inoxidable marino'
  },
  {
    url: '/Proyec Images 2 /Artistica 7 .jpeg',
    alt: 'Forja Artística',
    title: 'Forja Artística',
    description: 'Elementos decorativos con diseños personalizados'
  },
  {
    url: '/Proyec Images 2 /Estanteria Corten.jpeg',
    alt: 'Acero Corten',
    title: 'Acabados en Acero Corten',
    description: 'Revestimientos y elementos decorativos en acero corten'
  },
  {
    url: '/Proyec Images 2 /Techo.jpeg',
    alt: 'Estructura Arquitectónica',
    title: 'Estructuras Arquitectónicas',
    description: 'Soluciones metálicas para proyectos arquitectónicos'
  },
  {
    url: '/Proyec Images 2 /Puerta inox.jpeg',
    alt: 'Puerta Inoxidable',
    title: 'Puertas en Acero Inoxidable',
    description: 'Diseños modernos con acabados de alta calidad'
  },
  {
    url: '/Proyec Images 2 /Sombrilla inox.jpeg',
    alt: 'Estructura Exterior',
    title: 'Estructuras para Exterior',
    description: 'Soluciones en acero inoxidable para espacios al aire libre'
  },
  {
    url: '/Proyec Images 2 /Artistica 9 .jpeg',
    alt: 'Detalle Artístico',
    title: 'Detalles en Forja',
    description: 'Trabajo artesanal con acabados únicos'
  },
  {
    url: '/Proyec Images 2 /Barandilla hierro.jpeg',
    alt: 'Barandilla',
    title: 'Barandillas de Hierro',
    description: 'Seguridad y estética en cada detalle'
  },
  {
    url: '/Proyec Images 2 /Puerta hierro Ext.jpeg',
    alt: 'Puerta Exterior',
    title: 'Puertas de Exterior',
    description: 'Diseños robustos con acabados duraderos'
  },
  {
    url: '/Proyec Images 2 /Artisticaa 6.jpeg',
    alt: 'Forja Decorativa',
    title: 'Elementos Decorativos',
    description: 'Arte en metal para espacios únicos'
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Precargar y validar todas las imágenes
    portfolioImages.forEach((image, index) => {
      const img = new Image();
      img.src = image.url;
      
      img.onload = () => {
        // Verificar dimensiones mínimas
        if (img.width < 800 || img.height < 600) {
          console.warn(`Imagen ${image.url} tiene resolución baja: ${img.width}x${img.height}`);
        }
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      };

      img.onerror = () => {
        console.error(`Error cargando imagen: ${image.url}`);
        setImageErrors(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    })
  };

  const paginate = (newDirection: number) => {
    setIsAutoPlaying(false);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + portfolioImages.length) % portfolioImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      paginate(-1);
    } else if (e.key === 'ArrowRight') {
      paginate(1);
    }
  };

  const renderImage = (index: number) => {
    if (imageErrors[index]) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-2" />
            <p>Error al cargar la imagen</p>
          </div>
        </div>
      );
    }

    return (
      <img
        src={portfolioImages[index].url}
        alt={portfolioImages[index].alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
        }`}
        loading={index === currentIndex ? 'eager' : 'lazy'}
        onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
      />
    );
  };

  const renderPlaceholder = () => (
    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
  );

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto overflow-hidden bg-gray-100 rounded-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carrusel de proyectos"
    >
      <div className="aspect-[16/9] relative overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
            className="absolute inset-0"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full h-full bg-gray-200">
              {!imagesLoaded[currentIndex] && renderPlaceholder()}
              {renderImage(currentIndex)}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {portfolioImages[currentIndex].title}
                </h3>
                <p className="text-gray-200 text-lg">
                  {portfolioImages[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all duration-300 text-gray-800 transform hover:scale-110 shadow-lg group"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all duration-300 text-gray-800 transform hover:scale-110 shadow-lg group"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-gray-800 text-sm font-medium shadow-lg">
          {currentIndex + 1} / {portfolioImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-4 gap-2 px-4 overflow-x-auto pb-2">
        {portfolioImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gray-800 w-4'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      <div className="text-center mt-8 pb-4">
        <Link
          to="/proyectos"
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-105 transform shadow-lg"
        >
          Ver Más Proyectos
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ImageCarousel;
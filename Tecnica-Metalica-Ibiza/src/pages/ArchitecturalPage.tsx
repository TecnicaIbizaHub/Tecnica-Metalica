import React from 'react';
import { ChevronRight } from 'lucide-react';
import BackToHomeButton from '../components/BackToHomeButton';

interface ArchitecturalPageProps {
  onQuoteClick: () => void;
}

function ArchitecturalPage({ onQuoteClick }: ArchitecturalPageProps) {
  return (
    <div className="min-h-screen">
      <BackToHomeButton />
      <div className="relative h-[60vh]">
        <img
          src="/images/architectural-structure.jpg"
          alt="Estructuras Arquitectónicas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Estructuras Arquitectónicas
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-6">
              Diseño y construcción de estructuras metálicas innovadoras que combinan funcionalidad y estética
            </p>
            <button 
              onClick={onQuoteClick}
              className="md:hidden inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Cotizar
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-gray-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Expertos en Estructuras Metálicas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Diseñamos y construimos estructuras metálicas que cumplen con los más altos estándares de calidad y seguridad, adaptándonos a las necesidades específicas de cada proyecto.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nuestro equipo de profesionales cuenta con amplia experiencia en el sector, garantizando soluciones eficientes y duraderas para todo tipo de construcciones.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Diseño y cálculo de estructuras</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Fabricación de estructuras industriales</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Montaje y supervisión de obras</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Mantenimiento estructural</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={onQuoteClick}
                className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                Cotizar
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const images = [
  {
    url: '/images/architectural-structure.jpg',
    title: 'Estructuras Industriales',
    description: 'Diseño y fabricación de estructuras metálicas industriales',
  },
  {
    url: '/Images/Estructuras /Estructuras arquitectonicas.jpeg',
    title: 'Estructura Moderna',
    description: 'Diseño contemporáneo con líneas limpias y acabados profesionales',
  },
  {
    url: '/Images/Estructuras /Exteriores 1.jpeg',
    title: 'Pérgola Exterior',
    description: 'Estructura metálica para espacios al aire libre con diseño funcional',
  },
];

export default ArchitecturalPage;
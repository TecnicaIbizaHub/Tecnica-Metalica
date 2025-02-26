import React from 'react';
import { ChevronRight } from 'lucide-react';
import BackToHomeButton from '../components/BackToHomeButton';

interface StainlessSteelPageProps {
  onQuoteClick: () => void;
}

function StainlessSteelPage({ onQuoteClick }: StainlessSteelPageProps) {
  return (
    <div className="min-h-screen">
      <BackToHomeButton />
      <div className="relative h-[60vh]">
        <img
          src="/Images/Inox/WhatsApp Image 2025-02-19 at 19.24.33 (1).jpeg"
          alt="Acero Inoxidable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Acero Inoxidable
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-6">
              Soluciones duraderas y elegantes en acero inoxidable para proyectos residenciales y comerciales
            </p>
            <button 
              onClick={onQuoteClick}
              className="md:hidden inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
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
              Especialistas en Acero Inoxidable
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nuestro equipo de expertos se especializa en la fabricación y mantenimiento de elementos en acero inoxidable, garantizando la más alta calidad y durabilidad en cada proyecto.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Utilizamos acero inoxidable de grado marino, especialmente seleccionado para resistir el ambiente costero de Ibiza, asegurando una larga vida útil sin corrosión.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span>Barandillas y pasamanos personalizados</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span>Escaleras y estructuras arquitectónicas</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span>Mobiliario exterior e interior</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span>Elementos decorativos y funcionales</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={onQuoteClick}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
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
    url: '/Images/Inox/WhatsApp Image 2025-02-19 at 19.26.55 (1).jpeg',
    title: 'Barandilla de Acero Inoxidable',
    description: 'Diseño moderno y elegante para espacios contemporáneos',
  },
  {
    url: '/Images/Inox/Inox 5.jpeg',
    title: 'Escalera de Diseño',
    description: 'Escalera minimalista con peldaños flotantes y barandilla de cristal',
  },
  {
    url: '/Images/Inox/WhatsApp Image 2025-02-19 at 19.24.33 (1).jpeg',
    title: 'Mobiliario Exterior',
    description: 'Muebles resistentes a la intemperie y al ambiente marino',
  },
];

export default StainlessSteelPage;
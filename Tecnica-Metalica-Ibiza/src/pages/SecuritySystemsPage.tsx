import React from 'react';
import { ChevronRight } from 'lucide-react';
import BackToHomeButton from '../components/BackToHomeButton';

interface SecuritySystemsPageProps {
  onQuoteClick: () => void;
}

function SecuritySystemsPage({ onQuoteClick }: SecuritySystemsPageProps) {
  return (
    <div className="min-h-screen">
      <BackToHomeButton />
      <div className="relative h-[60vh]">
        <img
          src="/Images/Cerradura/door.jpeg"
          alt="Sistemas de Seguridad"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cerraduras y Sistemas de Seguridad
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-6">
              Soluciones de seguridad avanzadas para proteger lo que más valoras
            </p>
            <button 
              onClick={onQuoteClick}
              className="md:hidden inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-300"
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
              Expertos en Seguridad
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ofrecemos soluciones de seguridad integrales y personalizadas, utilizando tecnología de última generación combinada con nuestra experiencia en sistemas mecánicos tradicionales.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nuestro compromiso es proporcionar tranquilidad a través de sistemas de seguridad robustos y fiables, adaptados a las necesidades específicas de cada cliente.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Instalación de cerraduras de alta seguridad</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Sistemas de control de acceso</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Mantenimiento y reparación</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Asesoramiento en seguridad</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={onQuoteClick}
                className="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-300"
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
    url: '/Images/Cerradura/door.jpeg',
    title: 'Sistemas de Seguridad',
    description: 'Soluciones integrales para la protección de espacios',
  },
  {
    url: '/Images/Cerradura/Seguridad 3.jpeg',
    title: 'Cerraduras de Alta Seguridad',
    description: 'Sistemas de cierre reforzados con múltiples puntos de anclaje',
  },
  {
    url: '/Images/Cerradura/Seguridad 21.jpeg',
    title: 'Sistemas de Protección',
    description: 'Cerraduras y mecanismos de seguridad para máxima protección',
  },
];

export default SecuritySystemsPage;
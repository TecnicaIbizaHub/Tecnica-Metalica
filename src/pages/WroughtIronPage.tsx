import React from 'react';
import { ChevronRight } from 'lucide-react';
import BackToHomeButton from '../components/BackToHomeButton';

interface WroughtIronPageProps {
  onQuoteClick: () => void;
}

function WroughtIronPage({ onQuoteClick }: WroughtIronPageProps) {
  return (
    <div className="min-h-screen">
      <BackToHomeButton />
      <div className="relative h-[60vh]">
        <img
          src="/Images/hierro F/WhatsApp Image 2025-02-07 at 08.26.26 (1).jpeg"
          alt="Hierro Forjado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hierro Forjado
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-6">
              Artesanía tradicional combinada con técnicas modernas para crear piezas únicas y duraderas
            </p>
            <button 
              onClick={onQuoteClick}
              className="md:hidden inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors duration-300"
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
              Maestros del Hierro Forjado
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nuestros artesanos combinan técnicas tradicionales de forja con métodos modernos para crear piezas únicas que destacan por su belleza y durabilidad.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cada proyecto es una obra de arte única, diseñada y ejecutada con atención al más mínimo detalle, respetando tanto la estética tradicional como las necesidades contemporáneas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Puertas y portones ornamentales</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Barandillas y rejas decorativas</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Elementos arquitectónicos personalizados</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0 mt-1" />
                    <span>Restauración de piezas históricas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={onQuoteClick}
                className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors duration-300"
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
    url: '/Images/hierro F/WhatsApp Image 2025-02-07 at 08.26.26 (1).jpeg',
    title: 'Portón de Hierro Forjado',
    description: 'Diseño robusto y elegante con detalles ornamentales tradicionales',
  },
  {
    url: '/Images/hierro F/WhatsApp Image 2025-02-07 at 08.26.25.jpeg',
    title: 'Puerta de Entrada',
    description: 'Puerta de seguridad con acabados artesanales en hierro forjado',
  },
  {
    url: '/Images/hierro F/Artiustica.jpeg',
    title: 'Forja Artística',
    description: 'Elementos decorativos con diseños personalizados y acabados únicos',
  },
];

export default WroughtIronPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

interface HomePageProps {
  onQuoteClick: () => void;
}

function HomePage({ onQuoteClick }: HomePageProps) {
  return (
    <>
      <section id="inicio" className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80"
            alt="Soldador profesional trabajando con equipo de protección completo, capturando el brillo y las chispas de la soldadura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center pt-20">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Expertos en Soluciones Metálicas
              </h1>
              <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
                Más de 20 años transformando ideas en estructuras sólidas y duraderas
              </p>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-48">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">Nuestra Empresa</h2>
                  <p className="text-gray-200 leading-relaxed">
                    Técnica Metálica Ibiza es una empresa especializada en la fabricación y mantenimiento de productos de herrería y estructuras metálicas residenciales e industriales, destacando en acabados de decoración con acero inoxidable y chapa corten.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">Nuestro Compromiso</h2>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-1" />
                      <span>Compromiso y cumplimiento con las expectativas del cliente</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-1" />
                      <span>Soluciones óptimas que garantizan la durabilidad</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-1" />
                      <span>Personal idóneo para todo tipo de trabajos en metal</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-1" />
                      <span>Excelentes acabados con precios competitivos</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button 
                  onClick={onQuoteClick}
                  className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 hover:scale-105 transition duration-300 flex items-center mx-auto"
                >
                  Cotizar
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Soluciones metálicas de alta calidad para cada necesidad</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-80">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-200 text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Proyectos</h2>
            <p className="text-xl text-gray-600">
              Descubre algunos de nuestros trabajos más destacados
            </p>
          </div>
          
          <ImageCarousel />
        </div>
      </section>
    </>
  );
}

const services = [
  {
    id: 1,
    title: 'Acero Inoxidable',
    description: 'Mantenimiento y fabricación de elementos decorativos y estructurales en acero inoxidable, garantizando durabilidad y resistencia a la corrosión.',
    image: '/Blog Images/Inox 1.jpeg',
    path: '/servicios/acero-inoxidable',
  },
  {
    id: 2,
    title: 'Hierro Forjado',
    description: 'Mantenimiento y fabricación de barandillas, puertas y elementos ornamentales en hierro forjado, combinando tradición y elegancia.',
    image: '/Proyec Images 2 /Barandilla hierro.jpeg',
    path: '/servicios/hierro-forjado',
  },
  {
    id: 3,
    title: 'Acabados Chapa Corten',
    description: 'Mantenimiento y fabricación de revestimientos y elementos decorativos en acero corten, creando acabados únicos y resistentes a la intemperie.',
    image: '/Thumbnails Images/Chapa Corteen.jpg',
    path: '/servicios/chapa-corten',
  },
  {
    id: 4,
    title: 'Estructuras Arquitectónicas',
    description: 'Mantenimiento y fabricación de estructuras metálicas para proyectos arquitectónicos, asegurando solidez y precisión en cada detalle.',
    image: '/Blog Images/Estructuras arquitectonicas.jpeg',
    path: '/servicios/estructuras-arquitectonicas',
  },
  {
    id: 5,
    title: 'Forja Artística',
    description: 'Mantenimiento y fabricación de piezas únicas y elementos decorativos mediante técnicas tradicionales de forja, fusionando arte y funcionalidad.',
    image: '/Thumbnails Images/Forja artistica.jpg',
    path: '/servicios/forja-artistica',
  },
  {
    id: 6,
    title: 'Cerraduras y Sistemas de Seguridad',
    description: 'Mantenimiento y fabricación de sistemas de seguridad personalizados y cerraduras de alta calidad, priorizando la protección y confiabilidad.',
    image: '/Blog Images/Seguridad 21.jpeg',
    path: '/servicios/sistemas-seguridad',
  },
];

export default HomePage;
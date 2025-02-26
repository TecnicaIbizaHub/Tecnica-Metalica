import React from 'react';
import BackToHomeButton from '../components/BackToHomeButton';
import ImageModal from '../components/ImageModal';
import { useImageModal } from '../hooks/useImageModal';

const projects = [
  // Acero Inoxidable
  {
    id: 'inox-ceiling',
    url: '/Proyec Images 2 /Techo inox.jpeg',
    title: 'Techo de Acero Inoxidable',
    description: 'Estructura de techo con acabado en acero inoxidable marino',
    category: 'Acero Inoxidable'
  },
  {
    id: 'inox-door',
    url: '/Proyec Images 2 /Puerta inox.jpeg',
    title: 'Puerta de Acero Inoxidable',
    description: 'Puerta moderna con acabado pulido espejo',
    category: 'Acero Inoxidable'
  },
  {
    id: 'inox-umbrella',
    url: '/Proyec Images 2 /Sombrilla inox.jpeg',
    title: 'Estructura para Sombrilla',
    description: 'Soporte en acero inoxidable para exterior con resistencia marina',
    category: 'Acero Inoxidable'
  },
  {
    id: 'inox-railing-1',
    url: '/Images/Inox/WhatsApp Image 2025-02-19 at 19.26.55 (1).jpeg',
    title: 'Barandilla Inoxidable',
    description: 'Barandilla moderna con acabado satinado',
    category: 'Acero Inoxidable'
  },
  {
    id: 'inox-detail',
    url: '/Images/Inox/WhatsApp Image 2025-02-19 at 19.24.33 (1).jpeg',
    title: 'Detalle Arquitectónico',
    description: 'Elemento decorativo en acero inoxidable pulido',
    category: 'Acero Inoxidable'
  },

  // Chapa Corten
  {
    id: 'corten-facade',
    url: '/Blog Images/Corten 2.jpeg',
    title: 'Fachada Corten',
    description: 'Revestimiento arquitectónico con paneles de acero corten',
    category: 'Chapa Corten'
  },
  {
    id: 'corten-shelf',
    url: '/Proyec Images 2 /Estanteria Corten.jpeg',
    title: 'Estantería Corten',
    description: 'Mueble decorativo con acabado oxidado natural',
    category: 'Chapa Corten'
  },
  {
    id: 'corten-door',
    url: '/Images/Corten/Puerta Corten .png',
    title: 'Puerta Corten',
    description: 'Puerta exterior con diseño contemporáneo',
    category: 'Chapa Corten'
  },
  {
    id: 'corten-garden',
    url: '/Images/Corten/Corten Exterior.jpeg',
    title: 'Jardín Corten',
    description: 'Integración de acero corten en paisajismo',
    category: 'Chapa Corten'
  },

  // Forja Artística
  {
    id: 'artistic-forge-1',
    url: '/Proyec Images 2 /Artistica 7 .jpeg',
    title: 'Forja Artística',
    description: 'Elemento decorativo con diseño personalizado',
    category: 'Forja Artística'
  },
  {
    id: 'artistic-element-2',
    url: '/Proyec Images 2 /Artistica 9 .jpeg',
    title: 'Elemento Artístico',
    description: 'Pieza decorativa con motivos tradicionales',
    category: 'Forja Artística'
  },
  {
    id: 'artistic-forge-3',
    url: '/Proyec Images 2 /Artisticaa 6.jpeg',
    title: 'Forja Decorativa',
    description: 'Elemento ornamental con acabado envejecido',
    category: 'Forja Artística'
  },
  {
    id: 'artistic-detail',
    url: '/Images/Artistica/Artistica.jpeg',
    title: 'Detalle Artístico',
    description: 'Trabajo detallado en forja tradicional',
    category: 'Forja Artística'
  },
  {
    id: 'artistic-modern',
    url: '/Images/Artistica/Artistica 4.jpeg',
    title: 'Diseño Moderno',
    description: 'Combinación de forja tradicional con diseño contemporáneo',
    category: 'Forja Artística'
  },

  // Hierro Forjado
  {
    id: 'iron-railing',
    url: '/Proyec Images 2 /Barandilla hierro.jpeg',
    title: 'Barandilla de Hierro',
    description: 'Barandilla de seguridad con diseño clásico',
    category: 'Hierro Forjado'
  },
  {
    id: 'exterior-iron-door',
    url: '/Proyec Images 2 /Puerta hierro Ext.jpeg',
    title: 'Puerta de Hierro Exterior',
    description: 'Puerta de seguridad con acabados tradicionales',
    category: 'Hierro Forjado'
  },
  {
    id: 'exterior-door',
    url: '/Proyec Images 2 /Puerta ext.jpeg',
    title: 'Puerta Exterior',
    description: 'Puerta de seguridad con diseño moderno',
    category: 'Hierro Forjado'
  },

  // Estructuras
  {
    id: 'ceiling-structure',
    url: '/Proyec Images 2 /Techo.jpeg',
    title: 'Estructura de Techo',
    description: 'Estructura metálica para cubierta',
    category: 'Estructuras'
  },
  {
    id: 'architectural-structure',
    url: '/Images/Estructuras /Estructuras arquitectonicas.jpeg',
    title: 'Estructura Arquitectónica',
    description: 'Diseño y construcción de estructura metálica compleja',
    category: 'Estructuras'
  },
  {
    id: 'exterior-structure',
    url: '/Images/Estructuras /Exteriores 1.jpeg',
    title: 'Estructura Exterior',
    description: 'Pérgola metálica para espacio exterior',
    category: 'Estructuras'
  }
];

function ProjectsPage() {
  const { isOpen, openModal, closeModal } = useImageModal();

  const handleImageClick = (index: number) => {
    const modalImages = projects.map(project => ({
      url: project.url,
      title: project.title,
      description: project.description
    }));
    openModal(modalImages, index);
  };

  // Agrupar proyectos por categoría
  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToHomeButton />
      
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img
            src="/Proyec Images 2 /Estanteria Corten.jpeg"
            alt="Proyectos Destacados"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                Nuestros Proyectos
              </h1>
              <p className="text-xl text-gray-200 text-center">
                Descubre nuestra trayectoria a través de proyectos que demuestran nuestro compromiso con la excelencia y la innovación en el trabajo del metal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
            <div key={category} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProjects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div 
                      className="relative h-64 cursor-pointer group"
                      onClick={() => handleImageClick(projects.findIndex(p => p.id === project.id))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleImageClick(projects.findIndex(p => p.id === project.id));
                        }
                      }}
                    >
                      <img
                        src={project.url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ImageModal
        images={projects.map(project => ({
          url: project.url,
          title: project.title,
          description: project.description
        }))}
        initialIndex={0}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default ProjectsPage;
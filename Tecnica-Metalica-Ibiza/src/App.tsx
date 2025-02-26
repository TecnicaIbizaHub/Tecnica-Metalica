import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import StainlessSteelPage from './pages/StainlessSteelPage';
import WroughtIronPage from './pages/WroughtIronPage';
import CortenSteelPage from './pages/CortenSteelPage';
import ArchitecturalPage from './pages/ArchitecturalPage';
import ArtisticForgePage from './pages/ArtisticForgePage';
import SecuritySystemsPage from './pages/SecuritySystemsPage';
import ProjectsPage from './pages/ProjectsPage';
import QuoteModal from './components/QuoteModal';

function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          const navHeight = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuAnimation('mobile-menu-exit');
      setTimeout(() => {
        setIsMenuOpen(false);
        setMenuAnimation('');
      }, 400);
    } else {
      setIsMenuOpen(true);
      setMenuAnimation('mobile-menu-enter');
      setTimeout(() => {
        setMenuAnimation('');
      }, 400);
    }
  };

  const getQuoteButtonColor = () => {
    switch (location.pathname) {
      case '/servicios/acero-inoxidable':
      case '/servicios/hierro-forjado':
      case '/servicios/chapa-corten':
      case '/servicios/estructuras-arquitectonicas':
      case '/servicios/forja-artistica':
      case '/servicios/sistemas-seguridad':
      default:
        return 'bg-primary hover:bg-primary-dark';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        menuAnimation={menuAnimation}
        toggleMenu={toggleMenu}
        onQuoteClick={() => setIsQuoteModalOpen(true)}
      />

      <Routes>
        <Route path="/" element={<HomePage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/acero-inoxidable" element={<StainlessSteelPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/hierro-forjado" element={<WroughtIronPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/chapa-corten" element={<CortenSteelPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/estructuras-arquitectonicas" element={<ArchitecturalPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/forja-artistica" element={<ArtisticForgePage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/servicios/sistemas-seguridad" element={<SecuritySystemsPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
      </Routes>

      <footer id="contacto" className="bg-secondary-light text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tecnica Metalica Ibiza</h3>
              <p className="text-gray-400 mb-4">
                Expertos en soluciones metálicas industriales y arquitectónicas desde 2005.
              </p>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <span className="font-semibold text-gray-300">Horario:</span><br />
                  Lunes - Viernes: 8:00 - 17:00<br />
                  Sábado - Domingo: Cerrado
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    631 642 114<br />
                    602 197 534<br />
                    871 52 27 93
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="break-all">inf.tecnicametalicaibiza@hotmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Dirección</h3>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  Calle Atzaro Nº18 Bajo,<br />
                  07800 Eivissa,<br />
                  Islas Baleares
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-400">&copy; 2024 Tecnica Metalica Ibiza. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        buttonColor={getQuoteButtonColor()}
      />
    </div>
  );
}

export default App;
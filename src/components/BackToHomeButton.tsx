import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function BackToHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (location.pathname === '/proyectos') {
      navigate('/', { state: { scrollTo: 'inicio' } });
    } else {
      navigate('/', { state: { scrollTo: 'servicios' } });
    }
  };

  const getButtonColor = () => {
    if (!isScrolled) {
      return 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white';
    }

    switch (location.pathname) {
      case '/servicios/acero-inoxidable':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case '/servicios/hierro-forjado':
        return 'bg-amber-700 text-white hover:bg-amber-800';
      case '/servicios/chapa-corten':
        return 'bg-orange-700 text-white hover:bg-orange-800';
      case '/servicios/estructuras-arquitectonicas':
        return 'bg-gray-700 text-white hover:bg-gray-800';
      case '/servicios/forja-artistica':
        return 'bg-purple-600 text-white hover:bg-purple-700';
      case '/servicios/sistemas-seguridad':
        return 'bg-red-700 text-white hover:bg-red-800';
      case '/proyectos':
        return 'bg-green-600 text-white hover:bg-green-700';
      default:
        return 'bg-green-600 text-white hover:bg-green-700';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed top-20 left-6 z-50 px-4 py-2 rounded-full flex items-center transition-all duration-300 shadow-lg ${getButtonColor()}`}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="ml-1">Volver al Inicio</span>
    </button>
  );
}

export default BackToHomeButton;
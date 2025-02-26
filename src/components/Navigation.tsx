import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  menuAnimation: string;
  toggleMenu: () => void;
  onQuoteClick: () => void;
}

function Navigation({ isScrolled, isMenuOpen, menuAnimation, toggleMenu, onQuoteClick }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (isMenuOpen) {
        toggleMenu();
      }
    }
  };

  const getMenuColor = () => {
    if (!isScrolled) return 'text-white';

    switch (location.pathname) {
      case '/servicios/acero-inoxidable':
        return 'text-gray-800';
      case '/servicios/hierro-forjado':
        return 'text-gray-800';
      case '/servicios/chapa-corten':
        return 'text-gray-800';
      case '/servicios/estructuras-arquitectonicas':
        return 'text-gray-800';
      case '/servicios/forja-artistica':
        return 'text-gray-800';
      case '/servicios/sistemas-seguridad':
        return 'text-gray-800';
      default:
        return 'text-gray-800';
    }
  };

  const getQuoteButtonColor = () => {
    if (!isScrolled) {
      return 'bg-white text-black hover:bg-gray-100';
    }
    return 'bg-black text-white hover:bg-gray-900';
  };

  const getTextColor = () => {
    if (!isScrolled) return 'text-white';
    return 'text-gray-900';
  };

  const menuItems = ['inicio', 'servicios', 'proyectos', 'contacto'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {isHomePage ? (
            <>
              <div className="flex-shrink-0 flex items-center">
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="flex items-center gap-3"
                >
                  <img 
                    src="/Logo/LogoTransparente.png"
                    alt="Tecnica Metalica Ibiza"
                    className="h-10 w-auto object-contain"
                  />
                  <span className={`font-semibold text-lg ${getTextColor()}`}>
                    Tecnica Metalica Ibiza
                  </span>
                </button>
              </div>
              
              <div className="hidden md:flex flex-1 justify-center items-center">
                <div className="flex space-x-8">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize transition-all duration-300 hover:scale-105 ${
                        isScrolled
                          ? 'text-gray-700 hover:text-black'
                          : 'text-white hover:text-gray-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className={`transition-colors duration-300 ${getMenuColor()}`}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="/Logo/LogoTransparente.png"
                  alt="Tecnica Metalica Ibiza"
                  className="h-10 w-auto object-contain"
                />
                <span className={`font-semibold text-lg ${getTextColor()}`}>
                  Tecnica Metalica Ibiza
                </span>
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center flex-shrink-0">
            <button 
              onClick={onQuoteClick}
              className={`px-6 py-2 rounded-md transition-all duration-300 hover:scale-105 ${getQuoteButtonColor()}`}
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>

      {isHomePage && isMenuOpen && (
        <div 
          className={`md:hidden bg-black shadow-lg overflow-hidden ${menuAnimation}`}
          style={{
            transformOrigin: 'top',
            maxHeight: isMenuOpen ? '400px' : '0',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="menu-item w-full text-left block px-3 py-2 rounded-md text-white hover:bg-gray-900 capitalize transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                toggleMenu();
                onQuoteClick();
              }}
              className="menu-item w-full text-left px-3 py-2 rounded-md text-white hover:bg-gray-900 transition-all duration-300"
              style={{ animationDelay: `${menuItems.length * 0.1}s` }}
            >
              Cotizar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
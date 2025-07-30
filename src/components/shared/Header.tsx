import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Logo from './Logo';

interface NavItem {
  path: string;
  label: string;
  subItems?: NavItem[];
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path || 
                     (path !== '/' && location.pathname.startsWith(path));
    return `${isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'} transition-colors`;
  };

  const getSiteName = () => {
    if (location.pathname.includes('/elearning')) return 'Plateforme E-Learning';
    if (location.pathname.includes('/marketplace')) return 'Marketplace Agricole';
    return 'CIAPO COOP-CA';
  };

  const getHeaderBg = () => {
    if (location.pathname.includes('/elearning') || location.pathname.includes('/marketplace')) {
      return scrolled ? 'bg-white shadow-md' : 'bg-transparent';
    }
    return scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm';
  };

  const navItems: NavItem[] = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À Propos' },
    { 
      path: '/programs', 
      label: 'Formations', 
      subItems: [
        { path: '/programs/professionnelle', label: 'Formation Professionnelle' },
        { path: '/programs/universitaire', label: 'Formation Universitaire' },
        { path: '/programs/amelioration', label: 'Amélioration Professionnelle' }
      ]
    },
    { 
      path: '/services', 
      label: 'Services', 
      subItems: [
        { path: '/services/divers', label: 'Services Divers' },
        { path: '/services/projets', label: 'Montage de Projets' },
        { path: '/services/accompagnement', label: 'Accompagnement' }
      ]
    },
    { path: '/news', label: 'Actualités' },
    { path: '/contact', label: 'Contact' }
  ];

  const renderDesktopNavItem = (item: NavItem) => {
    if (item.subItems) {
      return (
        <div 
          key={item.path}
          className="relative group"
          onMouseEnter={() => setOpenDropdown(item.path)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button 
            className={`${getNavLinkClass(item.path)} flex items-center px-3 py-2`}
            onClick={() => toggleDropdown(item.path)}
          >
            {item.label}
            {openDropdown === item.path ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
          
          {(openDropdown === item.path) && (
            <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg z-50">
              {item.subItems.map(subItem => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`${getNavLinkClass(subItem.path)} block px-4 py-2 hover:bg-neutral-50 whitespace-normal`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${getNavLinkClass(item.path)} px-3 py-2 whitespace-nowrap`}
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    if (item.subItems) {
      return (
        <div key={item.path} className="w-full">
          <button 
            className={`${getNavLinkClass(item.path)} w-full flex justify-between items-center py-3 px-4`}
            onClick={() => toggleDropdown(item.path)}
          >
            <span>{item.label}</span>
            {openDropdown === item.path ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openDropdown === item.path && (
            <div className="pl-6 space-y-2">
              {item.subItems.map(subItem => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`${getNavLinkClass(subItem.path)} block py-2`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${getNavLinkClass(item.path)} block py-3 px-4`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBg()}`}>
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="Accueil">
              <Logo />
              <div className="ml-3">
                <h1 className="block font-heading font-bold text-lg md:text-xl leading-tight">
                  {getSiteName()}
                </h1>
                <p className="text-xs text-neutral-500 hidden sm:block">
                  Entrepreneuriat & Formation Agricole
                </p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-1">
              {navItems.map(renderDesktopNavItem)}
            </ul>

            <div className="border-l border-neutral-200 h-6 mx-4"></div>
            
            <div className="flex space-x-2">
              <Link 
                to="/elearning" 
                className="button-outline text-sm py-2 px-4 whitespace-nowrap"
              >
                E-Learning
              </Link>
              <Link 
                to="/marketplace" 
                className="button-primary text-sm py-2 px-4 whitespace-nowrap"
              >
                Marketplace
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-2 px-4 absolute w-full">
          <ul className="space-y-1">
            {navItems.map(renderMobileNavItem)}
            
            <li className="pt-2 mt-2 border-t border-neutral-200">
              <Link 
                to="/elearning" 
                className="block button-outline text-center mb-3 py-2.5"
              >
                E-Learning
              </Link>
              <Link 
                to="/marketplace" 
                className="block button-primary text-center py-2.5"
              >
                Marketplace
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
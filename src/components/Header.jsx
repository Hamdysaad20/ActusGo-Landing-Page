import { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon, ChevronDown, ChevronUp, Cpu, Shield, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'unset' : 'hidden';
  };

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { key: 'StartNow', href: '#StartNow' },
    { key: 'WhyUs', href: '#WhyUs' },
    { key: 'Discover', href: '#Discover' },
    { key: 'B2B', href: '#B2B' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all shadow-lg duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-md py-1' : 'bg-gray-900 py-3'}`}>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className={`flex-shrink-0 flex items-center gap-2 transition-all duration-300 ${isOpen ? 'scale-90' : 'scale-100'}`}>
            <div className={`transition-all duration-300 ${isOpen ? 'w-[40px]' : 'w-[50px]'}`}>
              <img className="max-w-[100%] rounded-2xl" src="/images/ActusGoLogo.png" alt="Logo" />
            </div>
            <span className={`font-semibold text-white transition-all duration-300 ${isOpen ? 'text-xl' : 'text-2xl'}`}>{t('brand.name')}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify -center flex-1 mx-8">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="text-white text-sm md:text-lg hover:text-gray-300 px-4 transition-colors duration-200">
                {t(`nav.${item.key}`)}
              </a>
            ))}
            {/* Features Tab on Desktop */}
            <div className="relative group">
              <button
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
                className="text-white text-sm md:text-lg px-4 transition-colors duration-200 flex items-center"
              >
                {t('nav.features.title')}
                <span
                  className={`ml-1 transform transition-transform duration-300 ${featuresOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                  {featuresOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              {featuresOpen && (
                <div
                  onMouseEnter={() => setFeaturesOpen(true)}
                  onMouseLeave={() => setFeaturesOpen(false)}
                  className="absolute top-full left-0 w-48 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform opacity-100 scale-100"
                >
                  <Link to="/ai" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> {t('nav.features.ai')}
                  </Link>
                  <Link to="/blockchain" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                    <Shield className="h-4 w-4" /> {t('nav.features.blockchain')}
                  </Link>
                  <Link to="/gamification" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4" /> {t('nav.features.gamification')}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button onClick={changeLanguage} className="flex items-center text-white hover:text-gray-300 transition-colors duration-200">
              <Globe className="h-5 w-5 mr-1 rtl:ml-1" />
              {isRTL ? 'English' : 'العربية'}
            </button>
            <button onClick={toggleTheme} className="text-white hover:text-gray-300 transition-colors duration-200">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <a href='https://app.actusgo.com/' className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
              {t('nav.signIn')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2 hover:bg-gray-700 rounded-md">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 md:hidden z-50" onClick={toggleMenu} />
        )}

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 bottom-0 w-72 bg-gray-900 z-50 transition-transform duration-300 ease-in-out md:hidden h-screen ${isRTL ? `right-auto left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}` : `left-auto right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex-shrink-0 flex items-center gap-2">
                <img className="w-[40px] rounded-2xl" src="/images/ActusGoLogo.png" alt="Logo" />
                <span className="font-semibold text-white text-xl">{t('brand.name')}</span>
              </div>
              <button onClick={toggleMenu} className="text-white p-2 hover:bg-gray-700 rounded-md">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 py-4">
              {navItems.map((item) => (
                <a key={item.key} href={item.href} className="block text-white px-4 py-3 hover:bg-gray-700" onClick={toggleMenu}>
                  {t(`nav.${item.key}`)}
                </a>
              ))}

              {/* Features Dropdown for Mobile */}
              <div className="px-4 py-3">
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="text-white flex items-center w-full rounded-md"
                >
                  {t('nav.features.title')}
                  <span
                    className={`ml-1 transform transition-transform duration-300 ${featuresOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                  >
                    {featuresOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>
                {featuresOpen && (
                  <div className="mt-2 bg-gray-800 rounded-md overflow-hidden">
                    <Link to="/ai" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> {t('nav.features.ai')}
                    </Link>
                    <Link to="/blockchain" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                      <Shield className="h-4 w-4" /> {t('nav.features.blockchain')}
                    </Link>
                    <Link to="/gamification" className="px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" /> {t('nav.features.gamification')}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-5 border-t border-gray-700 p-4 mt-auto">
              <div className="flex gap-2">
                <button
                  onClick={changeLanguage}
                  className="w-fit flex items-center justify-center text-white px-4 py-3 hover:bg-gray-700 rounded-md transition-colors duration-200"
                >
                  <Globe className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'English' : 'العربية'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </div>
              <div className="w-full bg-white text-gray-900 text-center px-4 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                <a href="https://app.actusgo.com/">{t('nav.signIn')}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

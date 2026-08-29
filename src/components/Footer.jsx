import footerBg from '../assets/Footer/Footer.png';
import ConnectWidget from './ConnectWidget';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 px-6 md:px-16 h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Scale and translate the image to crop the top */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom w-full h-full scale-[1.3] md:scale-[1.5] origin-bottom translate-y-[10%]"
          style={{ backgroundImage: `url(${footerBg})` }}
        />
        {/* Dark overlay at the top to blend the background smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">

        {/* Top Section */}
        <div id="lets-connect" className="mb-8">
          <ConnectWidget />
        </div>

        {/* Middle Section - Socials */}
        <div className="flex flex-wrap justify-between items-center py-6 border-t border-white/10 mb-4 text-sm md:text-lg font-medium">
        </div>

        {/* Huge Text Section */}
        <div className="w-full text-center flex-1 flex items-center justify-center min-h-0 px-4">
          <h1 className="text-[9vw] md:text-[10vw] font-bold leading-none tracking-tighter whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            HEENA RATHER
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 mt-auto pt-6">
          <p>© {new Date().getFullYear()} Heena Rather. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms and conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import MobileWelcomeScreen from './MobileWelcomeScreen';

const WelcomeScreen = ({ onStart }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // Local asset paths (optimized WebP format)
  const backgroundImage = "/images/background.webp";
  const logoImage = "/images/logo.webp";
  const vectorLeft = "/images/vector-left.png";
  const vectorRight = "/images/vector-right.png";

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile version for small screens
  if (isMobile) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <MobileWelcomeScreen
          onStart={onStart}
          backgroundImage={backgroundImage}
          logoImage={logoImage}
        />
      </div>
    );
  }

  // Render desktop version for larger screens
  return (
    <ResponsiveContainer backgroundImage={backgroundImage}>
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">

      {/* Decorative Vector - Left Bottom - Hidden to prevent grey lines */}
      <div
        className="absolute left-0 bottom-0 w-[745.925px] h-[430.386px] -translate-x-[25%] translate-y-[15%] flex items-center justify-center overflow-hidden"
        style={{ display: 'none' }}
      >
        <div
          className="flex-none"
          style={{
            transform: 'rotate(182.722deg) scaleY(-1) skewX(358.2deg)',
            width: '740.402px',
            height: '395.271px'
          }}
        >
          <img
            src={vectorLeft}
            alt=""
            className="block w-full h-full"
          />
        </div>
      </div>

      {/* Decorative Vector - Right Top - Hidden to prevent grey lines */}
      <div
        className="absolute right-0 top-0 w-[745.925px] h-[430.386px] translate-x-[15%] -translate-y-[20%] flex items-center justify-center overflow-hidden"
        style={{ display: 'none' }}
      >
        <div
          className="flex-none"
          style={{
            transform: 'rotate(182.722deg) scaleY(-1) skewX(358.2deg)',
            width: '740.402px',
            height: '395.271px'
          }}
        >
          <img
            src={vectorRight}
            alt=""
            className="block w-full h-full"
          />
        </div>
      </div>

      {/* Main Content Container - Centered */}
      <div className="relative w-[1577px] flex flex-col items-center justify-start" style={{ height: '1117px' }}>
        {/* Main Glass Card Container */}
        <div
          className="absolute left-1/2 top-[154px] -translate-x-1/2 w-[1577px] h-[809px] rounded-[20px]"
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          {/* Let's Play Heading */}
          <div className="absolute left-1/2 top-[96px] -translate-x-1/2 w-[1090px] flex flex-col items-center gap-[49px]">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} className="text-[55px] text-white text-center leading-normal w-[666px] h-[59px] whitespace-pre-wrap">
              Let's Play
            </p>
          </div>
        </div>

        {/* START Button */}
        <div
          className="absolute left-1/2 top-[830px] -translate-x-1/2 w-[379px] h-[61px] rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
          }}
          onClick={onStart}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[289px] flex flex-col items-center">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }} className="text-[32px] text-white text-center leading-normal whitespace-pre-wrap">
              START
            </p>
          </div>
        </div>

        {/* Logo Left */}
        <div className="absolute left-1/2 top-[250px] -translate-x-1/2 -ml-[314px] w-[90px] h-[60px]">
          <img
            src={logoImage}
            alt="Magic Maker AI"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Logo Right */}
        <div className="absolute left-1/2 top-[250px] -translate-x-1/2 ml-[314px] w-[90px] h-[60px]">
          <img
            src={logoImage}
            alt="Magic Maker AI"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Instruction Text */}
        <p
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200 }}
          className="absolute left-1/2 top-[501px] -translate-x-1/2 w-[1400px] text-[46px] text-white text-center leading-normal"
        >
          <span>Choose between the two shots, which one was </span>
          <span style={{ fontWeight: 700 }}>created using AI</span>
          <span>. You have</span>
          <span style={{ fontWeight: 500 }}> 5 seconds to choose each shot</span>
          <span>.</span>
        </p>
      </div>
    </div>
    </ResponsiveContainer>
  );
};

export default WelcomeScreen;

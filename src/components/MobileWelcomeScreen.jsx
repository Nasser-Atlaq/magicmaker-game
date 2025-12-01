import React, { useEffect, useState, useCallback } from 'react';

const MobileWelcomeScreen = ({ onStart, backgroundImage, logoImage }) => {
  const designWidth = 433; // Figma mobile design width
  const designHeight = 956; // Figma mobile design height

  // Calculate initial scale immediately
  const calculateScale = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / designWidth;
    const scaleY = windowHeight / designHeight;

    return Math.min(scaleX, scaleY, 1); // Max scale of 1 to prevent upscaling
  }, []);

  const [scale, setScale] = useState(calculateScale);

  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateScale]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Full-screen background */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(6.1px)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.74 }} />
      </div>

      {/* Scaled content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: `${designWidth}px`,
            height: `${designHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            position: 'relative',
            transition: 'transform 0.2s ease-out',
          }}
        >

      {/* Main Glass Card */}
      <div
        className="absolute rounded-[20px]"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: '76px',
          width: '397px',
          height: '804px',
          backdropFilter: 'blur(65.05px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        {/* "Let's play" Heading - Inside Card */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: '50%',
            top: '134px',
            transform: 'translateX(-50%)',
            width: '1090px',
          }}
        >
          <p
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            className="text-[31px] text-white text-center leading-normal whitespace-pre-wrap"
          >
            Let's play
          </p>
        </div>
      </div>

      {/* Logo - Absolute to page */}
      <div
        className="absolute"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: '143px',
          width: '56px',
          height: '37px',
        }}
      >
        <img
          src={logoImage}
          alt="Magic Maker AI"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Instructions Text - Absolute to page */}
      <div
        className="absolute flex flex-col justify-center"
        style={{
          left: '50%',
          top: '494px',
          transform: 'translate(-50%, -50%)',
          width: '326px',
          height: '448px',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 200,
          fontSize: '0px',
          lineHeight: '0',
          textAlign: 'center',
        }}
      >
        <p className="text-[31px] text-white leading-normal whitespace-pre-wrap">
          <span>Choose between the two shots, which one was </span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>created using AI</span>
          <span>. You have</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}> five seconds to choose each shot</span>
          <span>.</span>
        </p>
      </div>

      {/* START Button */}
      <div
        className="absolute rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-105"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: '762px',
          width: '233px',
          height: '38px',
          backdropFilter: 'blur(65.05px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
        onClick={onStart}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
        }}
      >
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '289px',
          }}
        >
          <p
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            className="text-[20px] text-white text-center leading-normal whitespace-pre-wrap"
          >
            START
          </p>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWelcomeScreen;

import React, { useState, useEffect } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import MobileFailureScreen from './MobileFailureScreen';

const FailureScreen = ({ score = 2, totalQuestions = 5 }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // Local asset paths (optimized WebP format)
  const backgroundImage = "/images/background.webp";
  const logoImage = "/images/logo.webp";

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
        <MobileFailureScreen
          score={score}
          totalQuestions={totalQuestions}
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

      {/* Main Content Container - Centered */}
      <div className="relative w-[1577px] flex flex-col items-center justify-start" style={{ height: '1117px' }}>
        {/* Main Glass Card Container with Red Tint */}
        <div
          className="absolute left-1/2 top-[154px] -translate-x-1/2 w-[1577px] h-[809px] rounded-[20px]"
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: 'rgba(255, 0, 4, 0.05)',
            border: '2px solid rgba(255, 0, 4, 0.4)',
            background: 'linear-gradient(135deg, rgba(255, 0, 4, 0.1) 0%, rgba(255, 0, 4, 0.02) 100%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          {/* Game Over Heading */}
          <div className="absolute left-1/2 top-[96px] -translate-x-1/2 w-[1090px] flex flex-col items-center gap-[49px]">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} className="text-[55px] text-white text-center leading-normal w-[666px] h-[59px] whitespace-pre-wrap">
              Game Over
            </p>
          </div>
        </div>

        {/* Score Display - 4/5 */}
        <p
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
          className="absolute left-1/2 top-[469px] -translate-x-1/2 text-[128px] text-white text-center leading-normal w-[284px] h-[123px] whitespace-pre-wrap"
        >
          {score}/{totalQuestions}
        </p>

        {/* Good luck and Exhibition Message */}
        <div
          className="absolute left-1/2 top-[696px] -translate-x-1/2 w-[1302px] h-[222px] text-center text-white"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Good luck for next time! */}
          <p style={{ fontWeight: 700 }} className="text-[62px] leading-normal mb-0">
            Good luck for next time!
          </p>

          {/* We are very pleased with your experience */}
          <p style={{ fontWeight: 200 }} className="text-[41px] leading-normal mb-0">
            We are very pleased with your experience.
          </p>

          {/* You can visit our booth at the exhibition */}
          <p style={{ fontWeight: 200 }} className="text-[41px] leading-normal">
            You can visit our booth at the exhibition.
          </p>
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
      </div>
    </div>
    </ResponsiveContainer>
  );
};

export default FailureScreen;

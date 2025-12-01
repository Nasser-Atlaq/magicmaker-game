import React, { useEffect, useState, useCallback } from 'react';

const MobileFailureScreen = ({ score = 4, totalQuestions = 5, backgroundImage, logoImage }) => {
  const designWidth = 433;
  const designHeight = 956;

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
          {/* Main Glass Card with Red Tint */}
          <div
            className="absolute rounded-[20px]"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '76px',
              width: '397px',
              height: '804px',
              backdropFilter: 'blur(65.05px)',
              backgroundColor: 'rgba(255, 0, 4, 0.05)',
              border: '2px solid rgba(255, 0, 4, 0.4)',
              background: 'linear-gradient(135deg, rgba(255, 0, 4, 0.1) 0%, rgba(255, 0, 4, 0.02) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            {/* "Game Over" Heading - Inside Card */}
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
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
                className="text-[36px] text-white text-center leading-normal whitespace-pre-wrap"
              >
                Game Over
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

          {/* Score Display - 4/5 */}
          <p
            className="absolute text-[128px] text-white text-center leading-normal whitespace-pre-wrap"
            style={{
              left: '50%',
              top: '388px',
              transform: 'translateX(-50%)',
              width: '284px',
              height: '123px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
            }}
          >
            {score}/{totalQuestions}
          </p>

          {/* Failure Message */}
          <div
            className="absolute text-center text-white whitespace-pre-wrap"
            style={{
              left: '50%',
              top: '582px',
              transform: 'translateX(-50%)',
              width: '333px',
              height: '222px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 100,
              fontSize: '0px',
              lineHeight: 'normal',
            }}
          >
            {/* Good luck for next time! */}
            <p
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
              className="text-[24px] leading-normal mb-0"
            >
              Good luck for next time!
            </p>

            {/* We are very pleased with your experience. */}
            <p
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200 }}
              className="text-[24px] leading-normal mb-0"
            >
              We are very pleased with your experience.
            </p>

            {/* You can visit our booth at the exhibition. */}
            <p
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200 }}
              className="text-[24px] leading-normal"
            >
              You can visit our booth at the exhibition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFailureScreen;

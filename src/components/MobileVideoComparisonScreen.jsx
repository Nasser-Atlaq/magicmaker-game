import React, { useEffect, useState, useCallback } from 'react';

const MobileVideoComparisonScreen = ({ onNext, backgroundImage, logoImage, leftVideo, rightVideo }) => {
  const [selectedVideo, setSelectedVideo] = useState(null); // 'top' or 'bottom'
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

  const handleVideoClick = (side) => {
    setSelectedVideo(side);
  };

  const handleNext = () => {
    if (selectedVideo) {
      // Map mobile selection to desktop convention (top -> left, bottom -> right)
      const mappedSelection = selectedVideo === 'top' ? 'left' : 'right';
      onNext(mappedSelection);
      setSelectedVideo(null); // Reset for next question
    }
  };

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
            {/* "Choose AI Video" Heading - Inside Card */}
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
                <span>Choose </span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>AI Video</span>
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

          {/* Top Video Container */}
          <div
            className="absolute rounded-[20px] cursor-pointer transition-all duration-100"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '279px',
              width: '350px',
              height: '198px',
              backdropFilter: 'blur(65.05px)',
              backgroundColor: selectedVideo === 'top' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: selectedVideo === 'top' ? '3px solid rgba(76, 175, 80, 1)' : '1px solid rgba(255, 255, 255, 0.18)',
              background: selectedVideo === 'top'
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
              boxShadow: selectedVideo === 'top'
                ? '0 0 20px rgba(76, 175, 80, 0.5), 0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
            onClick={() => handleVideoClick('top')}
            onMouseEnter={(e) => {
              if (selectedVideo !== 'top') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedVideo !== 'top') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
              }
            }}
          >
            <div
              className="absolute rounded-[21px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '335px',
                height: '188px',
              }}
            >
              <video
                src={leftVideo}
                className="absolute inset-0 w-full h-full object-cover rounded-[21px]"
                autoPlay
                muted
                playsInline
              />
            </div>
          </div>

          {/* Bottom Video Container */}
          <div
            className="absolute rounded-[20px] cursor-pointer transition-all duration-100"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '497px',
              width: '350px',
              height: '198px',
              backdropFilter: 'blur(65.05px)',
              backgroundColor: selectedVideo === 'bottom' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: selectedVideo === 'bottom' ? '3px solid rgba(76, 175, 80, 1)' : '1px solid rgba(255, 255, 255, 0.18)',
              background: selectedVideo === 'bottom'
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
              boxShadow: selectedVideo === 'bottom'
                ? '0 0 20px rgba(76, 175, 80, 0.5), 0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
            onClick={() => handleVideoClick('bottom')}
            onMouseEnter={(e) => {
              if (selectedVideo !== 'bottom') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedVideo !== 'bottom') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
              }
            }}
          >
            <div
              className="absolute rounded-[21px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '334px',
                height: '188px',
              }}
            >
              <video
                src={rightVideo}
                className="absolute inset-0 w-full h-full object-cover rounded-[21px]"
                autoPlay
                muted
                playsInline
              />
            </div>
          </div>

          {/* NEXT Button */}
          <div
            className={`absolute rounded-[20px] transition-all duration-300 ${
              selectedVideo ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
            }`}
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '762px',
              width: '233px',
              height: '38px',
              backdropFilter: 'blur(65.05px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: selectedVideo
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
            onClick={handleNext}
            onMouseEnter={(e) => {
              if (selectedVideo) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedVideo) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
              }
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
                NEXT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVideoComparisonScreen;

import React, { useState, useEffect } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import MobileVideoComparisonScreen from './MobileVideoComparisonScreen';

const VideoComparisonScreen = ({ onNext, questionNumber = 1, totalQuestions = 5, leftVideo, rightVideo }) => {
  const [selectedVideo, setSelectedVideo] = useState(null); // 'left' or 'right'
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

  const handleVideoClick = (side) => {
    setSelectedVideo(side);
  };

  const handleNext = () => {
    if (selectedVideo) {
      onNext(selectedVideo);
      setSelectedVideo(null); // Reset for next question
    }
  };

  // Render mobile version for small screens
  if (isMobile) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <MobileVideoComparisonScreen
          onNext={onNext}
          backgroundImage={backgroundImage}
          logoImage={logoImage}
          leftVideo={leftVideo}
          rightVideo={rightVideo}
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
          {/* Choose AI Video Heading */}
          <div className="absolute left-1/2 top-[96px] -translate-x-1/2 w-[1090px] flex flex-col items-center gap-[49px]">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }} className="text-[55px] text-white text-center leading-normal w-[666px] h-[59px] whitespace-pre-wrap">
              <span>Choose </span>
              <span style={{ fontWeight: 700 }}>AI Video</span>
            </p>
          </div>
        </div>

        {/* Left Video Container */}
        <div
          className="absolute left-1/2 top-[396px] -translate-x-1/2 -ml-[366px] w-[620px] h-[350px] rounded-[20px] cursor-pointer transition-all duration-100"
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: selectedVideo === 'left' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: selectedVideo === 'left' ? '3px solid rgba(76, 175, 80, 1)' : '1px solid rgba(255, 255, 255, 0.18)',
            background: selectedVideo === 'left'
              ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: selectedVideo === 'left'
              ? '0 0 20px rgba(76, 175, 80, 0.5), 0 8px 32px 0 rgba(0, 0, 0, 0.37)'
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
          onClick={() => handleVideoClick('left')}
          onMouseEnter={(e) => {
            if (selectedVideo !== 'left') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedVideo !== 'left') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
            }
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[579.556px] h-[326px] rounded-[21px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <video
              src={leftVideo}
              className="absolute inset-0 w-full h-full object-cover object-center rounded-[21px]"
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>

        {/* Right Video Container */}
        <div
          className="absolute left-1/2 top-[399px] -translate-x-1/2 ml-[366px] w-[609px] h-[344px] rounded-[20px] cursor-pointer transition-all duration-100"
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: selectedVideo === 'right' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: selectedVideo === 'right' ? '3px solid rgba(76, 175, 80, 1)' : '1px solid rgba(255, 255, 255, 0.18)',
            background: selectedVideo === 'right'
              ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: selectedVideo === 'right'
              ? '0 0 20px rgba(76, 175, 80, 0.5), 0 8px 32px 0 rgba(0, 0, 0, 0.37)'
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
          onClick={() => handleVideoClick('right')}
          onMouseEnter={(e) => {
            if (selectedVideo !== 'right') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedVideo !== 'right') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
            }
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[579.556px] h-[326px] rounded-[21px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <video
              src={rightVideo}
              className="absolute inset-0 w-full h-full object-cover object-center rounded-[21px]"
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>

        {/* NEXT Button */}
        <div
          className={`absolute left-1/2 top-[830px] -translate-x-1/2 w-[379px] h-[61px] rounded-[20px] transition-all duration-300 ${
            selectedVideo ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
          }`}
          style={{
            backdropFilter: 'blur(65.05px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: selectedVideo
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
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
          onClick={handleNext}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[289px] flex flex-col items-center">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }} className="text-[32px] text-white text-center leading-normal whitespace-pre-wrap">
              NEXT
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
      </div>
    </div>
    </ResponsiveContainer>
  );
};

export default VideoComparisonScreen;

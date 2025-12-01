import React, { useEffect, useState, useCallback } from 'react';

const ResponsiveContainer = ({ children, backgroundImage }) => {
  const designWidth = 1577;
  const designHeight = 1117;

  // Calculate scale to fit content
  const calculateScale = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / designWidth;
    const scaleY = windowHeight / designHeight;

    // Use the smaller scale and cap at 1 to prevent upscaling on large screens
    return Math.min(scaleX, scaleY, 1);
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
    <div className="relative w-screen h-screen overflow-hidden">
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveContainer;

import React, { useEffect, useState, useCallback } from 'react';

const MobilePhoneVerificationScreen = ({
  fullName,
  email,
  phoneNumber,
  error,
  isSubmitting,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
  backgroundImage,
  logoImage
}) => {
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
            {/* "Welcome" Heading - Inside Card */}
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
                className="text-[31px] text-white text-center leading-normal whitespace-pre-wrap"
              >
                Welcome
              </p>
            </div>

            {/* Instructions Text */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: '50%',
                top: '200px',
                transform: 'translateX(-50%)',
                width: '340px',
              }}
            >
              <p
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                className="text-[18px] text-white text-center leading-normal whitespace-pre-wrap"
              >
                Please enter your details to continue
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

          {/* Input Fields */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: '50%',
              top: '360px',
              transform: 'translateX(-50%)',
              width: '340px',
              gap: '15px',
            }}
          >
            {/* Full Name Input Field */}
            <input
              type="text"
              value={fullName}
              onChange={onFullNameChange}
              placeholder="Full Name"
              className="w-full px-6 rounded-[15px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
              style={{
                height: '48px',
                fontSize: '18px',
                backdropFilter: 'blur(45px)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
              }}
              disabled={isSubmitting}
            />

            {/* Email Input Field */}
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="Email Address"
              className="w-full px-6 rounded-[15px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
              style={{
                height: '48px',
                fontSize: '18px',
                backdropFilter: 'blur(45px)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
              }}
              disabled={isSubmitting}
            />

            {/* Phone Input Field */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={onPhoneChange}
              placeholder="+965 XXXX XXXX"
              className="w-full px-6 rounded-[15px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
              style={{
                height: '48px',
                fontSize: '18px',
                backdropFilter: 'blur(45px)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
              }}
              disabled={isSubmitting}
            />

            {/* Error Message */}
            {error && (
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '1.4',
                }}
                className="text-red-400 text-center w-full"
              >
                {error}
              </p>
            )}
          </div>

          {/* Continue Button - Positioned outside form to match other mobile pages */}
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting || !fullName.trim() || !email.trim() || !phoneNumber.trim()}
            className="absolute rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            onTouchStart={(e) => {
              if (!isSubmitting && fullName.trim() && email.trim() && phoneNumber.trim()) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && fullName.trim() && email.trim() && phoneNumber.trim()) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)';
            }}
          >
            <p
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              className="text-[20px] text-white text-center leading-normal"
            >
              {isSubmitting ? 'Verifying...' : 'Continue'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneVerificationScreen;

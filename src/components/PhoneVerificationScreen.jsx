import React, { useState, useEffect } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import MobilePhoneVerificationScreen from './MobilePhoneVerificationScreen';

const PhoneVerificationScreen = ({ onVerify }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local asset paths
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

  // Validate full name
  const validateFullName = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return { valid: false, message: 'Please enter your full name' };
    }

    if (trimmedName.length < 2) {
      return { valid: false, message: 'Please enter a valid full name' };
    }

    // Normalize the name (lowercase, remove extra spaces) for duplicate checking
    const normalizedName = trimmedName.toLowerCase().replace(/\s+/g, ' ');

    // Check if this name has been used before
    const usedNames = JSON.parse(localStorage.getItem('usedFullNames') || '[]');
    if (usedNames.includes(normalizedName)) {
      return { valid: false, message: 'This name has already been used. Each person can only play once.' };
    }

    return { valid: true, name: normalizedName };
  };

  // Validate email
  const validateEmail = (email) => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return { valid: false, message: 'Please enter your email address' };
    }

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }

    // Normalize email (lowercase) for duplicate checking
    const normalizedEmail = trimmedEmail.toLowerCase();

    // Check if this email has been used before
    const usedEmails = JSON.parse(localStorage.getItem('usedEmails') || '[]');
    if (usedEmails.includes(normalizedEmail)) {
      return { valid: false, message: 'This email has already been used. Each email can only play once.' };
    }

    return { valid: true, email: normalizedEmail };
  };

  // Validate Kuwaiti phone number
  const validatePhoneNumber = (phone) => {
    // Remove spaces and any non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');

    // Check if it matches Kuwait format
    // Should be either 8 digits or +965 followed by 8 digits
    const phoneRegex = /^(\+965)?([569]\d{7})$/;
    const match = cleaned.match(phoneRegex);

    if (!match) {
      return { valid: false, message: 'Please enter a valid Kuwaiti phone number (8 digits, starting with 5, 6, or 9)' };
    }

    // Extract the 8-digit number
    const number = match[2];

    // Check if this number has been used before
    const usedNumbers = JSON.parse(localStorage.getItem('usedPhoneNumbers') || '[]');
    if (usedNumbers.includes(number)) {
      return { valid: false, message: 'This phone number has already been used. Each number can only play once.' };
    }

    return { valid: true, number };
  };

  // Handle input changes
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate full name
    const nameValidation = validateFullName(fullName);
    if (!nameValidation.valid) {
      setError(nameValidation.message);
      setIsSubmitting(false);
      return;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
      setIsSubmitting(false);
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.valid) {
      setError(phoneValidation.message);
      setIsSubmitting(false);
      return;
    }

    // Store all data in localStorage
    const usedNames = JSON.parse(localStorage.getItem('usedFullNames') || '[]');
    usedNames.push(nameValidation.name);
    localStorage.setItem('usedFullNames', JSON.stringify(usedNames));

    const usedEmails = JSON.parse(localStorage.getItem('usedEmails') || '[]');
    usedEmails.push(emailValidation.email);
    localStorage.setItem('usedEmails', JSON.stringify(usedEmails));

    const usedNumbers = JSON.parse(localStorage.getItem('usedPhoneNumbers') || '[]');
    usedNumbers.push(phoneValidation.number);
    localStorage.setItem('usedPhoneNumbers', JSON.stringify(usedNumbers));

    // Call the onVerify callback with all data
    setIsSubmitting(false);
    onVerify({
      fullName: nameValidation.name,
      email: emailValidation.email,
      phoneNumber: phoneValidation.number
    });
  };

  // Render mobile version for small screens
  if (isMobile) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <MobilePhoneVerificationScreen
          fullName={fullName}
          email={email}
          phoneNumber={phoneNumber}
          error={error}
          isSubmitting={isSubmitting}
          onFullNameChange={handleFullNameChange}
          onEmailChange={handleEmailChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleSubmit}
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
            {/* Welcome Heading */}
            <div className="absolute left-1/2 top-[96px] -translate-x-1/2 w-[1090px] flex flex-col items-center gap-[49px]">
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} className="text-[55px] text-white text-center leading-normal w-[800px] whitespace-pre-wrap">
                Welcome
              </p>
            </div>

            {/* Instructions Text */}
            <p
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
              className="absolute left-1/2 top-[200px] -translate-x-1/2 w-[1000px] text-[28px] text-white text-center leading-normal"
            >
              Please enter your details to continue
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="absolute left-1/2 top-[290px] -translate-x-1/2 w-[600px] flex flex-col items-center gap-5">
              {/* Full Name Input Field */}
              <div className="w-full">
                <input
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Full Name"
                  className="w-full h-[60px] px-8 rounded-[15px] text-[24px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
                  style={{
                    backdropFilter: 'blur(45px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                  }}
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Input Field */}
              <div className="w-full">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email Address"
                  className="w-full h-[60px] px-8 rounded-[15px] text-[24px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
                  style={{
                    backdropFilter: 'blur(45px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                  }}
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone Input Field */}
              <div className="w-full">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="+965 XXXX XXXX"
                  className="w-full h-[60px] px-8 rounded-[15px] text-[24px] text-white text-center bg-transparent transition-all duration-300 focus:outline-none"
                  style={{
                    backdropFilter: 'blur(45px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                  }}
                  disabled={isSubmitting}
                />
              </div>

              {/* Error Message */}
              {error && (
                <p
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
                  className="text-[18px] text-red-400 text-center leading-normal w-full"
                >
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !fullName.trim() || !email.trim() || !phoneNumber.trim()}
                className="w-[379px] h-[61px] rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
                style={{
                  backdropFilter: 'blur(65.05px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }} className="text-[32px] text-white text-center leading-normal">
                  {isSubmitting ? 'Verifying...' : 'Continue'}
                </p>
              </button>
            </form>
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

export default PhoneVerificationScreen;

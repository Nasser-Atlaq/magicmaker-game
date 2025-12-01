import React from 'react';

/**
 * OptimizedImage component that uses modern image formats (WebP) with fallbacks
 *
 * Usage:
 * <OptimizedImage
 *   src="/images/background.jpg"
 *   alt="Background"
 *   className="w-full h-full object-cover"
 * />
 *
 * This will automatically try to load .webp version first, fallback to original
 */
const OptimizedImage = ({ src, alt = '', className = '', style = {} }) => {
  // Convert image path to WebP version
  const getWebPPath = (path) => {
    const lastDot = path.lastIndexOf('.');
    if (lastDot === -1) return path;
    return path.substring(0, lastDot) + '.webp';
  };

  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {/* Modern browsers: Use WebP */}
      <source srcSet={webpSrc} type="image/webp" />

      {/* Fallback: Original format */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="lazy"
      />
    </picture>
  );
};

export default OptimizedImage;

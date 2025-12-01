import React, { useState } from 'react';

const VideoPlayer = ({ src, className, ...props }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    console.error(`Failed to load video: ${src}`);
    setError(true);
    setLoading(false);
  };

  const handleLoadedData = () => {
    setLoading(false);
  };

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-900`}>
        <p className="text-white text-sm">Failed to load video</p>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className={`${className} flex items-center justify-center bg-gray-900`}>
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        src={src}
        className={className}
        onError={handleError}
        onLoadedData={handleLoadedData}
        style={{ display: loading ? 'none' : 'block' }}
        {...props}
      />
    </>
  );
};

export default VideoPlayer;

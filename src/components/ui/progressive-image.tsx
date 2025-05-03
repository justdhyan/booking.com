
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  width?: number | string;
  height?: number | string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc,
  width,
  height
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);
  
  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setCurrentSrc(placeholderSrc || src);
    
    // Preload the image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src, placeholderSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "transition-all duration-500 ease-in-out",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className
      )}
    />
  );
};

export default ProgressiveImage;

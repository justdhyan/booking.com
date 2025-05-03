
import { useEffect, useRef, useState } from 'react';

// Custom hook to animate elements when they enter viewport
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once element has been animated, no need to observe it anymore
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        // Element is considered visible when 10% of it enters the viewport
        threshold: 0.1,
      }
    );

    // Start observing the target element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

// Advanced hook for staggered children animations
export function useStaggerAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px', // Trigger animation slightly before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}


import React from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = false
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`${className} ${isVisible ? 'fade-in visible' : 'fade-in'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const AnimatedStaggerContainer: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const { ref, isVisible } = useStaggerAnimation();
  
  return (
    <div 
      ref={ref}
      className={`${className} ${isVisible ? 'stagger-children visible' : 'stagger-children'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

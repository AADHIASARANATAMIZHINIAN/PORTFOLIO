import React, { useRef, useState, useEffect } from 'react';
import AnimatedName from './AnimatedName';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '', icon }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="mb-12 text-center group">
        <div className="flex justify-center items-center gap-4">
          {icon && (
            <div className="w-10 h-10 text-white/80 transition-opacity duration-700" style={{ opacity: isVisible ? 1 : 0 }}>
              {icon}
            </div>
          )}
          <AnimatedName as="h2" text={title} className="text-3xl md:text-4xl font-bold text-white tracking-wider uppercase" />
        </div>
        <div 
          className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 mx-auto rounded-full transition-opacity duration-700 delay-300" 
          style={{ opacity: isVisible ? 1 : 0 }}
        ></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
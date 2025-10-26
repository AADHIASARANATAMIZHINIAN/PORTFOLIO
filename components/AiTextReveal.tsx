import React, { useState, useEffect, useRef } from 'react';

interface AiTextRevealProps {
  text: string;
  as?: React.ElementType;
  [key: string]: any;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\",./<>?";

const AiTextReveal: React.FC<AiTextRevealProps> = ({ text, as: Tag = 'div', ...props }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [revealedText, setRevealedText] = useState<React.ReactNode>('');
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let animationFrameId: number;
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setRevealedText(text);
        return;
      }
      
      const partRevealed = text.substring(0, currentIndex + 1);
      const partRandom = Array.from({ length: text.length - currentIndex -1 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      
      // A more subtle effect
      const displayedText = (
        <>
          {text.substring(0, currentIndex)}
          <span className="text-white/50">{chars[Math.floor(Math.random() * chars.length)]}</span>
        </>
      );
      setRevealedText(displayedText);
      
      currentIndex++;
      animationFrameId = requestAnimationFrame(animate);
    };

    const finalAnimationStep = () => {
        let finalIndex = 0;
        const interval = setInterval(() => {
            if (finalIndex >= text.length) {
                clearInterval(interval);
                return;
            }
            const revealedPart = text.substring(0, finalIndex + 1);
            setRevealedText(revealedPart);
            finalIndex++;
        }, 20);
    }

    let revealIndex = 0;
    const interval = setInterval(() => {
        if (revealIndex >= text.length) {
            clearInterval(interval);
            return;
        }

        const revealedPart = text.substring(0, revealIndex + 1);
        const remainingPartLength = text.length - (revealIndex + 1);
        const randomChars = Array.from({ length: Math.min(3, remainingPartLength) }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

        setRevealedText(
          <>
            <span>{revealedPart}</span>
            <span className="opacity-50">{randomChars}</span>
          </>
        );

        revealIndex++;
    }, 30);


    return () => {
        clearInterval(interval);
    };
  }, [isIntersecting, text]);

  // Set the initial text to be invisible but take up space
  const initialStyle = {
      ...props.style,
      color: isIntersecting ? undefined : 'transparent'
  }

  return (
    <Tag ref={containerRef as any} {...props} style={initialStyle}>
      {isIntersecting ? revealedText : text}
    </Tag>
  );
};

export default AiTextReveal;

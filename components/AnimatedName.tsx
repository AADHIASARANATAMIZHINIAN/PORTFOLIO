import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  as?: React.ElementType;
  [key: string]: any;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

const AnimatedName: React.FC<AnimatedTextProps> = ({ text: initialText, as: Tag = 'div', ...props }) => {
  const [displayText, setDisplayText] = useState(initialText);
  const elementRef = useRef<HTMLElement>(null);
  const frameRequest = useRef<number>(0);
  const frame = useRef<number>(0);
  const queue = useRef<any[]>([]);

  useEffect(() => {
    const originalText = initialText;
    let isMounted = true;
    
    const scramble = () => {
        const newQueue = [...originalText].map((char, i) => {
            const from = originalText[i];
            const to = char;
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            return { from, to, start, end, char };
        });

        queue.current = newQueue;
        cancelAnimationFrame(frameRequest.current);
        frame.current = 0;
        
        const update = () => {
            let output = '';
            let complete = 0;
            for (let i = 0, n = queue.current.length; i < n; i++) {
                let { from, to, start, end, char } = queue.current[i];
                if (frame.current >= end) {
                    complete++;
                    output += to;
                } else if (frame.current >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = chars[Math.floor(Math.random() * chars.length)];
                        queue.current[i].char = char;
                    }
                    output += `<span class="text-gray-500">${char}</span>`;
                } else {
                    output += from;
                }
            }

            if(isMounted && elementRef.current) {
                elementRef.current.innerHTML = output;
            }

            if (complete === queue.current.length) {
                setTimeout(scramble, 3000 + Math.random() * 2000);
            } else {
                frameRequest.current = requestAnimationFrame(update);
                frame.current++;
            }
        };
        
        setTimeout(() => {
          if (isMounted) {
            frameRequest.current = requestAnimationFrame(update);
          }
        }, 1000);
    };

    scramble();

    return () => {
      isMounted = false;
      cancelAnimationFrame(frameRequest.current);
    };
  }, [initialText]);

  return (
    <Tag ref={elementRef as any} {...props}>
      {displayText}
    </Tag>
  );
};

export default AnimatedName;
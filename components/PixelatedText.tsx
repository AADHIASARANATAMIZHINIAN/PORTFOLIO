import React from 'react';

interface PixelatedTextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

const PixelatedText: React.FC<PixelatedTextProps> = ({ children, as: Tag = 'span', className = '' }) => {
  const text = typeof children === 'string' ? children : '';

  const styles: React.CSSProperties = {
    '--text': `"${text}"`,
  } as React.CSSProperties;

  const combinedClassName = `
    relative inline-block
    group
    hover:[&>span]:text-transparent
    ${className}
  `;

  const pseudoBase = `
    content-[var(--text)]
    absolute
    left-0
    top-0
    w-full
    h-full
    pointer-events-none
    opacity-0
    group-hover:opacity-100
  `;

  return (
    <Tag className={combinedClassName} data-text={text}>
      <span className="transition-colors duration-300">{children}</span>
      <span className={`${pseudoBase} text-white animate-[pixel-glitch-1_0.3s_infinite_steps(1)]`}></span>
      <span className={`${pseudoBase} text-white animate-[pixel-glitch-2_0.3s_infinite_steps(1)]`}></span>
    </Tag>
  );
};

export default PixelatedText;

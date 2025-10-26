import type React from 'react';

export interface Skill {
  name: string;
  // Fix: Changed icon type to React.ReactElement<React.SVGProps<SVGSVGElement>> to be more specific, allowing props to be passed via cloneElement.
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  // Fix: Changed icon type to React.ReactElement<React.SVGProps<SVGSVGElement>> to be more specific, allowing props to be passed via cloneElement.
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

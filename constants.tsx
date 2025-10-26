import React from 'react';
import type { Project, Experience, Skill, SocialLink } from './types';
import { 
    AnimatedReactIcon, 
    AnimatedTypescriptIcon, 
    AnimatedJavaScriptIcon, 
    AnimatedNextJsIcon, 
    AnimatedTailwindIcon, 
    AnimatedNodeJsIcon, 
    AnimatedGraphQLIcon, 
    AnimatedUiUxIcon, 
    AnimatedFigmaIcon, 
    AnimatedGithubIcon,
    AnimatedDockerIcon,
    AnimatedKubernetesIcon,
    AnimatedPythonIcon,
    AnimatedAWSIcon
} from './components/AnimatedIcons';

// Fix: Updated all icon components to accept standard SVG props. This allows them to be styled dynamically (e.g., changing size via className) and resolves an error in Contact.tsx where React.cloneElement was passing a prop to components that didn't accept any.
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
);
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
);
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" {...props}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);


export const PROFILE = {
  name: "AADHIASARANA T",
  title: [
    "Creative UI/UX Designer",
    "Full-Stack Developer",
    "AI Developer",
    "Data Analyst",
    "Web Performance Specialist",
    "Creative Technologist",
    "Cloud Solutions Architect",
    "DevOps Specialist",
    "Blockchain Developer",
    "Machine Learning Enthusiast",
    "AR/VR Developer"
  ],
  bio: "I build exceptional and accessible digital experiences for the web. I specialize in React, TypeScript, and modern web technologies to create beautiful, functional, and user-centered applications.",
  avatar: "https://i.ibb.co/6n211pZ/profile-pic.jpg"
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: <GithubIcon /> },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <LinkedInIcon /> },
  { name: 'Facebook', url: 'https://facebook.com', icon: <FacebookIcon /> },
  { name: 'Instagram', url: 'https://instagram.com', icon: <InstagramIcon /> },
  { name: 'X/Twitter', url: 'https://twitter.com', icon: <XIcon /> },
];

export const SKILLS: Skill[] = [
  { name: 'React', icon: <AnimatedReactIcon /> },
  { name: 'TypeScript', icon: <AnimatedTypescriptIcon /> },
  { name: 'JavaScript (ES6+)', icon: <AnimatedJavaScriptIcon /> },
  { name: 'Next.js', icon: <AnimatedNextJsIcon /> },
  { name: 'Tailwind CSS', icon: <AnimatedTailwindIcon /> },
  { name: 'Node.js', icon: <AnimatedNodeJsIcon /> },
  { name: 'GraphQL', icon: <AnimatedGraphQLIcon /> },
  { name: 'Docker', icon: <AnimatedDockerIcon /> },
  { name: 'Kubernetes', icon: <AnimatedKubernetesIcon /> },
  { name: 'Python', icon: <AnimatedPythonIcon /> },
  { name: 'AWS', icon: <AnimatedAWSIcon /> },
  { name: 'UI/UX Design', icon: <AnimatedUiUxIcon /> },
  { name: 'Figma', icon: <AnimatedFigmaIcon /> },
  { name: 'Git & GitHub', icon: <AnimatedGithubIcon /> },
];

export const PROJECTS: Project[] = [
  {
    title: "Project Alpha",
    description: "A comprehensive project management tool designed to streamline team collaboration. Features include real-time updates, task boards, and detailed analytics.",
    image: "https://picsum.photos/seed/project-alpha/600/400",
    tags: ["React", "TypeScript", "Node.js", "GraphQL"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Eco-Market",
    description: "An e-commerce platform for sustainable and eco-friendly products. Focused on providing a seamless shopping experience with a minimal carbon footprint.",
    image: "https://picsum.photos/seed/eco-market/600/400",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "DataViz Dashboard",
    description: "A powerful data visualization dashboard that transforms complex datasets into interactive charts and graphs using D3.js and Recharts.",
    image: "https://picsum.photos/seed/dataviz/600/400",
    tags: ["React", "D3.js", "Recharts"],
    liveUrl: "#",
    codeUrl: "#",
  },
    {
    title: "AI Content Generator",
    description: "A web application that leverages the Gemini API to generate creative content, from blog posts to social media captions, based on user prompts.",
    image: "https://picsum.photos/seed/ai-content/600/400",
    tags: ["React", "Gemini API", "Tailwind CSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Innovate Inc.",
    role: "Senior Frontend Engineer",
    duration: "2020 - Present",
    description: [
      "Led the development of a new design system in React and Storybook, increasing development velocity by 30%.",
      "Architected and implemented a large-scale single-page application using Next.js, resulting in a 50% improvement in load times.",
      "Mentored junior engineers, conducted code reviews, and championed best practices for code quality and testing.",
    ],
  },
  {
    company: "Solutions Corp.",
    role: "Frontend Developer",
    duration: "2018 - 2020",
    description: [
      "Developed and maintained user-facing features for a high-traffic e-commerce website using React and Redux.",
      "Collaborated with UI/UX designers to translate wireframes and mockups into responsive, interactive web pages.",
      "Improved website performance and accessibility, a chieving a 95+ Lighthouse score.",
    ],
  },
  {
    company: "Digital Agency",
    role: "Junior Web Developer",
    duration: "2016 - 2018",
    description: [
      "Built and styled websites for various clients using HTML, CSS, and JavaScript.",
      "Gained foundational experience in web development principles and working in an agile environment.",
    ],
  },
];

export const ICONS = {
    ExternalLink: ExternalLinkIcon,
    Code: CodeIcon
}
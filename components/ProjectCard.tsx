import React from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';
import AiTextReveal from './AiTextReveal';
import PixelatedText from './PixelatedText';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, tags, liveUrl, codeUrl } = project;

  return (
    <div className="group relative flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2 hover:border-white/20" style={{ perspective: '1000px' }}>
      <div className="overflow-hidden">
        <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 animate-[gentle-spin_10s_ease-in-out_infinite_alternate]" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">{title}</h3>
        <AiTextReveal as="p" text={description} className="text-gray-300 flex-grow mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-white/10 text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto flex justify-end gap-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors group/link">
              <ICONS.ExternalLink />
              <PixelatedText>Live</PixelatedText>
            </a>
          )}
          {codeUrl && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors group/link">
              <ICONS.Code />
              <PixelatedText>Code</PixelatedText>
            </a>
          )}
      </div>
    </div>
  );
};

export default ProjectCard;
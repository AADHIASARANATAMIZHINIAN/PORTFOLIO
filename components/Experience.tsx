import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';
import type { Experience as ExperienceType } from '../types';
import AiTextReveal from './AiTextReveal';
import { AiIconExperience } from './AiIcons';

const ExperienceItem: React.FC<{ item: ExperienceType }> = ({ item }) => (
    <div className="relative pl-8 sm:pl-12 pb-12 group">
        {/* Vertical line */}
        <div className="absolute left-2 sm:left-4 top-1 w-px h-full bg-white/10"></div>
        {/* Dot */}
        <div className="absolute left-0 sm:left-2 top-1 w-4 h-4 rounded-full bg-gray-800 border-2 border-black group-hover:bg-white group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-white/50 transition-all duration-300"></div>
        <div className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <div className="flex flex-col sm:flex-row sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-white">{item.role}</h3>
                <span className="hidden sm:inline mx-2 text-gray-600">·</span>
                <p className="text-md font-medium text-white/80">{item.company}</p>
            </div>
            <p className="text-sm text-gray-400 mb-4">{item.duration}</p>
            <ul className="space-y-2 list-disc list-inside text-gray-300">
                {item.description.map((desc, index) => (
                    <AiTextReveal as="li" key={index} text={desc} />
                ))}
            </ul>
        </div>
    </div>
);


const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Work Experience" icon={<AiIconExperience />}>
        <div className="relative">
            {EXPERIENCE.map((exp, index) => (
                <ExperienceItem key={index} item={exp} />
            ))}
        </div>
    </Section>
  );
};

export default Experience;
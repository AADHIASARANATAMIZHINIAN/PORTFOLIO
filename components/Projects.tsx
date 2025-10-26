import React from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';
import { AiIconWorks } from './AiIcons';

const Works: React.FC = () => {
  return (
    <Section id="works" title="Works" icon={<AiIconWorks />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Works;
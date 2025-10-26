import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';
import type { Skill } from '../types';
import { AiIconSkills } from './AiIcons';

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5">
    {React.cloneElement(skill.icon, { className: 'h-8 w-8 text-white/80' })}
    <span className="font-medium text-gray-300">{skill.name}</span>
  </div>
);

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Skills & Technologies" icon={<AiIconSkills />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </Section>
  );
};

export default Skills;
import React from 'react';
import Section from './Section';
import { PROFILE } from '../constants';
import AiTextReveal from './AiTextReveal';
import { AiIconAbout } from './AiIcons';
import JapaneseWords from './JapaneseWords';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me" icon={<AiIconAbout />}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="lg:w-2/3 space-y-4 text-gray-300 text-lg">
           <AiTextReveal 
            as="p"
            text={`Hello! I'm ${PROFILE.name}, a frontend developer with a passion for creating intuitive, dynamic, and beautiful user interfaces. My journey into web development started years ago, and since then, I've been dedicated to honing my craft and staying up-to-date with the latest industry trends.`}
          />
          <AiTextReveal
            as="p"
            text="I thrive on turning complex problems into simple, elegant solutions. Whether it's architecting a scalable React application, optimizing for performance, or ensuring a seamless user experience across all devices, I am committed to delivering high-quality code and exceptional results."
          />
          <AiTextReveal
            as="p"
            text="When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning Japanese."
          />
          <JapaneseWords />
        </div>
        <div className="lg:w-1/3 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative group p-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              loading="lazy"
              decoding="async"
              className="relative w-64 h-64 rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
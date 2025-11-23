const experiences = [
  {
    company: 'AI & Data Science Program',
    role: 'Undergraduate Student',
    duration: '2024 - Present',
    description: [
      'Pursuing Bachelor\'s degree in Artificial Intelligence & Data Science with focus on ML algorithms and data analytics.',
      'Building full-stack applications using MERN stack, React, Node.js, and modern web technologies.',
      'Exploring AI/ML applications, computer vision, and natural language processing through hands-on projects.',
      'Active contributor to open-source projects and maintaining a strong GitHub presence.',
    ],
  },
  {
    company: 'Self-Learning & Projects',
    role: 'Independent Developer',
    duration: '2023 - Present',
    description: [
      'Developed MERN LINKOVA: A full-featured LinkedIn clone with authentication, posts, and real-time updates.',
      'Created data visualization dashboards using Python, Streamlit, and modern charting libraries.',
      'Built personal portfolio with React, TypeScript, Three.js, showcasing smooth animations and 3D effects.',
      'Currently learning: Python, C, JavaScript, React, Node.js, Flask, Django, and Japanese (日本語).',
    ],
  },
  {
    company: 'Technical Skills Development',
    role: 'Continuous Learner',
    duration: '2023 - Present',
    description: [
      'Frontend: React, Next.js, JavaScript, TypeScript, TailwindCSS, Bootstrap',
      'Backend: Node.js, Flask, Django, Express.js',
      'Languages: Python, C, JavaScript (and a bit of Japanese! 🇯🇵)',
      'Tools & Tech: Git, GitHub, VS Code, Figma, AI/ML basics',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="animate-on-scroll mb-16">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [04] Journey
          </span>
        </div>

        {/* Section Title */}
        <div className="animate-on-scroll mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight max-w-4xl">
            My learning journey and{' '}
            <span className="text-gray-500">continuous growth</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`animate-on-scroll relative ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-12'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-0 w-4 h-4 bg-white rounded-full border-4 border-dark-900 ${
                    index % 2 === 0
                      ? 'left-0 md:left-auto md:right-0 md:-mr-2'
                      : 'left-0 md:-ml-2'
                  }`}
                ></div>

                {/* Content Card */}
                <div className="ml-8 md:ml-0 bg-dark-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-dark-900/30">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">
                        {exp.duration}
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                      <div className="text-lg text-gray-400">{exp.company}</div>
                    </div>

                    <ul className="space-y-3">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-on-scroll">
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            <span>Download Resume</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

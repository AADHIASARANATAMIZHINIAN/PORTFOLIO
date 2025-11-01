import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython,
  SiTensorflow,
  SiGraphql,
  SiTailwindcss,
  SiDocker,
  SiAmazon,
  SiGit
} from 'react-icons/si'

const skills = [
  { name: 'React', level: 95, icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', level: 90, icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', level: 95, icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Next.js', level: 85, icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', level: 80, icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', level: 85, icon: SiPython, color: '#3776AB' },
  { name: 'AI/ML', level: 75, icon: SiTensorflow, color: '#FF6F00' },
  { name: 'GraphQL', level: 80, icon: SiGraphql, color: '#E10098' },
  { name: 'Tailwind CSS', level: 95, icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Docker', level: 75, icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', level: 70, icon: SiAmazon, color: '#FF9900' },
  { name: 'Git', level: 90, icon: SiGit, color: '#F05032' },
]

interface SkillCardProps {
  skill: typeof skills[0]
  index: number
}

function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = skill.icon

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ backgroundColor: skill.color }}
      />
      
      <div className="relative bg-dark-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 hover:transform hover:-translate-y-2">
        {/* Icon container with 3D effect */}
        <div className="relative mb-6">
          <div 
            className="w-20 h-20 mx-auto rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
            style={{
              background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
              boxShadow: `0 0 30px ${skill.color}20`,
            }}
          >
            {/* Animated background gradient */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${skill.color}30, transparent)`,
              }}
            />
            
            <Icon 
              className="relative z-10 w-10 h-10 group-hover:rotate-12 transition-transform duration-500" 
              style={{ color: skill.color }}
            />
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                style={{
                  backgroundColor: skill.color,
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 35}%`,
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Skill name */}
        <h3 className="text-lg font-semibold mb-3 text-center group-hover:text-white transition-colors">
          {skill.name}
        </h3>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Proficiency</span>
            <span className="font-semibold" style={{ color: skill.color }}>
              {skill.level}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${skill.level}%`,
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                boxShadow: `0 0 10px ${skill.color}50`,
              }}
            />
          </div>
        </div>

        {/* Skill level indicator */}
        <div className="mt-4 text-center">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Proficient' : 'Intermediate'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SkillsWithLogos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {skills.map((skill, index) => (
        <SkillCard key={skill.name} skill={skill} index={index} />
      ))}
    </div>
  )
}

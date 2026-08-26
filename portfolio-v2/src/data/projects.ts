export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  domain: string
  domainColor: string
  liveUrl: string
  githubUrl: string
  year: string
  featured?: boolean
  image?: string
  caseStudy?: {
    problem: string
    solution: string
    impact: string
    learnings: string
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'ZYCARE',
    description: 'Full-stack healthcare management system with role-based access control for admins, doctors, and patients. Built to replace fragmented clinic workflows with a single, real-time platform.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    domain: 'Healthcare',
    domainColor: 'rgba(59,130,246,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/ZYCARE',
    year: '2025',
    featured: true,
    image: '/projects/zycare.svg',
    caseStudy: {
      problem: 'Clinics relied on fragmented manual workflows for patient, doctor and admin operations — leading to scheduling conflicts and lost records.',
      solution: 'Built a unified MERN platform with role-based dashboards, real-time appointment scheduling, and secure medical record management.',
      impact: 'Single source of truth for clinic operations; 3 distinct user roles with isolated access controls.',
      learnings: 'JWT auth patterns, RBAC design, and real-time data sync at scale.',
    },
  },
  {
    id: 2,
    title: 'FARMER-SCHEMES',
    description: 'Agricultural access platform aggregating government subsidy schemes for small-scale farmers. Filters by eligibility, integrates Firebase for real-time data, and links directly to application portals.',
    tags: ['JavaScript', 'Node.js', 'Firebase', 'REST APIs'],
    domain: 'AgriTech',
    domainColor: 'rgba(34,197,94,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/FARMER-SCHEMES',
    year: '2025',
    image: '/projects/farmer-schemes.svg',
    caseStudy: {
      problem: 'Small-scale farmers struggle to discover and apply for relevant government subsidy schemes.',
      solution: 'Aggregated schemes with eligibility filtering and direct application portal links, powered by Firebase real-time data.',
      impact: 'Reduced discovery time; eligibility-aware filtering drives higher application success.',
      learnings: 'Firebase real-time DB, eligibility rule engine, government API integration.',
    },
  },
  {
    id: 3,
    title: 'MERN LINKOVA',
    description: 'Production-grade LinkedIn clone on the MERN stack. JWT auth with refresh tokens, real-time notifications via Socket.io, and a full social feed with media uploads.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    domain: 'Social Platform',
    domainColor: 'rgba(168,85,247,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA',
    year: '2025',
    image: '/projects/linkova.svg',
    caseStudy: {
      problem: 'Needed a production-grade social feed with real-time interactions, media uploads and secure auth.',
      solution: 'MERN + Socket.io architecture with JWT refresh tokens, notification pipeline and media handling.',
      impact: 'Feature-complete social platform demonstrating full-stack system design.',
      learnings: 'WebSocket scaling, refresh-token security, feed pagination.',
    },
  },
  {
    id: 4,
    title: 'Predictive Analysis System',
    description: 'Machine learning pipeline for multi-class predictive analysis. Logistic regression model trained on real datasets with scikit-learn — includes preprocessing, evaluation metrics, and result visualisation.',
    tags: ['Python', 'scikit-learn', 'pandas', 'Matplotlib'],
    domain: 'AI / ML',
    domainColor: 'rgba(123,97,255,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN',
    year: '2025',
    image: '/projects/predictive.svg',
    caseStudy: {
      problem: 'Needed a reusable ML pipeline for multi-class prediction on real-world datasets.',
      solution: 'Built an end-to-end pipeline: preprocessing, logistic regression training, evaluation metrics and Matplotlib visualisations.',
      impact: 'Reusable template for future classification tasks; evaluation-driven iteration.',
      learnings: 'scikit-learn pipelines, feature engineering, model evaluation.',
    },
  },
  {
    id: 5,
    title: 'Digital Queue Management',
    description: 'Citizen services queue system for government offices. Digital tokens, real-time tracking, and an admin dashboard for multi-counter management.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    domain: 'Civic Tech',
    domainColor: 'rgba(234,179,8,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/Digital-Queue-Management',
    year: '2025',
    image: '/projects/queue.svg',
  },
  {
    id: 6,
    title: 'SECURE VOTING SYSTEM',
    description: 'Cryptographic voting infrastructure in Java. RSA/AES encrypted ballots, voter privacy, and an immutable audit trail for post-election verification.',
    tags: ['Java', 'Cryptography', 'RSA/AES'],
    domain: 'Security',
    domainColor: 'rgba(239,68,68,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/SECURE-VOTING-SYSTEM',
    year: '2025',
    image: '/projects/voting.svg',
  },
  {
    id: 7,
    title: 'GYM MANAGEMENT',
    description: 'Operations platform for fitness centers. Member lifecycle tracking, class scheduling, payment records with overdue alerts, and a retention analytics dashboard.',
    tags: ['JavaScript', 'Node.js', 'MongoDB'],
    domain: 'Operations',
    domainColor: 'rgba(249,115,22,',
    liveUrl: '',
    githubUrl: 'https://github.com/AADHIASARANATAMIZHINIAN/GYM-MANAGEMENT',
    year: '2025',
    image: '/projects/gym.svg',
  },
]

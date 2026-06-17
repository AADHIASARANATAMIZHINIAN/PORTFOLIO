// src/utils/offlineChat.ts — Offline NLP chat engine

const STOPWORDS = new Set([
  'a','an','the','is','it','in','on','at','to','for','of','and','or','but',
  'with','by','from','up','about','into','your','you','me','my','i','we',
  'he','she','they','what','who','how','when','where','which','that','this',
  'do','does','did','can','could','would','should','will','have','has','had',
  'be','been','are','was','were','am','not','no','any','some','there','their',
  'so','if','as','also','just','like','tell','know','get','give','see','use',
  'hey','hi','hello','please','thanks','thank','yes','yeah','okay','ok','its',
])

interface Entry { tags: string[]; answer: string }

// ── Module-level visitor name ────────────────────────────────────────────────
let visitorName: string | null = null

const FALSE_POSITIVES = new Set([
  'a','an','the','not','going','looking','interested','here','working',
  'trying','just','doing','learning','building','developer','student',
])

export function getVisitorName() { return visitorName }

export function extractAndStoreName(text: string): string | null {
  const patterns = [
    /(?:i(?:'m| am)\s+)([A-Za-z][a-z]+(?:\s+[A-Za-z][a-z]+)?)/i,
    /(?:my name(?:'s| is)\s+)([A-Za-z][a-z]+(?:\s+[A-Za-z][a-z]+)?)/i,
    /(?:call me\s+)([A-Za-z][a-z]+(?:\s+[A-Za-z][a-z]+)?)/i,
    /(?:this is\s+)([A-Za-z][a-z]+(?:\s+[A-Za-z][a-z]+)?)/i,
    /(?:name's\s+)([A-Za-z][a-z]+(?:\s+[A-Za-z][a-z]+)?)/i,
  ]
  for (const re of patterns) {
    const m = text.match(re)
    if (m && m[1]) {
      const name = m[1].trim()
      if (!FALSE_POSITIVES.has(name.toLowerCase()) && name.length > 1 && !/\d/.test(name)) {
        visitorName = name.charAt(0).toUpperCase() + name.slice(1)
        return visitorName
      }
    }
  }
  return null
}

function greet(msg: string) {
  return visitorName ? `${msg.replace('!', ',')} ${visitorName}!` : msg
}

// ── Knowledge Base ────────────────────────────────────────────────────────────
const KB: Entry[] = [
  // WHO
  {
    tags: ['who','aadhiasarana','about','person','yourself','introduce','introduction','name','bio'],
    answer: "I'm Aadhiasarana T — an AI & Data Science undergraduate at M. Kumarasamy College of Engineering (graduating 2028) and a full-stack developer from Tamil Nadu, India. I build intelligent systems, modern web apps, and AI-powered products. Currently open to internships and freelance collaborations.",
  },
  {
    tags: ['personality','interests','hobbies','outside','life','japanese','linux','learning','curiosity'],
    answer: "Outside of coding, Aadhiasarana is learning Japanese (passed JLPT N5 with an A Grade). He runs Arch Linux, enjoys automation, and is deeply curious about new technologies. He sees language learning and programming as parallel pursuits — both are about mastering systems.",
  },

  // SKILLS
  {
    tags: ['skills','stack','technologies','tech','languages','tools','know','use','expertise','toolkit'],
    answer: "Full tech stack:\n\n🖥 Languages: Python, TypeScript, JavaScript, Java, C\n⚛️ Frontend: React, Tailwind CSS, Framer Motion, Vite, HTML/CSS\n🔧 Backend: Node.js, Express, Flask, Django, REST APIs, MongoDB, Firebase\n🤖 AI & Data: scikit-learn, pandas, NumPy, Matplotlib, Jupyter\n🛠 Tools: Git, Arch Linux, Docker, Vercel, GitHub Actions",
  },
  {
    tags: ['python','backend','flask','django','node','express','server','api','rest'],
    answer: "For backend work, Aadhiasarana uses Python (Flask, Django) and Node.js with Express. He designs REST APIs, integrates ML models into production services, and has used Firebase for real-time databases.",
  },
  {
    tags: ['react','typescript','frontend','ui','vite','tailwind','framer','css','component'],
    answer: "Aadhiasarana builds frontends with React + TypeScript, styled with Tailwind CSS and animated with Framer Motion. He uses Vite as his dev toolchain and Lenis for smooth scroll physics — this portfolio is proof of that.",
  },
  {
    tags: ['ai','machine learning','ml','scikit','pandas','numpy','data','jupyter','model','deep'],
    answer: "For AI & ML, Aadhiasarana uses scikit-learn for classification/regression, pandas + NumPy for data processing, Matplotlib for visualization, and Jupyter for experimentation. He's built multi-class predictive analysis pipelines.",
  },
  {
    tags: ['docker','devops','github','actions','vercel','ci','cd','deployment','tools','git','linux','arch'],
    answer: "On DevOps: Git, GitHub Actions for CI/CD, Vercel for deployments, Docker, and Arch Linux as his daily OS. Experienced in setting up automated deployment pipelines.",
  },
  {
    tags: ['learning','currently','studying','now','next','future','improving','sql','pipeline','nextjs'],
    answer: "Currently deepening: Systems programming in C, ML model deployment, SQL & data pipelines, and Next.js App Router. Also has two active projects in progress — an ML pipeline and the ZYROVER healthcare rover.",
  },
  {
    tags: ['nextjs','next','app','router','ssr','server','side','rendering'],
    answer: "Aadhiasarana is actively learning Next.js App Router — it's on his current learning list. He already knows React deeply, so Next.js is a natural progression.",
  },
  {
    tags: ['mobile','app','android','ios','react native','flutter','swift','kotlin'],
    answer: "Currently Aadhiasarana focuses on web development. Mobile app development (React Native / Flutter) isn't in his current stack, but his React skills transfer well to React Native if needed.",
  },
  {
    tags: ['sql','database','mysql','postgresql','postgres','relational','db','query'],
    answer: "Aadhiasarana primarily uses MongoDB and Firebase (NoSQL), and is currently learning SQL and relational data pipelines. He's comfortable with database design and CRUD operations.",
  },

  // PROJECTS
  {
    tags: ['project','projects','built','made','work','all','list','show','apps','github'],
    answer: "7 projects on GitHub:\n\n1. ZYCARE — Healthcare system (TypeScript, React, Node.js, MongoDB)\n2. FARMER-SCHEMES — Agricultural subsidy platform (JavaScript, Firebase)\n3. MERN LINKOVA — LinkedIn clone (MERN, Socket.io)\n4. Predictive Analysis — ML pipeline (Python, scikit-learn)\n5. Digital Queue Management — Civic-tech (Node.js, MongoDB)\n6. SECURE VOTING SYSTEM — Cryptographic voting (Java, RSA/AES)\n7. GYM MANAGEMENT — Fitness platform (JavaScript, MongoDB)\n\ngithub.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['zycare','healthcare','hospital','medical','clinic','health','role','access','admin','doctor','patient','featured'],
    answer: "ZYCARE is the featured project — a full-stack healthcare management system with TypeScript, React, Node.js, and MongoDB. It has role-based access control for admins, doctors, and patients, replacing fragmented clinic workflows with one real-time platform.\n→ github.com/AADHIASARANATAMIZHINIAN/ZYCARE",
  },
  {
    tags: ['farmer','scheme','agriculture','subsidy','government','agri','firebase','rural'],
    answer: "FARMER-SCHEMES aggregates government subsidy schemes for small-scale farmers. Filters by eligibility, integrates Firebase for real-time data, and links directly to application portals.\n→ github.com/AADHIASARANATAMIZHINIAN/FARMER-SCHEMES",
  },
  {
    tags: ['linkova','linkedin','mern','clone','social','socket','jwt','auth','notification','feed'],
    answer: "MERN LINKOVA is a production-grade LinkedIn clone — JWT auth with refresh tokens, real-time notifications via Socket.io, and a full social feed with media uploads.\n→ github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA",
  },
  {
    tags: ['predictive','analysis','logistic','regression','classification','scikit','ml','pipeline'],
    answer: "The Predictive Analysis System is an ML pipeline for multi-class prediction using logistic regression with scikit-learn — includes preprocessing, evaluation metrics, and Matplotlib visualizations.\n→ github.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['queue','digital','government','citizen','token','tracking','civic','counter','dashboard'],
    answer: "Digital Queue Management is a citizen services system for government offices — digital tokens, real-time tracking, and an admin dashboard for multi-counter management.\n→ github.com/AADHIASARANATAMIZHINIAN/Digital-Queue-Management",
  },
  {
    tags: ['voting','secure','vote','cryptographic','java','rsa','aes','encryption','ballot','audit'],
    answer: "SECURE VOTING SYSTEM is a cryptographic voting infrastructure in Java — RSA/AES encrypted ballots, voter privacy, and an immutable audit trail for post-election verification.\n→ github.com/AADHIASARANATAMIZHINIAN/SECURE-VOTING-SYSTEM",
  },
  {
    tags: ['gym','fitness','management','member','schedule','payment','retention','analytics'],
    answer: "GYM MANAGEMENT is an operations platform for fitness centers — member lifecycle tracking, class scheduling, payment records with overdue alerts, and retention analytics.\n→ github.com/AADHIASARANATAMIZHINIAN/GYM-MANAGEMENT",
  },

  // CURRENTLY BUILDING
  {
    tags: ['currently','building','now','progress','working','lab','active','ongoing','wip'],
    answer: "Currently in progress:\n\n🤖 ML Pipeline — End-to-end training, evaluation, deployment + automated monitoring\n🏥 ZYROVER — Healthcare rover for hospital environments with CI/CD pipelines\n🇯🇵 JLPT N5+ — Advancing Japanese beyond N5",
  },

  // EXPERIENCE
  {
    tags: ['experience','internship','worked','company','role','position','background','journey','history'],
    answer: "Experience timeline:\n\n🎓 B.Tech AI & Data Science — M. Kumarasamy College of Engineering (2024–2028), CGPA: 7.98\n💼 MERN Stack Intern — Unified Mentor (2025): Firebase, system architecture, LLD\n💼 Web Dev Intern — Cognifz (2025): Responsive UI, cross-browser debugging\n\nCertifications: NPTEL IoT (2025), JLPT N5 A Grade (2026)",
  },
  {
    tags: ['unified','mentor','mern','intern','firebase','lld','architecture'],
    answer: "At Unified Mentor (2025) as MERN Stack Intern — mastered real-time Firebase integration, CRUD operations, and developed System Architecture + Low-Level Design (LLD) skills for scalable apps.",
  },
  {
    tags: ['cognifz','web','frontend','html','css','javascript','responsive','ui','ux','intern'],
    answer: "At Cognifz (2025) as Web Development Intern — built responsive mobile-first interfaces with HTML, CSS, and JavaScript. Improved UI/UX design skills and cross-browser debugging.",
  },
  {
    tags: ['college','university','mkce','kumarasamy','cgpa','grade','btech','degree','education'],
    answer: "Aadhiasarana is pursuing a B.Tech in Artificial Intelligence and Data Science at M. Kumarasamy College of Engineering (2024–2028), CGPA: 7.98. Coursework covers ML, deep learning, statistics, and data engineering.",
  },
  {
    tags: ['certificate','certification','nptel','iot','jlpt','japanese','language'],
    answer: "Certifications:\n📜 IOT for Industries — NPTEL (2025)\n🇯🇵 JLPT N5 — A Grade (2026)\n\nAlso: Hackathon participant, Campus Ambassador for Eduveda Academy.",
  },
  {
    tags: ['hackathon','campus','ambassador','eduveda','extracurricular','activity','competition'],
    answer: "Aadhiasarana participates in hackathons (AI + web solutions under tight deadlines) and served as Campus Ambassador for Eduveda Academy, promoting technical opportunities among students.",
  },

  // CONTACT & HIRING
  {
    tags: ['hire','hiring','freelance','collaborate','work','available','opportunity','internship','job','open'],
    answer: "Yes! Open to internships, freelance projects, and collaborations — especially in AI/ML, full-stack dev, and AI-powered products.\n\n📧 aadhiasarana12@gmail.com\n💼 linkedin.com/in/aadhiasarana-t-529641328\n💻 github.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['contact','email','reach','message','connect','linkedin','github','instagram','social'],
    answer: "How to reach Aadhiasarana:\n📧 aadhiasarana12@gmail.com\n💼 linkedin.com/in/aadhiasarana-t-529641328\n💻 github.com/AADHIASARANATAMIZHINIAN\n📸 instagram.com/__aadhiasarana_",
  },
  {
    tags: ['rate','cost','price','charge','fee','budget','quote','pay','how much'],
    answer: "Rates vary by project scope. Email aadhiasarana12@gmail.com with a brief description and he'll respond quickly with a quote.",
  },
  {
    tags: ['resume','cv','download','pdf','document'],
    answer: "Download Aadhiasarana's resume from the Experience section of this portfolio — there's a 'Download Resume' button. Or look for AADHI_RESUME.pdf directly.",
  },
  {
    tags: ['remote','timezone','location','india','tamil','based','where','from','city','country'],
    answer: "Based in Tamil Nadu, India. Works remotely and is comfortable collaborating across time zones.",
  },
  {
    tags: ['response','reply','fast','quick','time','long','wait','respond','availability'],
    answer: "Aadhiasarana typically responds to emails within 24 hours. For urgent work, mention it in your email subject line.",
  },
  {
    tags: ['team','collaboration','group','work together','client','clients'],
    answer: "Absolutely — Aadhiasarana is comfortable working both independently and in teams. He's done collaborative work during internships and hackathons.",
  },
  {
    tags: ['start','begin','when','soon','notice','period','onboard','quickly'],
    answer: "Aadhiasarana can typically start on new freelance or collaborative projects within a week. Reach out at aadhiasarana12@gmail.com to discuss timelines.",
  },
  {
    tags: ['maintenance','support','after','ongoing','post','launch','update'],
    answer: "Yes, Aadhiasarana offers post-launch support and maintenance for projects he builds. This can be discussed as part of the project scope.",
  },

  // PORTFOLIO / THIS SITE
  {
    tags: ['portfolio','website','site','this','built','how','made','tech','3d','animation'],
    answer: "This portfolio is built with React + TypeScript, Tailwind CSS, Framer Motion, Lenis (smooth scroll), Three.js + OGL (3D), deployed on Vercel. The aurora background, floating kanji, 3D keyboard, and glassmorphic cards are all custom-built.",
  },
  {
    tags: ['chatbot','widget','aadhi','assistant','offline','how','work','this','bot'],
    answer: "I'm AADHI — a fully offline AI assistant! No cloud API, no cost, always instant. I use a local TF-IDF knowledge base + name recognition built from all portfolio data. Aadhiasarana can build similar bots with streaming APIs, RAG, and custom personas for any website.",
  },
  {
    tags: ['threejs','3d','webgl','ogl','keyboard','three','render','visual','canvas'],
    answer: "The 3D elements — including the interactive keyboard model — are built with Three.js and OGL for immersive web experiences beyond standard UI.",
  },

  // GENERIC CONVERSATIONAL
  {
    tags: ['how','doing','feeling','going','day','good','fine','well','great'],
    answer: "Doing great, thanks for asking! I'm always ready to help. What would you like to know about Aadhiasarana's work?",
  },
  {
    tags: ['joke','funny','laugh','humor','fun'],
    answer: "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Anyway — what can I tell you about Aadhiasarana's projects?",
  },
  {
    tags: ['time','date','clock','today','current'],
    answer: "I don't have access to real-time data like the current time — I'm a static offline assistant! But I can tell you everything about Aadhiasarana's portfolio. 😊",
  },
  {
    tags: ['weather','rain','sun','hot','cold','temperature','forecast'],
    answer: "No weather data here — I'm fully offline! But if you want to know about Aadhiasarana's projects, skills, or how to hire him, that I can help with. ☀️",
  },
  {
    tags: ['favorite','best','like','prefer','love','enjoy','passion'],
    answer: "Aadhiasarana's favorite kind of work is at the intersection of AI and real-world software — building things that actually solve problems. ZYCARE (healthcare system) and the ML pipeline are the projects he's most excited about.",
  },
  {
    tags: ['what are you','are you ai','artificial intelligence','robot','bot','machine','real','human'],
    answer: "I'm AADHI — an offline AI assistant built specifically for this portfolio. I'm not a general-purpose AI like ChatGPT; I'm a knowledge-base chatbot that knows everything about Aadhiasarana T. No internet required!",
  },
  {
    tags: ['language','speak','english','tamil','japanese','multilingual'],
    answer: "Aadhiasarana speaks English (professional), Tamil (native), and is learning Japanese (JLPT N5, A Grade — currently working towards N5+).",
  },
  {
    tags: ['impressive','nice','cool','amazing','wow','great','awesome','wonderful'],
    answer: "Thank you! 😊 Aadhiasarana puts a lot of care into everything he builds. Want to know more about a specific project or skill?",
  },
  {
    tags: ['compare','vs','better','difference','react','vue','angular','svelte','framework'],
    answer: "Aadhiasarana primarily uses React (his strongest frontend framework). He hasn't used Vue, Angular, or Svelte professionally, but React's ecosystem covers everything he needs for now.",
  },
  {
    tags: ['open source','contribute','contribution','community','github','star','fork'],
    answer: "Aadhiasarana has all his projects publicly available on GitHub at github.com/AADHIASARANATAMIZHINIAN. He welcomes stars, forks, and collaboration on his repos!",
  },
  {
    tags: ['advice','tips','junior','beginner','learn','start','how to','coding','programming'],
    answer: "Aadhiasarana's approach: build real projects from day one, not just tutorials. He learned MERN, ML, and React all by building actual apps. His GitHub proves it — every repo is a working project.",
  },
]

// ── Retrieval Engine ─────────────────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
}

function score(qt: string[], entry: Entry): number {
  if (qt.length === 0) return 0
  let hits = 0
  for (const q of qt)
    if (entry.tags.some(t => t === q || t.includes(q) || q.includes(t))) hits++
  return hits / qt.length
}

const GREET_RE   = /^(hi|hello|hey|sup|yo|howdy|greetings|hola|hai)\b/i
const THANKS_RE  = /^(thanks|thank you|ty|thx|cheers|appreciate|perfect|great job)/i
const BYE_RE     = /^(bye|goodbye|cya|see you|later|take care|gotta go)\b/i
const HELP_RE    = /\b(what can you|help me|what do you know|capabilities|ask you|what can i ask)\b/i
const NAME_INTRO = /(?:i(?:'m| am)|my name(?:'s| is)|call me|this is|name's)\s+[A-Za-z]/i

export function findBestAnswer(query: string): string {
  const q = query.trim()
  const name = visitorName

  // Name introduction
  const detectedName = extractAndStoreName(q)
  if (detectedName || NAME_INTRO.test(q)) {
    const n = detectedName || visitorName || 'there'
    return `Nice to meet you, ${n}! 👋 I'm AADHI — Aadhiasarana's portfolio assistant. Feel free to ask me about his projects, skills, internships, or how to get in touch!`
  }

  if (GREET_RE.test(q))
    return greet("Hey! 👋 I'm AADHI, Aadhiasarana's offline AI assistant. Ask me about his projects, skills, or experience!")

  if (THANKS_RE.test(q))
    return name ? `You're welcome, ${name}! 😊 Anything else I can help with?` : "You're welcome! 😊 Anything else?"

  if (BYE_RE.test(q))
    return name ? `Catch you later, ${name}! Come back anytime 👋` : "Catch you later! Come back anytime 👋"

  if (HELP_RE.test(q))
    return "I can answer questions about:\n• All 7 of Aadhiasarana's GitHub projects\n• His full tech stack and skills\n• Internship experience and education\n• What he's currently building\n• How to hire or contact him\n\nJust ask naturally!"

  const tokens = tokenize(q)
  let best: Entry | null = null
  let bestScore = 0
  for (const entry of KB) {
    const s = score(tokens, entry)
    if (s > bestScore) { bestScore = s; best = entry }
  }

  if (bestScore >= 0.18 && best) {
    return name ? best.answer : best.answer
  }

  return name
    ? `Hmm, not sure about that one, ${name}. Try asking about his projects, skills, or how to contact him. Or email directly: aadhiasarana12@gmail.com 📬`
    : "Hmm, not sure about that one. Try asking about projects, skills, experience, or contact info. Or email: aadhiasarana12@gmail.com 📬"
}

// ── Simulated streaming ──────────────────────────────────────────────────────
export async function* streamAnswer(query: string): AsyncGenerator<string, void, unknown> {
  // Extract name before getting answer
  extractAndStoreName(query)
  const answer = findBestAnswer(query)
  const words = answer.split(' ')
  for (let i = 0; i < words.length; i++) {
    yield (i === 0 ? '' : ' ') + words[i]
    const w = words[i]
    await new Promise(r => setTimeout(r, /[.!?]$/.test(w) ? 52 : /[,:\n]/.test(w) ? 28 : 13))
  }
}

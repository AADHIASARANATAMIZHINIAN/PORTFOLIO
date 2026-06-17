// src/utils/offlineChat.ts
// 100% offline — TF-IDF retrieval + simulated streaming.
// Knowledge base sourced directly from the portfolio components.

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

// ── Knowledge Base ────────────────────────────────────────────────────────────
const KB: Entry[] = [

  // ── WHO IS AADHIASARANA ──────────────────────────────────────────────────
  {
    tags: ['who','aadhiasarana','about','person','yourself','introduce','introduction','name','bio'],
    answer: "I'm Aadhiasarana T — an AI & Data Science undergraduate at M. Kumarasamy College of Engineering (graduating 2028) and a full-stack developer from Tamil Nadu, India. I build intelligent systems, modern web apps, and AI-powered products. I also enjoy Linux environments, automation, and learning Japanese (JLPT N5, A Grade). I'm currently open to internships and freelance collaborations.",
  },
  {
    tags: ['personality','interests','hobbies','outside','life','japanese','linux','learning','curiosity'],
    answer: "Outside of coding, Aadhiasarana is learning Japanese (he passed JLPT N5 with an A Grade and is working towards N5+). He runs Arch Linux, enjoys automation, and is deeply curious about new technologies, cultures, and continuous learning. He sees language learning and programming as parallel pursuits — both are about mastering systems.",
  },

  // ── SKILLS ───────────────────────────────────────────────────────────────
  {
    tags: ['skills','stack','technologies','tech','languages','tools','know','use','expertise','toolkit','good'],
    answer: "Here's Aadhiasarana's full tech stack:\n\n🖥 Languages: Python, TypeScript, JavaScript, Java, C\n⚛️ Frontend: React, Tailwind CSS, Framer Motion, Vite, HTML/CSS\n🔧 Backend: Node.js, Express, Flask, Django, REST APIs, MongoDB, Firebase\n🤖 AI & Data: scikit-learn, pandas, NumPy, Matplotlib, Jupyter\n🛠 Tools: Git, Arch Linux, Docker, Vercel, GitHub Actions\n\nCurrently deepening: Systems programming in C, ML model deployment, SQL & data pipelines, Next.js App Router.",
  },
  {
    tags: ['python','backend','flask','django','fastapi','node','express','server','api'],
    answer: "For backend work, Aadhiasarana uses Python (Flask, Django) and Node.js with Express. He designs REST APIs, integrates ML models into production services, and has used Firebase for real-time databases. He also has experience with system architecture and Low-Level Design (LLD) for scalable applications.",
  },
  {
    tags: ['react','typescript','frontend','ui','interface','component','vite','tailwind','framer','css'],
    answer: "Aadhiasarana builds frontends with React + TypeScript, styled with Tailwind CSS and animated with Framer Motion. He uses Vite as his dev toolchain and Lenis for smooth scroll physics. This portfolio itself is a showcase of what he can do — 3D elements, aurora backgrounds, smooth animations.",
  },
  {
    tags: ['ai','machine learning','ml','deep learning','scikit','pandas','numpy','data','jupyter','model'],
    answer: "For AI & ML, Aadhiasarana uses scikit-learn for classification and regression models, pandas and NumPy for data processing, Matplotlib for visualization, and Jupyter for experimentation. He's built multi-class predictive analysis pipelines and is currently deepening his skills in model deployment and automated ML pipelines.",
  },
  {
    tags: ['docker','devops','github','actions','vercel','ci','cd','deployment','tools','git','linux','arch'],
    answer: "On the DevOps and tools side: Git, GitHub Actions for CI/CD, Vercel for deployments, Docker, and Arch Linux as his daily OS. He's experienced in setting up automated deployment pipelines and modular project architectures.",
  },
  {
    tags: ['learning','currently','studying','now','next','future','improving','deepening','sql','pipeline'],
    answer: "Aadhiasarana is currently deepening his knowledge in: Systems programming in C, ML model deployment workflows, SQL & data pipelines, and Next.js App Router. He also has two active projects in progress — an end-to-end ML pipeline and the ZYROVER healthcare rover system.",
  },

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  {
    tags: ['project','projects','built','made','work','portfolio','apps','all','list','show'],
    answer: "Aadhiasarana has 6+ projects on GitHub. Here's the full list:\n\n1. ZYCARE — Healthcare management system (TypeScript, React, Node.js, MongoDB)\n2. FARMER-SCHEMES — Agricultural subsidy platform (JavaScript, Firebase)\n3. MERN LINKOVA — LinkedIn clone with real-time features (MERN, Socket.io)\n4. Predictive Analysis System — ML pipeline (Python, scikit-learn)\n5. Digital Queue Management — Government civic-tech system (Node.js, MongoDB)\n6. SECURE VOTING SYSTEM — Cryptographic voting in Java (RSA/AES)\n7. GYM MANAGEMENT — Fitness center operations platform (JavaScript, MongoDB)\n\nAll repos: github.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['zycare','healthcare','hospital','medical','clinic','health','role','access','admin','doctor','patient'],
    answer: "ZYCARE is Aadhiasarana's featured project — a full-stack healthcare management system built with TypeScript, React, Node.js, and MongoDB. It features role-based access control for admins, doctors, and patients, designed to replace fragmented clinic workflows with a single real-time platform. GitHub: github.com/AADHIASARANATAMIZHINIAN/ZYCARE",
  },
  {
    tags: ['farmer','scheme','agriculture','subsidy','government','agri','firebase','rural'],
    answer: "FARMER-SCHEMES is an agricultural access platform that aggregates government subsidy schemes for small-scale farmers. It filters by eligibility criteria, integrates Firebase for real-time data, and links directly to application portals. Built with JavaScript, Node.js, Firebase, and REST APIs. GitHub: github.com/AADHIASARANATAMIZHINIAN/FARMER-SCHEMES",
  },
  {
    tags: ['linkova','linkedin','mern','clone','social','network','socket','jwt','auth','notification','feed'],
    answer: "MERN LINKOVA is a production-grade LinkedIn clone built on the MERN stack (MongoDB, Express, React, Node.js). It features JWT auth with refresh tokens, real-time notifications via Socket.io, and a full social feed with media uploads. GitHub: github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA",
  },
  {
    tags: ['predictive','analysis','machine learning','logistic','regression','classification','scikit','pandas','matplotlib','ml','pipeline'],
    answer: "The Predictive Analysis System is an ML pipeline for multi-class predictive analysis. It uses logistic regression trained on real datasets with scikit-learn, and includes preprocessing steps, evaluation metrics, and result visualisation with Matplotlib. GitHub: github.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['queue','digital','government','citizen','token','tracking','civic','counter','dashboard'],
    answer: "Digital Queue Management is a citizen services system for government offices. It handles digital token generation, real-time queue tracking, and an admin dashboard for multi-counter management. Built with JavaScript, Node.js, Express, and MongoDB. GitHub: github.com/AADHIASARANATAMIZHINIAN/Digital-Queue-Management",
  },
  {
    tags: ['voting','secure','vote','cryptographic','java','rsa','aes','encryption','ballot','audit','election'],
    answer: "SECURE VOTING SYSTEM is a cryptographic voting infrastructure built in Java. It uses RSA and AES encryption for ballots, ensures voter privacy, and creates an immutable audit trail for post-election verification. GitHub: github.com/AADHIASARANATAMIZHINIAN/SECURE-VOTING-SYSTEM",
  },
  {
    tags: ['gym','fitness','management','member','schedule','payment','retention','analytics','operations'],
    answer: "GYM MANAGEMENT is an operations platform for fitness centers. It covers member lifecycle tracking, class scheduling, payment records with overdue alerts, and a retention analytics dashboard. Built with JavaScript, Node.js, and MongoDB. GitHub: github.com/AADHIASARANATAMIZHINIAN/GYM-MANAGEMENT",
  },

  // ── CURRENTLY BUILDING ───────────────────────────────────────────────────
  {
    tags: ['currently','building','now','progress','working','lab','active','ongoing','wip'],
    answer: "Right now Aadhiasarana has 3 things in progress:\n\n🤖 ML Pipeline — End-to-end machine learning pipeline with training, evaluation, deployment, and automated monitoring.\n🏥 ZYROVER — Healthcare rover system for maintaining clean and safe environments in hospitals, with CI/CD pipelines.\n🇯🇵 JLPT N5+ — Advancing Japanese language skills — vocabulary, kanji, and conversational fluency beyond N5.",
  },
  {
    tags: ['zyrover','rover','robot','healthcare','hospital','clean','environment','autonomous'],
    answer: "ZYROVER is an active project — a healthcare rover being developed for hospital environments to maintain cleanliness and safety. It's being built with CI/CD deployment pipelines. Still in progress but ambitious!",
  },
  {
    tags: ['ml pipeline','automated','monitoring','training','evaluation','deployment','end to end'],
    answer: "Aadhiasarana is building an end-to-end ML pipeline that covers model training, evaluation, deployment, and automated monitoring — a production-grade system for the full ML lifecycle.",
  },

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  {
    tags: ['experience','internship','worked','company','role','position','background','journey','history'],
    answer: "Aadhiasarana's experience timeline:\n\n🎓 AI & Data Science Student — M. Kumarasamy College of Engineering (2024–2028), CGPA: 7.98\n💼 MERN Stack Intern — Unified Mentor (2025): Firebase, system architecture, LLD for scalable apps\n💼 Web Development Intern — Cognifz (2025): Frontend dev, responsive UI, cross-browser debugging\n\nCertifications: IOT for Industries (NPTEL, 2025), JLPT N5 A Grade (2026)\nActivities: Hackathon participant, Campus Ambassador for Eduveda Academy",
  },
  {
    tags: ['unified','mentor','mern','intern','firebase','lld','architecture','internship'],
    answer: "At Unified Mentor (2025), Aadhiasarana was a MERN Stack Intern. He mastered real-time database integration with Firebase, CRUD operations, and developed System Architecture and Low-Level Design (LLD) skills for building modular, scalable applications.",
  },
  {
    tags: ['cognifz','web','frontend','html','css','javascript','responsive','ui','ux','intern'],
    answer: "At Cognifz (2025), Aadhiasarana was a Web Development Intern working as a Frontend Developer. He built responsive, mobile-first interfaces using HTML, CSS, and JavaScript, and improved his UI/UX design skills and cross-browser debugging techniques.",
  },
  {
    tags: ['college','university','mkce','kumarasamy','cgpa','grade','btech','degree','education','student'],
    answer: "Aadhiasarana is pursuing a B.Tech in Artificial Intelligence and Data Science at M. Kumarasamy College of Engineering (2024–2028). His current CGPA is 7.98 (through 2nd semester). The coursework covers machine learning, deep learning, statistics, and data engineering.",
  },
  {
    tags: ['certificate','certification','nptel','iot','jlpt','japanese','language','badge'],
    answer: "Aadhiasarana holds two certifications:\n📜 IOT for Industries — NPTEL (2025)\n🇯🇵 JLPT N5 — A Grade (2026)\n\nHe's also a Hackathon participant and served as Campus Ambassador for Eduveda Academy.",
  },
  {
    tags: ['hackathon','campus','ambassador','eduveda','extracurricular','activity','competition','cocurricular'],
    answer: "Beyond academics and internships, Aadhiasarana participates in hackathons (building AI and web solutions under tight deadlines at college-level and external events) and served as Campus Ambassador for Eduveda Academy, promoting technical opportunities among students.",
  },

  // ── CONTACT & HIRING ─────────────────────────────────────────────────────
  {
    tags: ['hire','hiring','freelance','collaborate','work','available','opportunity','internship','job','open'],
    answer: "Yes! Aadhiasarana is open to internships, freelance projects, and collaborations — especially in AI/ML, full-stack development, and AI-powered product building. Reach him at:\n📧 aadhiasarana12@gmail.com\n💼 linkedin.com/in/aadhiasarana-t-529641328\n💻 github.com/AADHIASARANATAMIZHINIAN",
  },
  {
    tags: ['contact','email','reach','message','connect','linkedin','github','instagram','social','dm'],
    answer: "Here's how to reach Aadhiasarana:\n📧 aadhiasarana12@gmail.com\n💼 linkedin.com/in/aadhiasarana-t-529641328\n💻 github.com/AADHIASARANATAMIZHINIAN\n📸 instagram.com/__aadhiasarana_\n\nOr use the Contact section on this portfolio — he responds fast!",
  },
  {
    tags: ['rate','cost','price','charge','fee','budget','quote','pay'],
    answer: "Aadhiasarana's rates vary by project scope. Best approach: email aadhiasarana12@gmail.com with a brief description of what you need, and he'll get back to you quickly with a quote.",
  },
  {
    tags: ['resume','cv','download','pdf','document'],
    answer: "You can download Aadhiasarana's resume directly from this portfolio — scroll to the Experience section and hit the 'Download Resume' button, or look for AADHI_RESUME.pdf in the site.",
  },

  // ── PORTFOLIO / THIS WEBSITE ──────────────────────────────────────────────
  {
    tags: ['portfolio','website','site','this','built','how','made','tech','stack','3d','animation'],
    answer: "This portfolio is built with React + TypeScript, Tailwind CSS, Framer Motion (animations), Lenis (smooth scroll), Three.js and OGL (3D elements), and deployed on Vercel. The aurora background, floating kanji characters, 3D keyboard model, and glassmorphic cards are all custom-built. It's a testament to what Aadhiasarana can create on the frontend.",
  },
  {
    tags: ['threejs','3d','webgl','ogl','keyboard','three','render','visual','canvas'],
    answer: "The 3D elements on this portfolio — including the interactive keyboard model — are built with Three.js and OGL. Aadhiasarana uses these libraries for immersive web experiences that go beyond standard UI.",
  },
  {
    tags: ['chatbot','widget','this','aadhi','assistant','offline','how','work','ai'],
    answer: "I'm AADHI — a custom-built offline AI assistant! I don't use any cloud API. Instead, I use a local TF-IDF knowledge base built from all of Aadhiasarana's portfolio data. Every response is instant, works without internet, and costs nothing to run. Aadhiasarana can build similar chatbots — with streaming APIs, RAG, custom personas — for any website.",
  },

  // ── LOCATION ─────────────────────────────────────────────────────────────
  {
    tags: ['location','india','remote','timezone','based','where','from','city','country','tamil','nadu'],
    answer: "Aadhiasarana is based in Tamil Nadu, India. He works remotely and is comfortable collaborating across time zones.",
  },
]

// ── Retrieval Engine ─────────────────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
}

function score(queryTokens: string[], entry: Entry): number {
  if (queryTokens.length === 0) return 0
  let hits = 0
  for (const qt of queryTokens) {
    if (entry.tags.some(tag => tag === qt || tag.includes(qt) || qt.includes(tag))) hits++
  }
  return hits / queryTokens.length
}

const GREET_RE  = /^(hi|hello|hey|sup|yo|howdy|greetings|hola)\b/i
const THANKS_RE = /^(thanks|thank you|ty|thx|cheers|appreciate|great)/i
const BYE_RE    = /^(bye|goodbye|cya|see you|later|take care)\b/i
const HELP_RE   = /\b(what can you|help|what do you know|capabilities|ask you)\b/i

export function findBestAnswer(query: string): string {
  const q = query.trim()

  if (GREET_RE.test(q))
    return "Hey! 👋 I'm AADHI — Aadhiasarana's offline AI assistant. I know everything about his projects, skills, experience, and more. What would you like to know?"

  if (THANKS_RE.test(q))
    return "You're welcome! 😊 Feel free to ask anything else about Aadhiasarana's work."

  if (BYE_RE.test(q))
    return "Catch you later! Come back anytime — I'm always here. 👋"

  if (HELP_RE.test(q))
    return "I can answer questions about:\n• Aadhiasarana's projects (ZYCARE, MERN Linkova, etc.)\n• His skills and tech stack\n• Internships and education\n• How to hire or contact him\n• What he's currently building\n\nJust ask naturally!"

  const tokens = tokenize(q)
  let best: Entry | null = null
  let bestScore = 0

  for (const entry of KB) {
    const s = score(tokens, entry)
    if (s > bestScore) { bestScore = s; best = entry }
  }

  if (bestScore >= 0.18 && best) return best.answer

  return "I'm not sure about that one specifically. Try asking about his projects, skills, experience, or how to contact him. Or reach out directly at aadhiasarana12@gmail.com! 📬"
}

// ── Simulated word-by-word streaming ────────────────────────────────────────
export async function* streamAnswer(query: string): AsyncGenerator<string, void, unknown> {
  const answer = findBestAnswer(query)
  const words = answer.split(' ')
  for (let i = 0; i < words.length; i++) {
    yield (i === 0 ? '' : ' ') + words[i]
    const w = words[i]
    const delay = /[.!?]$/.test(w) ? 52 : /[,:]$/.test(w) ? 26 : /\n/.test(w) ? 40 : 13
    await new Promise(r => setTimeout(r, delay))
  }
}

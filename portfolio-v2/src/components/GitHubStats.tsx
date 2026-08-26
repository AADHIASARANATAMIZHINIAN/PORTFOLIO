import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, Users, BookMarked, GitFork, ExternalLink } from 'lucide-react'

interface GHUser { public_repos: number; followers: number; following: number }
interface GHRepo { name: string; stargazers_count: number; language: string | null; html_url: string; description: string | null; forks_count: number }

const USER = 'AADHIASARANATAMIZHINIAN'

export default function GitHubStats() {
  const [user, setUser] = useState<GHUser | null>(null)
  const [repos, setRepos] = useState<GHRepo[]>([])
  const [err, setErr] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
        ])
        if (!uRes.ok || !rRes.ok) throw new Error('gh api')
        const u = await uRes.json()
        const r: GHRepo[] = await rRes.json()
        if (!cancelled) { setUser({ public_repos: u.public_repos, followers: u.followers, following: u.following }); setRepos(r) }
      } catch { if (!cancelled) setErr(true) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)
  const langMap = repos.reduce<Record<string, number>>((acc, r) => { if (r.language) acc[r.language] = (acc[r.language]||0)+1; return acc }, {})
  const topLangs = Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,5)
  const totalLang = topLangs.reduce((s,[,c])=>s+c,0) || 1
  const topRepos = [...repos].sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,4)

  return (
    <section id="github-stats" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-10">
          <span className="section-num select-none" aria-hidden>03b</span>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
            <p className="font-mono text-xs text-brand/70 tracking-[0.2em] uppercase mb-3">GitHub — Live</p>
            <div style={{ overflow:'hidden' }}>
              <motion.h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing:'0.02em', lineHeight:0.95 }} initial={{ clipPath:'inset(100% 0 0 0)', y:20 }} whileInView={{ clipPath:'inset(0% 0 0 0)', y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.75, delay:0.1, ease:[0.16,1,0.3,1] }}>
                Open <span className="brand-gradient-text">source</span>
              </motion.h2>
            </div>
            <p className="font-body text-white/45 text-sm mt-3">@ {USER} · live from GitHub API</p>
          </motion.div>
        </div>

        {err ? (
          <div className="glass p-6 text-center">
            <p className="font-body text-sm text-white/50">GitHub API rate limited — <a href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">view profile directly →</a></p>
            <img src={`https://ghchart.rshah.org/${USER}`} alt="GitHub contributions" className="mx-auto mt-4 rounded-xl border border-white/5 max-w-full" loading="lazy" />
          </div>
        ) : !user ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0,1,2,3].map(i=><div key={i} className="glass p-6 animate-pulse"><div className="h-6 bg-white/5 rounded w-12 mb-2" /><div className="h-3 bg-white/5 rounded w-20" /></div>)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label:'Public repos', value:user.public_repos, icon:BookMarked },
                { label:'Total stars', value:totalStars, icon:Star },
                { label:'Followers', value:user.followers, icon:Users },
                { label:'Following', value:user.following, icon:GitFork },
              ].map((s,i)=>(
                <motion.div key={s.label} className="glass glass-hover p-6" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.45, delay:i*0.07 }}>
                  <s.icon className="w-4 h-4 text-brand/60 mb-3" />
                  <div className="font-display brand-gradient-text text-3xl leading-none mb-1" style={{ letterSpacing:'0.02em' }}>{s.value}</div>
                  <div className="font-mono text-xs text-white/35 tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div className="glass p-6" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
                <p className="font-mono text-xs text-white/30 tracking-[0.15em] uppercase mb-4">Top languages</p>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-4" style={{ background:'rgba(255,255,255,0.06)' }}>
                  {topLangs.map(([lang,c],i)=>{
                    const colors: Record<string,string> = { TypeScript:'#3178c6', JavaScript:'#f1e05a', Python:'#3572A5', Java:'#b07219', C:'#555555', HTML:'#e34c26', CSS:'#563d7c' }
                    return <span key={lang} style={{ flex:c, background: colors[lang] || `hsl(${200+i*38} 70% 55%)` }} title={`${lang} ${c}`} />
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {topLangs.map(([lang,c])=>(
                    <span key={lang} className="font-mono text-xs px-2.5 py-1 rounded-lg text-white/60" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>{lang} · {Math.round(c/totalLang*100)}%</span>
                  ))}
                </div>
                <a href={`https://github.com/${USER}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 font-body text-xs text-white/40 hover:text-brand transition-colors">View all repos <ExternalLink className="w-3 h-3" /></a>
              </motion.div>

              <motion.div className="glass p-6" initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.08 }}>
                <p className="font-mono text-xs text-white/30 tracking-[0.15em] uppercase mb-4">Most starred</p>
                <div className="space-y-3">
                  {topRepos.map(r=>(
                    <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-colors group">
                      <span>
                        <span className="font-body text-sm font-medium text-white/80 group-hover:text-white transition-colors block leading-none">{r.name}</span>
                        <span className="font-body text-xs text-white/30 line-clamp-1">{r.description || r.language || '—'}</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs text-white/40 shrink-0 ml-3"><Star className="w-3 h-3" />{r.stargazers_count}</span>
                    </a>
                  ))}
                  {topRepos.length===0 && <p className="font-body text-xs text-white/30">No repos yet</p>}
                </div>
              </motion.div>
            </div>

            <div className="mt-8 glass p-4 overflow-hidden">
              <p className="font-mono text-xs text-white/25 tracking-[0.15em] uppercase mb-3 text-center">Contribution activity</p>
              <img src={`https://ghchart.rshah.org/${USER}`} alt={`GitHub contribution chart for ${USER}`} className="w-full max-w-3xl mx-auto rounded-lg" loading="lazy" onError={e=>((e.target as HTMLImageElement).style.display='none')} />
              <p className="font-mono text-[10px] text-white/20 text-center mt-2">via ghchart.rshah.org · live GitHub data</p>
            </div>

            <div className="text-center mt-6">
              <a href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium text-white/70 hover:text-white transition-colors" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)' }}><Github className="w-4 h-4" />Visit GitHub profile</a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

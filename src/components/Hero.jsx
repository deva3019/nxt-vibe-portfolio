import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Trophy, Users, MapPin } from 'lucide-react'
import { person, taglines } from '../data/content'
import { Marquee, Particles, SpinBadge } from './ui'

const Word = ({ text, ready, delay = 0, className = '' }) => (
  <span className={`inline-flex overflow-hidden pb-[0.12em] ${className}`} aria-label={text}>
    {text.split('').map((c, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="inline-block"
        initial={{ y: '115%', rotate: 8 }}
        animate={ready ? { y: 0, rotate: 0 } : {}}
        transition={{ duration: 1, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {c}
      </motion.span>
    ))}
  </span>
)

export default function Hero({ ready }) {
  const ref = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % person.roles.length), 2200)
    return () => clearInterval(t)
  }, [])

  // mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 18 })
  const sy = useSpring(my, { stiffness: 70, damping: 18 })
  const photoX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const photoY = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const glowX = useTransform(sx, [-0.5, 0.5], [30, -30])
  const glowY = useTransform(sy, [-0.5, 0.5], [30, -30])
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  // scroll parallax on text
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative isolate overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-ink">
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(26,92,58,0.7),transparent_65%)]"
        />
        <div className="absolute -bottom-52 -left-40 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(126,217,87,0.16),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,164,92,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,92,1) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        <Particles count={16} />
        <div className="grain absolute inset-0" />
      </div>

      <motion.div style={{ y: textY, opacity: fade }} className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-12 lg:pt-24">
        {/* text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/[0.03] px-4 py-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-soft">Founder · NXT VIBE</span>
          </motion.div>

          <h1 className="mt-7 font-display font-extrabold leading-[0.95] tracking-tight">
            <span className="block text-[clamp(3rem,10.5vw,8.2rem)]">
              <Word text={person.first} ready={ready} delay={0.35} />
            </span>
            <span className="block text-[clamp(3rem,10.5vw,8.2rem)]">
              <Word text={person.last} ready={ready} delay={0.75} className="gold-text italic" />
            </span>
          </h1>

          {/* rotating role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-6 flex h-9 items-center gap-4 text-lg sm:text-2xl"
          >
            <span className="h-px w-12 bg-gold" />
            <div className="relative h-9 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="block font-light tracking-wide text-cream"
                >
                  {person.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {person.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#brand" className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em]">
              Explore NXT VIBE
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#about" className="btn-ghost inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em]">
              Meet the Founder
            </a>
          </motion.div>
        </div>

        {/* photo */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:col-span-5 lg:max-w-none">
          <motion.div
            style={{ x: photoX, y: photoY }}
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[440px]"
          >
            {/* offset gold frame */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-3xl border border-gold/50" />
            <div className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl bg-[radial-gradient(circle,rgba(201,164,92,0.25),transparent_70%)] blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-3xl ring-1 ring-gold/40">
              <img src="/founder.jpg" alt="SankaraVignesh, Founder of NXT VIBE" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            {/* floating chips */}
            <div className="animate-float absolute -left-4 top-[18%] sm:-left-12">
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl">
                <Trophy size={18} className="text-gold" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-widest text-cream/50">Athlete</p>
                  <p className="text-sm font-semibold">State-Level Champion</p>
                </div>
              </div>
            </div>
            <div className="animate-float absolute -right-3 top-[52%] sm:-right-10" style={{ animationDelay: '1.2s' }}>
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl">
                <Users size={18} className="text-leaf" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-widest text-cream/50">Trusted by</p>
                  <p className="text-sm font-semibold">5,000+ Customers</p>
                </div>
              </div>
            </div>
            <div className="animate-float absolute -left-2 bottom-[6%] sm:-left-10" style={{ animationDelay: '2.2s' }}>
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl">
                <MapPin size={18} className="text-gold" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-widest text-cream/50">Rooted in</p>
                  <p className="text-sm font-semibold">Tirunelveli, TN</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 -top-8 sm:-right-10 sm:-top-10">
              <SpinBadge id="heroBadge" size={120} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.4 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/50 md:flex"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce text-gold" />
      </motion.a>

      {/* tagline marquee */}
      <div className="relative border-y border-gold/20 bg-forest/80 py-4 backdrop-blur">
        <Marquee items={taglines} speed={40} className="font-display text-lg italic text-gold-soft sm:text-xl" />
      </div>
    </section>
  )
}

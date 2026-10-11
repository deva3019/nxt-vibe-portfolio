import { useEffect, useMemo, useRef } from 'react'
import { motion, animate, useInView, useMotionValue, useSpring } from 'framer-motion'

/* Fade + rise on scroll */
export function Reveal({ children, delay = 0, y = 40, x = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Section eyebrow + title */
export function SectionHeading({ eyebrow, title, accent, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      <Reveal>
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-gold">{eyebrow}</span>
          {align === 'center' && <span className="h-px w-10 bg-gold" />}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
          {title} {accent && <span className="gold-text italic">{accent}</span>}
        </h2>
      </Reveal>
    </div>
  )
}

/* Animated number */
export function Counter({ to, suffix = '', raw = false, duration = 2.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (!ref.current) return
        const n = Math.round(v)
        ref.current.textContent = (raw ? String(n) : n.toLocaleString('en-IN')) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, raw, duration])
  return <span ref={ref}>0{suffix}</span>
}

/* Card with a gold spotlight that follows the cursor */
export function Spot({ children, className = '' }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div onMouseMove={onMove} className={`spot ${className}`}>
      {children}
    </div>
  )
}

/* Infinite scrolling strip */
export function Marquee({ items, speed = 35, className = '', separator = '✦' }) {
  const list = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ '--speed': `${speed}s` }}>
        {list.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6 sm:px-10">{t}</span>
            <span className="text-gold/70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* Floating leaves */
const LeafSvg = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 2C6 6 4 12 6 18c6 0 12-4 12-14-2 0-4 0-6-2z" />
  </svg>
)

export function Particles({ count = 14 }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        dur: 14 + Math.random() * 14,
        delay: -Math.random() * 20,
        sway: (Math.random() - 0.5) * 160,
        gold: Math.random() > 0.65,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {leaves.map((l) => (
        <span
          key={l.id}
          className="leaf"
          style={{
            left: `${l.left}%`,
            width: l.size,
            height: l.size,
            color: l.gold ? '#c9a45c' : '#7ed957',
            '--dur': `${l.dur}s`,
            '--delay': `${l.delay}s`,
            '--sway': `${l.sway}px`,
            opacity: 0.6,
          }}
        >
          <LeafSvg />
        </span>
      ))}
    </div>
  )
}

/* Rotating circular text badge */
export function SpinBadge({ text = 'NXT VIBE • NATURE TOUCH • HANDMADES • ', size = 130, id = 'badge' }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 w-full h-full">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="#ead7a4" fontSize="17" letterSpacing="4" fontFamily="Poppins" fontWeight="500">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-leaf">
        <div style={{ width: size * 0.26, height: size * 0.26 }}>
          <LeafSvg />
        </div>
      </div>
    </div>
  )
}

/* Soft light that follows the mouse (desktop only) */
export function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 22 })
  const sy = useSpring(y, { stiffness: 120, damping: 22 })
  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 250)
      y.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] hidden h-[500px] w-[500px] rounded-full md:block"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgba(201,164,92,0.10), rgba(126,217,87,0.04) 45%, transparent 70%)',
      }}
    />
  )
}

/* Brand icons not shipped in lucide */
export const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const LeafIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6 6 4 12 6 18c6 0 12-4 12-14-2 0-4 0-6-2z" />
  </svg>
)

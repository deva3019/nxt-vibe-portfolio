import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const RING = 2 * Math.PI * 108
const ease = (p) => 1 - Math.pow(1 - p, 3)

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const DURATION = 2800
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1)
      setProgress(Math.round(ease(p) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setLeaving(true), 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const curtain = { duration: 1.1, ease: [0.76, 0, 0.24, 1] }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* curtain halves */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
        initial={{ y: 0 }}
        animate={{ y: leaving ? '-100%' : 0 }}
        transition={curtain}
        onAnimationComplete={() => leaving && onDone()}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(18,50,35,0.9),transparent_70%)]" />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        initial={{ y: 0 }}
        animate={{ y: leaving ? '100%' : 0 }}
        transition={curtain}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(18,50,35,0.9),transparent_70%)]" />
      </motion.div>

      {/* centre content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={leaving ? { opacity: 0, scale: 1.25 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      >
        <div className="relative flex h-[240px] w-[240px] items-center justify-center">
          {/* pulsing halo */}
          <span className="absolute h-44 w-44 rounded-full border border-gold/40" style={{ animation: 'pulse-ring 2.4s ease-out infinite' }} />
          <span className="absolute h-44 w-44 rounded-full border border-leaf/30" style={{ animation: 'pulse-ring 2.4s ease-out 1.2s infinite' }} />

          {/* progress ring */}
          <svg viewBox="0 0 240 240" className="absolute inset-0 -rotate-90">
            <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(201,164,92,0.15)" strokeWidth="2" />
            <circle
              cx="120"
              cy="120"
              r="108"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - progress / 100)}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7ed957" />
                <stop offset="100%" stopColor="#ead7a4" />
              </linearGradient>
            </defs>
          </svg>

          {/* orbiting dot */}
          <div className="animate-spin-slow absolute inset-0" style={{ animationDuration: '3s' }}>
            <span className="absolute left-1/2 top-[6px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(201,164,92,0.8)]" />
          </div>

          {/* logo */}
          <motion.img
            src="/logo.png"
            alt="NXT VIBE"
            className="relative h-[170px] w-[170px] rounded-full object-cover shadow-[0_0_60px_-10px_rgba(201,164,92,0.6)]"
            initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.p
          className="mt-8 text-[11px] uppercase tracking-[0.5em] text-gold-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Naturally Crafted
        </motion.p>
        <p className="mt-3 font-display text-3xl tabular-nums text-cream/90">
          {String(progress).padStart(2, '0')}
          <span className="text-gold text-xl">%</span>
        </p>
      </motion.div>
    </div>
  )
}

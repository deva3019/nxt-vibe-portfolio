import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content'

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left gold-line" />
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-gold/15 bg-ink/75 py-2.5 backdrop-blur-xl' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Home">
            <img src="/logo.png" alt="NXT VIBE" className="h-11 w-11 rounded-full ring-1 ring-gold/40" />
            <span className="hidden font-display text-lg font-semibold tracking-wide sm:block">
              Sankara<span className="gold-text">Vignesh</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-4 py-2 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  active === n.id ? 'text-gold' : 'text-cream/70 hover:text-cream'
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-gold hidden rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest sm:block">
              Let’s Talk
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink/97 px-8 py-6 backdrop-blur-2xl"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <img src="/logo.png" alt="NXT VIBE" className="h-12 w-12 rounded-full" />
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-10 flex flex-1 flex-col justify-center gap-1">
              {nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex items-baseline gap-4 border-b border-white/5 py-3 font-display text-4xl font-semibold"
                >
                  <span className="text-sm font-sans text-gold/70">0{i + 1}</span>
                  <span className={active === n.id ? 'gold-text' : ''}>{n.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

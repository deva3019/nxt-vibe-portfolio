import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Droplets, Goal, Heart, TreePine, Utensils } from 'lucide-react'
import { impact, person } from '../data/content'
import { Particles, Reveal, SectionHeading, Spot } from './ui'

const icons = { droplets: Droplets, tree: TreePine, heart: Heart, utensils: Utensils }

export default function Impact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="impact" ref={ref} className="relative overflow-hidden bg-forest py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Social Responsibility" title={impact.headline} />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-3xl text-base leading-[1.9] text-cream/70 sm:text-lg">{impact.text}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* football club */}
          <Reveal className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl bg-linear-to-br from-moss to-ink p-9 ring-1 ring-gold/30 sm:p-12">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-gold/20" />
              <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-gold/20" />
              <Goal className="relative h-14 w-14 text-gold" />
              <p className="relative mt-8 font-display text-6xl font-extrabold text-gold-soft sm:text-7xl">₹0</p>
              <p className="relative mt-1 text-xs uppercase tracking-[0.35em] text-cream/55">fees. Ever.</p>
              <h3 className="relative mt-8 font-display text-3xl font-bold">{impact.club.title}</h3>
              <p className="relative mt-3 leading-relaxed text-cream/70">{impact.club.text}</p>
            </div>
          </Reveal>

          {/* drives */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {impact.drives.map((d, i) => {
              const Icon = icons[d.icon]
              return (
                <Reveal key={d.title} delay={i * 0.1}>
                  <Spot className="glass group h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2">
                    <Icon className="h-9 w-9 text-leaf transition-transform duration-500 group-hover:scale-125" />
                    <h3 className="mt-5 font-display text-xl font-bold">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{d.text}</p>
                  </Spot>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* big quote */}
        <div className="relative mt-28 overflow-hidden rounded-[2rem] border border-gold/25 px-6 py-20 text-center sm:px-16 sm:py-28">
          <div className="absolute inset-0 bg-linear-to-br from-moss via-ink to-moss" />
          <Particles count={8} />
          <motion.div style={{ y }} className="relative">
            <span className="font-display text-8xl leading-none text-gold/40">“</span>
            <p className="-mt-6 font-display text-3xl font-bold leading-snug sm:text-5xl sm:leading-tight">
              True vibration isn’t about making <span className="gold-text italic">noise</span>; it’s about making an{' '}
              <span className="gold-text italic">impact.</span>
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.4em] text-gold">— {person.name}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

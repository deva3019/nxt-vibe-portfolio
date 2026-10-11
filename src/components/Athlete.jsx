import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Flame, Medal, Target, Users } from 'lucide-react'
import { athlete } from '../data/content'
import { Reveal, SectionHeading, Spot } from './ui'

const icons = [Flame, Users, Target]

export default function Athlete() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-35%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-35%', '10%'])

  const line = athlete.ticker.join('   ✦   ')

  return (
    <section id="athlete" ref={ref} className="relative overflow-hidden bg-ink py-28 sm:py-36">
      {/* giant outline text */}
      <div className="pointer-events-none absolute inset-x-0 top-10 select-none space-y-2 sm:top-16" aria-hidden>
        <motion.div style={{ x: x1 }} className="text-outline whitespace-nowrap font-display text-[clamp(4rem,13vw,11rem)] font-extrabold leading-none opacity-70">
          {line} &nbsp; ✦ &nbsp; {line}
        </motion.div>
        <motion.div style={{ x: x2 }} className="whitespace-nowrap font-display text-[clamp(4rem,13vw,11rem)] font-extrabold italic leading-none text-gold/[0.07]">
          {line} &nbsp; ✦ &nbsp; {line}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-40 sm:px-8 sm:pt-56">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHeading eyebrow="The Athlete’s Mindset" title={athlete.headline} className="lg:col-span-7" />
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="glass flex items-center gap-5 rounded-3xl p-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold to-gold-soft text-ink shadow-[0_0_40px_-5px_rgba(201,164,92,0.7)]">
                <Medal size={30} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold">State-Level Athletic Champion</p>
                <p className="mt-1 text-sm text-cream/60">Track & field medalist · passionate football player</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-4xl text-lg leading-[1.9] text-cream/70 sm:text-xl">{athlete.text}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {athlete.traits.map((t, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={t.title} delay={i * 0.12}>
                <Spot className="glass group h-full rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2">
                  <span className="font-display text-7xl font-extrabold text-gold/10">0{i + 1}</span>
                  <div className="-mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{t.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/65">{t.text}</p>
                </Spot>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { journey } from '../data/content'
import { Reveal, SectionHeading } from './ui'

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="journey" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(18,50,35,0.9),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="The Journey" title="From the track to" accent="a movement." />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
          <motion.div style={{ scaleY }} className="gold-line absolute bottom-0 left-4 top-0 w-[2px] origin-top -translate-x-1/2 md:left-1/2" />

          {journey.map((item, i) => {
            const left = i % 2 === 0
            const highlight = item.tag === '25 March 2021'
            return (
              <div
                key={item.tag}
                className={`relative mb-14 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
                }`}
              >
                {/* node */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute top-6 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold bg-ink left-4 ${
                    left ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0'
                  }`}
                >
                  <span className={`rounded-full bg-gold ${highlight ? 'h-2.5 w-2.5 animate-ping' : 'h-1.5 w-1.5'}`} />
                </motion.span>

                <Reveal x={left ? -40 : 40} y={20}>
                  <div
                    className={`glass rounded-3xl p-7 sm:p-8 ${
                      highlight ? 'border-gold/60 bg-gold/10 shadow-[0_0_60px_-15px_rgba(201,164,92,0.5)]' : ''
                    }`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{item.tag}</span>
                    <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-cream/65">{item.text}</p>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

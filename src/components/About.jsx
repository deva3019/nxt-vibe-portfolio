import { Quote } from 'lucide-react'
import { about, person } from '../data/content'
import { Reveal, SectionHeading, Spot } from './ui'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-forest py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(126,217,87,0.1),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="About the Founder" title="Meet the man behind" accent="the vibe." />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* story */}
          <div className="space-y-7 lg:col-span-7">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p
                  className={`leading-[1.85] ${
                    i === 0
                      ? 'font-display text-2xl italic text-cream sm:text-3xl sm:leading-[1.5]'
                      : 'text-base text-cream/70 sm:text-lg'
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="relative mt-10 rounded-3xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent p-8 sm:p-10">
                <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-forest p-2 text-gold" />
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Zero Capital, Infinite Vision</p>
                <p className="mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl">{about.mission}</p>
              </div>
            </Reveal>
          </div>

          {/* dossier */}
          <div className="lg:col-span-5">
            <Reveal x={40} y={0}>
              <div className="lg:sticky lg:top-28">
                <Spot className="glass rounded-3xl p-8 sm:p-10">
                  <div className="flex items-center gap-4">
                    <img src="/founder.jpg" alt="" className="h-16 w-16 rounded-full object-cover object-top ring-2 ring-gold/50" />
                    <div>
                      <p className="font-display text-2xl font-bold">{person.name}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-gold">Founder / CEO</p>
                    </div>
                  </div>
                  <dl className="mt-8 divide-y divide-white/10">
                    {about.dossier.map((d) => (
                      <div key={d.k} className="flex items-baseline justify-between gap-4 py-4">
                        <dt className="text-xs uppercase tracking-[0.25em] text-cream/45">{d.k}</dt>
                        <dd className="text-right text-sm font-medium sm:text-base">{d.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <blockquote className="mt-6 border-l-2 border-gold pl-5 font-display text-lg italic leading-relaxed text-gold-soft">
                    “{person.quote}”
                  </blockquote>
                </Spot>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

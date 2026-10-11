import { ArrowUpRight, Cookie, Globe2, Shirt, Sparkles } from 'lucide-react'
import { brand, contact } from '../data/content'
import { Counter, Reveal, SectionHeading, Spot } from './ui'

const icons = { sparkles: Sparkles, shirt: Shirt, cookie: Cookie }

export default function Brand() {
  return (
    <section id="brand" className="relative overflow-hidden bg-forest py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-200px] top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.12),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* logo showcase */}
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/40" style={{ animationDuration: '40s' }} />
              <div className="animate-spin-slow absolute inset-6 rounded-full border border-leaf/25" style={{ animationDuration: '28s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.22),transparent_65%)] blur-2xl" />
              <img
                src="/logo.png"
                alt="NXT VIBE — Nature Touch Handmades"
                className="animate-float absolute inset-10 h-[calc(100%-5rem)] w-[calc(100%-5rem)] rounded-full object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
              />
            </div>
          </Reveal>

          {/* copy */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="The Brand" title="NXT VIBE —" accent="naturally crafted." />
            <Reveal delay={0.1}>
              <p className="mt-8 font-display text-2xl italic text-gold-soft sm:text-3xl">{brand.welcome}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-[1.9] text-cream/70 sm:text-lg">{brand.intro}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={contact.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Visit {contact.website} <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>

        {/* pillars */}
        <div className="mt-24">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.4em] text-gold">What defines NXT VIBE</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {brand.pillars.map((p, i) => {
              const Icon = icons[p.icon]
              return (
                <Reveal key={p.title} delay={i * 0.12}>
                  <Spot className="glass group h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 sm:p-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gold/25 to-leaf/10 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon size={30} />
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-bold">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-cream/65">{p.text}</p>
                    <span className="mt-6 block h-px w-12 bg-gold transition-all duration-500 group-hover:w-full" />
                  </Spot>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* stats */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/20 lg:grid-cols-4">
            {brand.stats.map((s) => (
              <div key={s.label} className="bg-forest px-6 py-10 text-center">
                <p className="gold-text font-display text-5xl font-extrabold sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} raw={s.raw} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cream/55">{s.label}</p>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center bg-forest px-6 py-10 text-center">
              <Globe2 className="h-11 w-11 text-gold" />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cream/55">Exports Worldwide</p>
            </div>
          </div>
        </Reveal>

        {/* mission */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-20 max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Our Mission</p>
            <p className="mt-6 font-display text-2xl font-semibold leading-snug sm:text-4xl sm:leading-snug">{brand.mission}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

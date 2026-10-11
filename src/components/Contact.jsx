import { useState } from 'react'
import { ArrowUpRight, Globe, Mail, MessageCircle, Send } from 'lucide-react'
import { contact, person, taglines } from '../data/content'
import { InstagramIcon, Marquee, Reveal, SectionHeading, Spot } from './ui'

const channels = [
  { icon: InstagramIcon, label: 'Instagram', value: contact.instagram, href: contact.instagramUrl },
  { icon: MessageCircle, label: 'WhatsApp', value: contact.phone, href: `https://wa.me/${contact.whatsapp}` },
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Globe, label: 'Website', value: contact.website, href: contact.websiteUrl },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const send = (e) => {
    e.preventDefault()
    const text = `Hi NXT VIBE! I'm ${name || 'a visitor'}. ${msg}`
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-cream placeholder:text-cream/35 outline-none transition focus:border-gold focus:bg-white/[0.07]'

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(26,92,58,0.55),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Get in Touch" title="Let’s create the" accent="next vibe." />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a href={c.href} target="_blank" rel="noreferrer" className="block h-full">
                  <Spot className="glass group flex h-full flex-col justify-between rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="text-cream/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" size={20} />
                    </div>
                    <div className="mt-8">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cream/45">{c.label}</p>
                      <p className="mt-1 break-all text-base font-medium sm:text-lg">{c.value}</p>
                    </div>
                  </Spot>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <form onSubmit={send} className="glass rounded-3xl p-7 sm:p-9">
              <p className="font-display text-2xl font-bold">Send a message</p>
              <p className="mt-1 text-sm text-cream/55">It opens WhatsApp with your message ready to send.</p>
              <div className="mt-6 space-y-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} required />
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="How can we work together?" className={`${field} resize-none`} required />
              </div>
              <button type="submit" className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Send via WhatsApp <Send size={15} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      {/* footer */}
      <footer className="relative mt-28 border-t border-gold/20 bg-forest/80">
        <Marquee items={taglines} speed={45} className="border-b border-gold/10 py-5 font-display text-xl italic text-gold-soft/80 sm:text-2xl" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="NXT VIBE" className="h-14 w-14 rounded-full ring-1 ring-gold/40" />
            <div>
              <p className="font-display text-lg font-bold">{person.name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Founder / CEO · NXT VIBE</p>
            </div>
          </div>
          <p className="text-center text-xs text-cream/45 sm:text-right">
            © {new Date().getFullYear()} NXT VIBE · Nature Touch Handmades. All rights reserved.
            <br />
            Crafted with care in Tirunelveli, Tamil Nadu.
          </p>
        </div>
      </footer>
    </section>
  )
}

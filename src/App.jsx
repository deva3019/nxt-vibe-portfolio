import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Athlete from './components/Athlete'
import Brand from './components/Brand'
import Journey from './components/Journey'
import Impact from './components/Impact'
import Contact from './components/Contact'
import { CursorGlow } from './components/ui'

export default function App() {
  const [ready, setReady] = useState(false)

  // lock scrolling until the loader curtain has opened
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    if (!ready) window.scrollTo(0, 0)
  }, [ready])

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <CursorGlow />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Athlete />
        <Brand />
        <Journey />
        <Impact />
        <Contact />
      </main>
    </>
  )
}

import { Suspense, lazy } from 'react'
import DemoCarousel from './showcase/DemoCarousel'
import Reveal from './Reveal'

const GraphicsDemo = lazy(() => import('./showcase/GraphicsDemo'))

function DemoFallback() {
  return <div className="demo-card demo-loading">Loading demo…</div>
}

function Showcase() {
  return (
    <section id="showcase" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">03</span> Skills in Action
      </Reveal>
      <Reveal as="p" className="section-intro">
        A CV is a list of claims. These are small, interactive proofs, built
        with the same tools listed above.
      </Reveal>

      <div className="demo-stack">
        <Reveal>
          <DemoCarousel />
        </Reveal>
        <Reveal delay={80}>
          <Suspense fallback={<DemoFallback />}>
            <GraphicsDemo />
          </Suspense>
        </Reveal>
      </div>
    </section>
  )
}

export default Showcase

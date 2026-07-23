import { Suspense, lazy } from 'react'
import BpmnDemo from './showcase/BpmnDemo'

const ProcessImpactChart = lazy(() => import('./showcase/ProcessImpactChart'))
const GraphicsDemo = lazy(() => import('./showcase/GraphicsDemo'))

function DemoFallback() {
  return <div className="demo-card demo-loading">Loading demo…</div>
}

function Showcase() {
  return (
    <section id="showcase" className="section">
      <h2 className="section-title">
        <span className="section-index">03</span> Skills in Action
      </h2>
      <p className="section-intro">
        A CV is a list of claims. These are small, interactive proofs, built
        with the same tools listed above.
      </p>

      <div className="demo-stack">
        <BpmnDemo />
        <Suspense fallback={<DemoFallback />}>
          <ProcessImpactChart />
        </Suspense>
        <Suspense fallback={<DemoFallback />}>
          <GraphicsDemo />
        </Suspense>
      </div>
    </section>
  )
}

export default Showcase

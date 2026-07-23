import { Suspense, lazy, useEffect, useState } from 'react'
import SdlcFlowDemo from './SdlcFlowDemo'

const ProcessImpactChart = lazy(() => import('./ProcessImpactChart'))

const SLIDE_DURATION = 11000

const SLIDES = [
  { id: 'flow', label: 'Delivery Workflow' },
  { id: 'impact', label: 'SLA Impact' },
]

function DemoFallback() {
  return <div className="carousel-slide demo-loading">Loading demo…</div>
}

function DemoCarousel() {
  const [active, setActive] = useState(0)
  const [chartPlayToken, setChartPlayToken] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      goTo((active + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  function goTo(index) {
    setActive(index)
    if (SLIDES[index].id === 'impact') {
      setChartPlayToken((t) => t + 1)
    }
  }

  return (
    <div className="demo-card carousel">
      <div className="carousel-tabs" role="tablist" aria-label="Choose a demo">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`carousel-tab${active === i ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          >
            {slide.label}
          </button>
        ))}
      </div>

      <div className="carousel-viewport">
        <div className={`carousel-pane${active === 0 ? ' is-active' : ''}`}>
          <SdlcFlowDemo />
        </div>
        <div className={`carousel-pane${active === 1 ? ' is-active' : ''}`}>
          <Suspense fallback={<DemoFallback />}>
            <ProcessImpactChart playToken={chartPlayToken} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default DemoCarousel

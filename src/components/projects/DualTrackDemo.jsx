import { useEffect, useState } from 'react'

const CANDIDATE_STAGES = ['Applied', 'Interview', 'Offer']
const EMPLOYER_STAGES = ['New Lead', 'Interview', 'Hire']
const X = [40, 140, 240]
const STEP_DURATION = 1100
const PAUSE_DURATION = 1400
const LAST_STEP = CANDIDATE_STAGES.length - 1

function Track({ stages, y, activeIndex }) {
  return (
    <g>
      <line x1={X[0]} y1={y} x2={X[2]} y2={y} className="dt-edge" />
      <line
        x1={X[0]}
        y1={y}
        x2={X[Math.min(activeIndex, LAST_STEP)]}
        y2={y}
        className="dt-edge is-active"
      />
      {stages.map((label, i) => (
        <g key={label}>
          <circle cx={X[i]} cy={y} r={7} className={`dt-node${i <= activeIndex ? ' is-active' : ''}`} />
          <text x={X[i]} y={y + 22} className="dt-label">{label}</text>
        </g>
      ))}
    </g>
  )
}

function DualTrackDemo() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const atEnd = stepIndex >= LAST_STEP
    const timer = setTimeout(
      () => setStepIndex((i) => (atEnd ? 0 : i + 1)),
      atEnd ? PAUSE_DURATION : STEP_DURATION,
    )
    return () => clearTimeout(timer)
  }, [stepIndex])

  return (
    <svg viewBox="0 0 280 130" className="dualtrack-svg" role="img" aria-label="Animated diagram of a candidate's application pipeline and an employer's hiring pipeline advancing in sync">
      <text x={140} y={12} className="dt-title">Candidate view</text>
      <Track stages={CANDIDATE_STAGES} y={34} activeIndex={stepIndex} />
      <text x={140} y={76} className="dt-title">Employer view (synced)</text>
      <Track stages={EMPLOYER_STAGES} y={98} activeIndex={stepIndex} />
    </svg>
  )
}

export default DualTrackDemo

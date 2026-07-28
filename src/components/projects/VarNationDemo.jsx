import { useEffect, useState } from 'react'

const REASONS = [
  'Offside — by 0.5mm, detected via satellite.',
  "The ball's air pressure was 0.3 PSI over regulation.",
  'A pigeon was marginally offside.',
  "Referee's cat walked across the monitor.",
]

const STEPS = [
  { icon: '⚽', text: 'GOAL!', tone: 'neutral' },
  { icon: '🔍', text: 'VAR CHECK…', tone: 'neutral' },
  { icon: '❌', text: 'DISALLOWED', tone: 'bad' },
]

const STEP_DURATION = 1600

function VarNationDemo() {
  const [stepIndex, setStepIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const step = STEPS[stepIndex]
  const reason = REASONS[cycle % REASONS.length]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stepIndex >= STEPS.length - 1) {
        setStepIndex(0)
        setCycle((c) => c + 1)
      } else {
        setStepIndex((i) => i + 1)
      }
    }, STEP_DURATION)
    return () => clearTimeout(timer)
  }, [stepIndex])

  return (
    <div
      className="varnation-screen"
      role="img"
      aria-label="Animated mockup of the VAR Nation game disallowing a goal"
    >
      <div key={`${cycle}-${stepIndex}`} className="varnation-step">
        <span className="varnation-icon">{step.icon}</span>
        <p className={`varnation-text${step.tone === 'bad' ? ' is-bad' : ''}`}>{step.text}</p>
        {stepIndex === STEPS.length - 1 && <p className="varnation-reason">{reason}</p>}
      </div>
    </div>
  )
}

export default VarNationDemo

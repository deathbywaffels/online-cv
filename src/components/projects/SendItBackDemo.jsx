import { useEffect, useState } from 'react'

const REASONS = [
  'Plating asymmetry offends the eye.',
  'Sauce drizzle lacks emotional depth.',
  'A crumb fell wrong.',
  "The critic's mood ring turned yellow mid-bite.",
]

const STEPS = [
  { icon: '🍽️', text: 'PLATED!', tone: 'neutral' },
  { icon: '🔍', text: 'CRITIC REVIEW…', tone: 'neutral' },
  { icon: '❌', text: 'SENT BACK', tone: 'bad' },
]

const STEP_DURATION = 1600

function SendItBackDemo() {
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
      className="senditback-screen"
      role="img"
      aria-label="Animated mockup of the Send It Back game rejecting a plated dish"
    >
      <div key={`${cycle}-${stepIndex}`} className="senditback-step">
        <span className="senditback-icon">{step.icon}</span>
        <p className={`senditback-text${step.tone === 'bad' ? ' is-bad' : ''}`}>{step.text}</p>
        {stepIndex === STEPS.length - 1 && <p className="senditback-reason">{reason}</p>}
      </div>
    </div>
  )
}

export default SendItBackDemo

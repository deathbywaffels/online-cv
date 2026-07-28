import { useEffect, useState } from 'react'

const STEPS = [
  {
    icon: '👹',
    text: 'Mobs descend from the top',
  },
  {
    icon: '⚡',
    text: 'Click to fire real, traveling projectiles',
  },
  {
    icon: '⭐',
    text: 'Wave cleared — pick a perk',
    tag: 'Ultimate every 5th wave',
  },
  {
    icon: '💎',
    text: 'Boss down — Blue Essence earned',
    tag: 'Spend it on new staves in the hub',
  },
]

const STEP_DURATION = 1700
const LAST_STEP = STEPS.length - 1

function ArcaneVigilDemo() {
  const [stepIndex, setStepIndex] = useState(0)
  const step = STEPS[stepIndex]

  useEffect(() => {
    const timer = setTimeout(
      () => setStepIndex((i) => (i >= LAST_STEP ? 0 : i + 1)),
      STEP_DURATION,
    )
    return () => clearTimeout(timer)
  }, [stepIndex])

  return (
    <div
      className="av-frame"
      role="img"
      aria-label="Animated mockup of Arcane Vigil's wave-survival loop: mobs descending, clicking to fire, choosing a level-up perk, and earning Blue Essence from a boss"
    >
      <div className="av-screen">
        <div key={stepIndex} className="av-step">
          <span className="av-icon">{step.icon}</span>
          <p className="av-text">{step.text}</p>
          {step.tag && <p className="av-tag">{step.tag}</p>}
        </div>
      </div>
    </div>
  )
}

export default ArcaneVigilDemo

import { useEffect, useState } from 'react'

const STEPS = [
  {
    icon: '📷',
    text: 'Photo of the room',
  },
  {
    icon: '✨',
    text: 'Gemini generates a checklist',
    checklist: ['Wipe counters', 'Mop floor', 'Take out trash'],
  },
  {
    icon: '✅',
    text: 'Verified with a second photo',
    checklist: ['Wipe counters', 'Mop floor', 'Take out trash'],
    checked: true,
  },
]

const STEP_DURATION = 1800
const LAST_STEP = STEPS.length - 1

function GlimmerDemo() {
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
    <div className="glimmer-phone" role="img" aria-label="Animated mockup of the Glimmer app turning a room photo into a cleaning checklist">
      <div className="glimmer-screen">
        <div key={stepIndex} className="glimmer-step">
          <span className="glimmer-icon">{step.icon}</span>
          <p className="glimmer-text">{step.text}</p>
          {step.checklist && (
            <ul className="glimmer-checklist">
              {step.checklist.map((item) => (
                <li key={item} className={step.checked ? 'is-checked' : ''}>
                  <span className="glimmer-check">{step.checked ? '✓' : '○'}</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default GlimmerDemo

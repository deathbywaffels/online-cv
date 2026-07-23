import { profile } from '../data/cv'
import Reveal from './Reveal'

function Summary() {
  return (
    <section id="summary" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">01</span> About
      </Reveal>
      <Reveal as="p" className="summary-text">
        {profile.summary}
      </Reveal>
    </section>
  )
}

export default Summary

import { profile } from '../data/cv'

function Summary() {
  return (
    <section id="summary" className="section">
      <h2 className="section-title">
        <span className="section-index">01</span> About
      </h2>
      <p className="summary-text">{profile.summary}</p>
    </section>
  )
}

export default Summary

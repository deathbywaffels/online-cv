import { achievements } from '../data/cv'
import Reveal from './Reveal'

function Achievements() {
  return (
    <section id="achievements" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">07</span> Achievements
      </Reveal>
      <div className="achievements-grid">
        {achievements.map((item, i) => (
          <Reveal key={item.title} as="article" className="achievement-card" delay={i * 80}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Achievements

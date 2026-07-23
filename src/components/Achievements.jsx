import { achievements } from '../data/cv'

function Achievements() {
  return (
    <section id="achievements" className="section">
      <h2 className="section-title">
        <span className="section-index">05</span> Achievements
      </h2>
      <div className="achievements-grid">
        {achievements.map((item) => (
          <article className="achievement-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Achievements

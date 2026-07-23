import { education } from '../data/cv'
import Reveal from './Reveal'

function Education() {
  return (
    <section id="education" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">05</span> Education
      </Reveal>
      <div className="edu-list">
        {education.map((item, i) => (
          <Reveal key={item.qualification} as="article" className="edu-card" delay={i * 100}>
            <p className="edu-period">{item.period}</p>
            <h3>{item.qualification}</h3>
            <p className="edu-institution">{item.institution}</p>
            <p className="edu-details">{item.details}</p>
            {item.highlights && (
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Education

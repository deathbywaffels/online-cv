import { experience } from '../data/cv'
import Reveal from './Reveal'

function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">05</span> Experience
      </Reveal>
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal
            key={`${job.role}-${job.period}`}
            as="article"
            className="timeline-item"
            delay={i * 100}
          >
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <p className="timeline-period">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="timeline-company">
                {job.company} · {job.location}
              </p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Experience

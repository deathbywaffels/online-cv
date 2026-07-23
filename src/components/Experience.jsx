import { experience } from '../data/cv'

function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">
        <span className="section-index">04</span> Experience
      </h2>
      <div className="timeline">
        {experience.map((job) => (
          <article className="timeline-item" key={`${job.role}-${job.period}`}>
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
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience

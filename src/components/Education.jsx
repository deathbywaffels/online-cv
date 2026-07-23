import { education } from '../data/cv'

function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title">
        <span className="section-index">04</span> Education
      </h2>
      <div className="edu-list">
        {education.map((item) => (
          <article className="edu-card" key={item.qualification}>
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
          </article>
        ))}
      </div>
    </section>
  )
}

export default Education

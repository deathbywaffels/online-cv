import {
  profile,
  skillGroups,
  experience,
  education,
  achievements,
} from '../data/cv'

// Rendered off-screen at all times; CSS (@media print) hides the normal
// site and shows this instead, so "downloading the résumé" always reflects
// exactly what's in cv.js — no separate file to fall out of sync.
function PrintResume() {
  return (
    <div className="print-resume print-only">
      <header className="print-header">
        <h1>{profile.name}</h1>
        <p className="print-title">{profile.title}</p>
        <p className="print-contact">
          {profile.location} · {profile.email} ·{' '}
          {profile.linkedin.replace('https://www.', '')}
        </p>
      </header>

      <section className="print-section">
        <p>{profile.summary}</p>
      </section>

      <section className="print-section">
        <h2>Skills</h2>
        {skillGroups.map((group) => (
          <p key={group.title} className="print-skill-group">
            <strong>{group.title}:</strong> {group.skills.join(', ')}
          </p>
        ))}
      </section>

      <section className="print-section">
        <h2>Experience</h2>
        {experience.map((job) => (
          <div className="print-entry" key={`${job.role}-${job.period}`}>
            <div className="print-entry-head">
              <strong>{job.role}</strong>
              <span>{job.period}</span>
            </div>
            <p className="print-entry-sub">
              {job.company} · {job.location}
            </p>
            <ul>
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="print-section">
        <h2>Education</h2>
        {education.map((item) => (
          <div className="print-entry" key={item.qualification}>
            <div className="print-entry-head">
              <strong>{item.qualification}</strong>
              <span>{item.period}</span>
            </div>
            <p className="print-entry-sub">{item.institution}</p>
            <p>{item.details}</p>
          </div>
        ))}
      </section>

      <section className="print-section">
        <h2>Achievements</h2>
        <ul>
          {achievements.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PrintResume

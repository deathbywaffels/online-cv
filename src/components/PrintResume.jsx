import {
  profile,
  skillGroups,
  projects,
  experience,
  education,
  achievements,
} from '../data/cv'

const ICON_PATHS = {
  mail: 'M3 5.5h18v13H3z M3 5.5l9 7 9-7',
  pin: 'M12 21s7-7.2 7-11.8A7 7 0 1 0 5 9.2C5 13.8 12 21 12 21z M12 11.6a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z',
  link: 'M9.5 14.5a4.6 4.6 0 0 0 6.6 0l1.8-1.8a4.6 4.6 0 0 0-6.5-6.5l-1 1 M14.5 9.5a4.6 4.6 0 0 0-6.6 0l-1.8 1.8a4.6 4.6 0 0 0 6.5 6.5l1-1',
}

function ResumeIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="resume-icon" aria-hidden="true">
      <path
        d={ICON_PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Rendered off-screen at all times; CSS (@media print) hides the normal
// site and shows this instead, so "downloading the résumé" always reflects
// exactly what's in cv.js — no separate file to fall out of sync.
function PrintResume() {
  return (
    <div className="print-resume print-only">
      <header className="resume-head">
        <div className="resume-avatar" aria-hidden="true">MJ</div>
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-role">{profile.title}</p>
        </div>
        <ul className="resume-contact">
          <li><ResumeIcon name="pin" />{profile.location}</li>
          <li><ResumeIcon name="mail" />{profile.email}</li>
          <li><ResumeIcon name="link" /><a href={profile.linkedin}>{profile.linkedin.replace('https://www.', '')}</a></li>
          <li><ResumeIcon name="link" /><a href={profile.siteUrl}>{profile.siteUrl.replace('https://', '').replace(/\/$/, '')}</a></li>
        </ul>
      </header>

      <div className="resume-body">
        <aside className="resume-sidebar">
          <h2>Skills</h2>
          {skillGroups.map((group) => (
            <div key={group.title} className="resume-skill-group">
              <h3>{group.title}</h3>
              <div className="resume-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="resume-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main className="resume-main">
          <p className="resume-summary">{profile.summary}</p>

          <section className="resume-section">
            <h2>Experience</h2>
            {experience.map((job) => (
              <div className="resume-entry" key={`${job.role}-${job.period}`}>
                <div className="resume-entry-head">
                  <strong>{job.role}</strong>
                  <span>{job.period}</span>
                </div>
                <p className="resume-entry-sub">
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

          <section className="resume-section">
            <h2>Projects</h2>
            {projects.filter((project) => project.includeInResume !== false).map((project) => (
              <div className="resume-entry" key={project.title}>
                <div className="resume-entry-head">
                  <strong>{project.title}</strong>
                  <a href={project.github || project.live} className="resume-project-link">
                    {(project.github || project.live)?.replace('https://', '')}
                  </a>
                </div>
                <p>{project.description}</p>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <h2>Education</h2>
            {education.map((item) => (
              <div className="resume-entry" key={item.qualification}>
                <div className="resume-entry-head">
                  <strong>{item.qualification}</strong>
                  <span>{item.period}</span>
                </div>
                <p className="resume-entry-sub">{item.institution}</p>
                <p>{item.details}</p>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <h2>Achievements</h2>
            <ul className="resume-achievements">
              {achievements.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PrintResume

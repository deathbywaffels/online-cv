import { skillGroups } from '../data/cv'

function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">
        <span className="section-index">02</span> Skills
      </h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills

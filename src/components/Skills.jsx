import { skillGroups } from '../data/cv'
import Reveal from './Reveal'

function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">02</span> Skills
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} className="skill-card" delay={i * 80}>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Skills

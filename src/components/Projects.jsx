import { projects } from '../data/cv'
import Reveal from './Reveal'
import DualTrackDemo from './projects/DualTrackDemo'
import GlimmerDemo from './projects/GlimmerDemo'

const DEMOS = {
  dualtrack: DualTrackDemo,
  glimmer: GlimmerDemo,
}

function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal as="h2" className="section-title">
        <span className="section-index">04</span> Projects
      </Reveal>
      <Reveal as="p" className="section-intro">
        Code you can actually read, not just claims on a page.
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, i) => {
          const Demo = DEMOS[project.demo]
          return (
            <Reveal key={project.title} as="article" className="project-card" delay={i * 80}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {Demo && (
                <div className="project-demo">
                  <Demo />
                </div>
              )}
              <div className="project-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.live && (
                  <a
                    className="project-link"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Try it live →
                  </a>
                )}
                {project.github && (
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default Projects

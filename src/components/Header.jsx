import { profile } from '../data/cv'

const navLinks = [
  { href: '#summary', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#achievements', label: 'Achievements' },
]

function Header() {
  return (
    <header className="hero">
      <nav className="nav">
        <span className="nav-brand">MJ</span>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hero-content">
        <p className="eyebrow">Hello, I'm</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-location">
          {profile.location} · {profile.workAuth}
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={profile.resumeUrl} download>
            Download Résumé
          </a>
          <a className="btn btn-outline" href={`mailto:${profile.email}`}>
            Email Me
          </a>
          <a
            className="btn btn-outline"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header

import { profile } from '../data/cv'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span className="footer-sep">·</span>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </p>
      <p className="footer-copy">
        &copy; {year} {profile.name}
      </p>
    </footer>
  )
}

export default Footer

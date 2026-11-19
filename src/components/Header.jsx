// Header provides the brand, navigation, sponsors menu, and repository link for App.jsx pages.
import { useState } from 'react'
import logo from '../assets/images/logo_white.jpg'

function Header() {
  const [sponsorsOpen, setSponsorsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#/" aria-label="AHS Robotics home">
          <img className="brand-logo" src={logo} alt="" />
          <span>AHS Robotics</span>
        </a>
        <nav className="header-links" aria-label="Main navigation">
        <a href="#/about">About Us</a>
        <a href="#/contact">Contact</a>
        <div className={`sponsor-menu${sponsorsOpen ? ' is-open' : ''}`}>
          <button type="button" className="sponsor-toggle" aria-haspopup="true" aria-expanded={sponsorsOpen} onClick={() => setSponsorsOpen((open) => !open)}>
            Sponsors <span className="sponsor-caret" aria-hidden="true" />
          </button>
          {sponsorsOpen && (
            <div className="sponsor-dropdown">
              <a href="#/sponsors" onClick={() => setSponsorsOpen(false)}>View Sponsors</a>
              <a href="#/sponsor-us" onClick={() => setSponsorsOpen(false)}>Sponsor Us</a>
            </div>
          )}
        </div>
        <a className="github-link" href="https://github.com/alhambracs/" target="_blank" rel="noreferrer" aria-label="Open the website repository on GitHub">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.06 3.25 1.55.1-.72.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
        </a>
        </nav>
      </div>
    </header>
  )
}

export default Header

// App handles hash-based pages and assembles the header, carousel, and page content for main.jsx.
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Carousel from './components/Carousel.jsx'
import Calendar from './components/Calendar.jsx'
import AboutSection from './sections/AboutSection.jsx'
import EventsSection from './sections/EventsSection.jsx'
import JoinSection from './sections/JoinSection.jsx'

import teamLogo from './assets/images/logo_no_white.png'
import mascot from './assets/images/bulldog_no_white.png'

import instagram from './assets/images/instagram-icon.png'
import mail from './assets/images/mail-icon.png'
import youtube from './assets/images/youtube-icon.png'
import github from './assets/images/github-icon.png'

import './App.css'

function currentPage() {
  return window.location.hash.replace(/^#\/?/, '').split('/')[0] || 'home'
}

function App() {
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    const updatePage = () => {
      setPage(currentPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  return (
    <>
      <Header />
      <main id="top">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutSection />}
        {page === 'contact' && <ContactPage />}
        {page === 'sponsors' && <SponsorsPage />}
        {page === 'sponsor-us' && <SponsorUsPage />}
        {!['home', 'about', 'contact', 'sponsors', 'sponsor-us'].includes(page) && <HomePage />}
      </main>
    </>
  )
}

function HomePage() {
  return (
    <>
      <div className="home-feature-grid">
        <div className="home-intro">
          <h1>Bionic Bulldogs Robotics</h1>
          <p>We design, build, and program robots for the FIRST Tech Challenge while helping students explore engineering, coding, and teamwork.</p>
          <a className="text-link" href="#/about">Learn about the team <span aria-hidden="true">›</span></a>
        </div>
        <Carousel />
      </div>
      <div className="home-lower-grid">
        <Calendar />
        <div className="home-old-sections">
          <EventsSection />
          <JoinSection />
        </div>
      </div>
    </>
  )
}

function ContactPage() {
  const contactLinks = [
    { type: 'Email', title: 'Contact the team', detail: 'alhambracomputerscience@gmail.com', href: 'mailto:alhambracomputerscience@gmail.com', image: mail, alt: 'mail omg' },
    { type: 'Social', title: 'Instagram', detail: '@ahscompscience', href: 'https://instagram.com/ahscompscience', image: instagram, alt: 'hand drawn instagram logo wow' },
    { type: 'Video', title: 'YouTube', detail: 'Not Yet', href: 'https://youtube.com', image: youtube, alt: 'youtube logo but the link doesnt work!!!' },
    { type: 'Code', title: 'GitHub', detail: 'alhambracs', href: 'https://github.com/alhambracs/', image: github, alt: 'github' },
    { type: '', title: '', detail: '', href: '/', image: teamLogo, alt: '' },
    { type: '', title: '', detail: '', href: '/', image: mascot, alt: 'r' },
  ]

  return (
    <div className="content-page">
      <h1>Contact the team</h1>
      <p>Choose a link below to get in touch, follow the team, or learn more</p>
      <div className="link-card-grid">
        {contactLinks.map((link) => (
          <a className="image-link-card" href={link.href} key={link.title} target="_blank" rel="noreferrer">
            <span className="link-type">{link.type}</span>
            <img src={link.image} alt={link.alt} />
            <strong>{link.title}</strong>
            <span>{link.detail}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function SponsorsPage() {
  const sponsors = [
    { name: 'Sponsor name 1', level: 'Lead sponsor', image: teamLogo },
    { name: 'Sponsor name 2', level: 'Gold sponsor', image: mascot },
    { name: 'Sponsor name 3', level: 'Silver sponsor', image: teamLogo },
    { name: 'Sponsor name 4', level: 'Community partner', image: mascot },
    { name: 'Sponsor name 5', level: 'Community partner', image: teamLogo },
    { name: 'Sponsor name 6', level: 'In-kind supporter', image: mascot },
  ]

  return (
    <div className="content-page">
      <h1>Our sponsors</h1>
      <p>We are grateful to the organizations and people who fund our building and competing.</p>
    
      <div className="sponsor-grid">
        {sponsors.map((sponsor) => (
          <article className="sponsor-card" key={sponsor.name}>
            <div className="sponsor-logo"><img src={sponsor.image} alt={`${sponsor.name} logo placeholder`} /></div>
            <h2>{sponsor.name}</h2>
            <p>{sponsor.level}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function SponsorUsPage() {
  return (
    <section>
      <h1>Sponsor Us</h1>
      <p>As a small Robotics team in an already smaller city, AHS Robotics could always use more funding. Any donation will help! </p>
      <p>Contact us to discuss sponsorship options, as well as benefits of sponsoring us</p>
      <a className="primary-button" href="#/contact">Contact</a>
    </section>
  )
}

export default App

// Carousel displays numbered image slides with timed advancement; add or replace entries in the slides array.
import { useEffect, useState } from 'react'
import mjhs from '../assets/images/carousel/mjhs.jpg'
import us_at_mjhs from '../assets/images/carousel/us_at_mjhs.jpg'
import meeting1 from '../assets/images/carousel/meeting_1.png'

const slides = [
  { image: mjhs, alt: 'Our Trip to Martinez Junior High School (2026)', title: 'Educating younger students', caption: 'We spread the goodwill of STEM through outreach to younger students in our city Martinez!' },
  { image: us_at_mjhs, alt: 'Group photo in front of Martinez Junior High School. From left to right, the order is: Justin Lu (President), Benjamin Collins (President), Luphy Ma (Vice President), and Chandler Kent (Vice President)', title: 'Leadership visit to MJHS!', caption: 'Martinez Junior High is one of many places we visit in Martinez to show off engineering!' },
  { image: meeting1, alt: 'Out first meeting on September 24, 2026', title: 'Impressive interest at Alhambra', caption: 'Alhambra has a wide variety of students who are interested in STEM. We foster this interest by providing opportunities in many different subjects under the STEM umbrella.' },

]

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearTimeout(timer)
  }, [activeSlide])

  function showSlide(index) {
    setActiveSlide((index + slides.length) % slides.length)
  }

  return (
    <section className="carousel" aria-label="Robotics team slideshow" aria-roledescription="carousel">
      <div className="carousel-window">
        <div className="carousel-track">
          {slides.map((slide, index) => (
            <article className={`carousel-slide${index === activeSlide ? ' is-active' : ''}`} key={slide.title} aria-hidden={index !== activeSlide}>
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-caption">
                <span className="slide-number">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
                <h2>{slide.title}</h2>
                <p>{slide.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" className="carousel-arrow" onClick={() => showSlide(activeSlide - 1)} aria-label="Previous slide">‹</button>
        <div className="carousel-pagination" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button type="button" key={slide.title} className={index === activeSlide ? 'slide-dot is-active' : 'slide-dot'} onClick={() => showSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === activeSlide ? 'true' : undefined}>
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <button type="button" className="carousel-arrow" onClick={() => showSlide(activeSlide + 1)} aria-label="Next slide">›</button>
      </div>
    </section>
  )
}

export default Carousel

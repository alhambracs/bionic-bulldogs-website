import { useState } from 'react'
import bulldog from './assets/images/bulldog_no_white.png'

import "./App.css";

function App() {
  return (
    <div>
      <header>
        <h2>AHS Robotics</h2>
        <nav>
          <a href="#about">About</a>
          <a href="#events">Events</a>
          <a href="#join">Join</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Bionic Bulldogs</h1>
          <p>Robotics @ AHS</p>
          <a href="#join">Join Our Club</a>
        </section>

        <section id="about">
          <h2>About Us</h2>
          <p>Placeholder</p>
        </section>

        <section id="events">
          <h2>Upcoming Events</h2>
          <p>Placeholder</p>
        </section>

        <section id="join">
          <h2>Get Involved</h2>
          <p>Placeholder</p>
        </section>
      </main>
    </div>
  );
}

export default App;

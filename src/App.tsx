import "./App.css";

function App() {
  return (
    <main className="backroom">
      <section className="hero">
        <span className="hero__eyebrow">Private, no-pressure seating</span>
        <h1>The Backroom</h1>
        <p>
          A hidden-away space for focused work sessions, soft landing meetings, and
          quiet resets between the city’s rhythms.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary">
            Reserve a table
          </button>
          <button type="button" className="btn btn--ghost">
            Download the menu
          </button>
        </div>
      </section>

      <section className="features">
        <article>
          <h2>Low light, high focus</h2>
          <p>
            Warm lighting, leather banquettes, and soft playlists keep the pace
            calm while you work.
          </p>
        </article>
        <article>
          <h2>All-day service</h2>
          <p>
            Espresso, zero-proof cocktails, and small plates stay within arm’s
            reach every hour.
          </p>
        </article>
        <article>
          <h2>Designed for connection</h2>
          <p>
            Semi-private booths make it easy to meet, brainstorm, or unwind
            without feeling on display.
          </p>
        </article>
      </section>

      <section className="details">
        <div>
          <h2>Hours</h2>
          <p>Daily, 10a–11p</p>
        </div>
        <div>
          <h2>Location</h2>
          <p>1208 4th Ave South, Nashville</p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>hello@backroomnashville.com</p>
        </div>
      </section>
    </main>
  );
}

export default App;
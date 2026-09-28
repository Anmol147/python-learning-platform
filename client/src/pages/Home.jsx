import ProblemList from '../components/ProblemList.jsx'

function Home() {
  return (
    <>
      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-mark">Py</span>
          <span>Python Path</span>
        </a>

        <nav className="nav-links">
          <a href="/problems">Problems</a>
          <a href="#progress">Progress</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">
              YOUR PYTHON LEARNING JOURNEY
            </p>

            <h1>
              Learn Python.
              <br />
              <span>One problem at a time.</span>
            </h1>

            <p className="hero-description">
              Practice Python, get helpful hints, test your solutions,
              and track your progress.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="/problems">
                Start Practicing →
              </a>

              <a className="secondary-button" href="#progress">
                View Progress
              </a>
            </div>
          </div>
        </section>

        <ProblemList />

        <section className="progress-section" id="progress">
          <div>
            <p className="eyebrow">YOUR PROGRESS</p>

            <h2>Keep building your Python skills.</h2>

            <p>
              Your solved problems and learning progress will appear here.
            </p>
          </div>

          <div className="progress-card">
            <div>
              <span>Problems solved</span>
              <strong>0</strong>
            </div>

            <div>
              <span>Current streak</span>
              <strong>0 days</strong>
            </div>

            <div>
              <span>Progress</span>
              <strong>0%</strong>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
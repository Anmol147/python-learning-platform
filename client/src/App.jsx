import { useEffect, useState } from 'react'
import { getApiHealth } from './services/api.js'
import './App.css'

function App() {
  const [health, setHealth] = useState({ status: 'loading', message: '' })

  async function checkApiHealth() {
    try {
      const response = await getApiHealth()
      setHealth({ status: 'connected', message: response.message })
    } catch {
      setHealth({
        status: 'error',
        message: 'Could not reach the API. Check that the server is running.',
      })
    }
  }

  useEffect(() => {
    let isActive = true

    getApiHealth()
      .then((response) => {
        if (isActive) {
          setHealth({ status: 'connected', message: response.message })
        }
      })
      .catch(() => {
        if (isActive) {
          setHealth({
            status: 'error',
            message: 'Could not reach the API. Check that the server is running.',
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Python Path home">
          <span className="brand-mark" aria-hidden="true">Py</span>
          <span>Python Path</span>
        </a>
        <span className="topbar-label">Learning platform</span>
      </header>

      <section className="welcome" aria-labelledby="welcome-title">
        <p className="eyebrow">YOUR LEARNING JOURNEY STARTS HERE</p>
        <h1 id="welcome-title">Learn Python, one problem at a time.</h1>
        <p className="welcome-copy">
          A place to practice, get unstuck, and see how far you have come.
        </p>

        <div className={`health-panel health-panel--${health.status}`} aria-live="polite">
          <span className="health-indicator" aria-hidden="true" />
          <div className="health-copy">
            <p className="health-label">API connection</p>
            <p className="health-message">
              {health.status === 'loading' && 'Checking the server...'}
              {health.status === 'connected' && health.message}
              {health.status === 'error' && health.message}
            </p>
          </div>
          {health.status === 'error' && (
            <button
              className="retry-button"
              onClick={() => {
                setHealth({ status: 'loading', message: '' })
                void checkApiHealth()
              }}
            >
              Try again
            </button>
          )}
        </div>
      </section>

      <footer className="page-footer">
        <span>Built for curious beginners</span>
        <span>Stage 1 · API check</span>
      </footer>
    </main>
  )
}

export default App

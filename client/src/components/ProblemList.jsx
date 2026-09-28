import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProblemList() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await fetch('/api/problems')

        if (!response.ok) {
          throw new Error('Failed to load problems')
        }

        const data = await response.json()

        console.log('API response:', data)

        setProblems(
          Array.isArray(data)
            ? data
            : data.problems || data.data || []
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProblems()
  }, [])

  if (loading) {
    return <p>Loading problems...</p>
  }

  if (error) {
    return <p>Could not load problems: {error}</p>
  }

  return (
    <main>
      <h1>Python Problems</h1>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <div>
          {problems.map((problem) => (
            <div key={problem._id || problem.slug}>
              <h2>{problem.title}</h2>

              <p>{problem.description}</p>

              <Link to={`/problems/${problem.slug}`}>
                Solve Problem →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default ProblemList


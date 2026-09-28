import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function ProblemSolver() {
  const { slug } = useParams()

  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    async function loadProblem() {
      try {
        const response = await fetch(`${API_URL}/problems/${slug}`)

        if (!response.ok) {
          throw new Error('Problem not found')
        }

        const data = await response.json()

        console.log('Problem:', data)

        setProblem(data.data || data.problem || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProblem()
  }, [slug])

  async function runCode() {
    if (!code.trim()) {
      setOutput('Please write some Python code first.')
      return
    }

    setOutput('Running code...')

    try {
      const response = await fetch(`${API_URL}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      })

      const text = await response.text()

      console.log('Status:', response.status)
      console.log('Response:', text)

      if (!text) {
        setOutput(
          `Server returned an empty response. Status: ${response.status}`
        )
        return
      }

      const data = JSON.parse(text)

      if (data.success) {
        setOutput(data.output || 'Code executed successfully.')
      } else {
        setOutput(data.error || data.message || 'Code execution failed.')
      }
    } catch (err) {
      console.error(err)
      setOutput(`Error: ${err.message}`)
    }
  }

  if (loading) {
    return <p>Loading problem...</p>
  }

  if (error) {
    return <p>Could not load problem: {error}</p>
  }

  if (!problem) {
    return <p>Problem not found.</p>
  }

  return (
    <main
      style={{
        padding: '30px',
        maxWidth: '1000px',
        margin: 'auto',
      }}
    >
      <h1>{problem.title}</h1>

      <p>{problem.description}</p>

      <hr />

      <h2>Your Solution</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        rows={15}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: '16px',
          padding: '15px',
          boxSizing: 'border-box',
        }}
      />

      <br />
      <br />

      <button onClick={runCode}>
        Run Code
      </button>

      <button
        onClick={() => setShowHint(!showHint)}
        style={{ marginLeft: '10px' }}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {showHint && (
        <div style={{ marginTop: '20px' }}>
          <h3>💡 Hint</h3>

          {Array.isArray(problem.hints) && problem.hints.length > 0 ? (
            <ul>
              {problem.hints.map((hint, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {typeof hint === 'string'
                    ? hint
                    : hint.text ||
                      hint.content ||
                      JSON.stringify(hint)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hints available for this problem.</p>
          )}
        </div>
      )}

      {output && (
        <div style={{ marginTop: '20px' }}>
          <h3>Output</h3>

          <pre
            style={{
              background: '#f4f4f4',
              padding: '15px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </main>
  )
}

export default ProblemSolve
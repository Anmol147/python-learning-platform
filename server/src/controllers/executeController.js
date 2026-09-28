import { spawn } from 'child_process'

export const executePython = (req, res) => {
  const { code } = req.body

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Python code is required',
    })
  }

  const python = spawn('python', ['-c', code])

  let stdout = ''
  let stderr = ''
  let finished = false

  const timeout = setTimeout(() => {
    if (!finished) {
      python.kill()
      finished = true

      return res.status(408).json({
        success: false,
        message: 'Code execution timed out',
      })
    }
  }, 5000)

  python.stdout.on('data', (data) => {
    stdout += data.toString()

    // Prevent extremely large output
    if (stdout.length > 10000) {
      python.kill()
    }
  })

  python.stderr.on('data', (data) => {
    stderr += data.toString()
  })

  python.on('error', (error) => {
    clearTimeout(timeout)

    if (finished) return

    finished = true

    return res.status(500).json({
      success: false,
      message: 'Could not start Python',
      error: error.message,
    })
  })

  python.on('close', (exitCode) => {
    clearTimeout(timeout)

    if (finished) return

    finished = true

    return res.json({
      success: exitCode === 0,
      output: stdout,
      error: stderr,
      exitCode,
    })
  })
}
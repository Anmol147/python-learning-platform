import express from 'express'

const app = express()
const port = process.env.PORT || 5000

app.get('/api/health', (_request, response) => {
	response.json({
		success: true,
		message: 'API is running',
	})
})

app.listen(port, () => {
	console.log(`API server listening on http://localhost:${port}`)
})

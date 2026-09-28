import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import problemRoutes from './src/routes/problemRoutes.js'
import executeRoutes from './src/routes/executeRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'API is running',
  })
})

app.use('/api/problems', problemRoutes)
app.use('/api/execute', executeRoutes)

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected successfully')

    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

startServer()
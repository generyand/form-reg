import express from 'express'

const app = express()

// Add some basic middleware
app.use(express.json())

// Add a test endpoint
app.get('/api/test', (_, res) => {
  res.json({ message: 'Express server is running' })
})

export { app }

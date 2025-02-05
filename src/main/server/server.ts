import express from 'express'
import { testConnection } from '../lib/db'
import userRoutes from './routes/user.route'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test database connection on server start
testConnection().catch((error) => {
  console.error('Database connection failed:', error)
  process.exit(1)
})

app.get('/', (_req, res) => {
  res.send('Hello World! Testing')
})

app.use('/api/users', userRoutes)

export { app }

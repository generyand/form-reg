import express from 'express'
import { prisma, testConnection } from '../lib/db'

const app = express()

// Add some basic middleware
app.use(express.json())

// Test database connection on server start
testConnection()
  .catch((error) => {
    console.error('Database connection failed:', error)
    process.exit(1)
  })

// Example endpoint using Prisma
app.get('/api/users', async (_, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Example create user endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName
      }

    })
    res.status(201).json(user)
  } catch (error) {
    console.error('Failed to create user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

export { app }

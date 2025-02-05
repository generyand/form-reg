import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'Hello World' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

export default router


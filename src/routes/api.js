import express from 'express'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/auth/check', async (req, res) => {
  const { username } = req.query
  try {
    const exists = await User.find({ username })
    if (exists.length) {
      res.send({ found: true })
    } else {
      res.send({ found: false })
    }
  } catch (error) {
    throw error
  }
})

router.post('/auth/login', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  const token = jwt.sign(
    {
      data: req.body,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    process.env.JWT_SECRET,
  )

  res.send({ token: token })
})

export default router

import { Hono } from 'hono'
import { prisma } from '../db/prisma'

const router = new Hono()

router.get('/users', async (c) => {
  const users = await prisma.user.findMany()
  return c.json(users)
})

router.post('/users', async (c) => {
  const { name, email } = await c.req.json()
  const user = await prisma.user.create({ data: { name, email } })
  return c.json(user)
})

export default router
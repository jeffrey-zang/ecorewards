import express, { type Request, type Response } from 'express'

import { getPointsController } from '@/controllers/points/index.ts'
import { memberAuthMiddleware } from '@/middleware/index.ts'
import { memberIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const balance = await getPointsController(memberId)

    return res.status(200).json({ balance })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as pointsRouter }

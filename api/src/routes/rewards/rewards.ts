import express, { type Response } from 'express'

import { getRewardsController } from '@/controllers/rewards/index.ts'
import { memberAuthMiddleware } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/rewards/getAll', memberAuthMiddleware, async (res: Response) => {
  try {
    const rewards = await getRewardsController()

    return res.status(200).json({ rewards })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as rewardsRouter }

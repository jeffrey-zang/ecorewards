import express, { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userSignupController, userLoginController } from '@/controllers/auth/index.ts'
import { logger } from '@/logger/index.ts'
import { handleError, zodCredentials } from '@/utils/index.ts'

const router = express.Router()

router.post('/user-signup', async (req: Request, res: Response) => {
  try {
    const { email, password, animal } = zodCredentials.extend({
      animal: z.enum(['Turtle', 'Squirrel', 'Bird', 'Wolf', 'Eagle'])
    }).parse(req.body)

    const result = await userSignupController(email, password, animal)

    logger.info(`[/user-signup]: successfully created user with email ${email}`)

    return res.status(201).json(result)
  } catch (error) {
    logger.error(`[/user-signup]: user signup attempt failed`)

    handleError(error as Error, res)
  }
})

router.post('/user-login', async (req: Request, res: Response) => {
  try {
    const { email, password } = zodCredentials.parse(req.body)

    const { token } = await userLoginController(email, password)

    logger.info(`[/user-login]: successfully logged in user with email ${email}`)

    return res.status(200).json({ token })
  } catch (error) {
    logger.error(`[/user-login]: user login attempt failed`)

    handleError(error as Error, res)
  }
})

export { router as userAuthRouter }
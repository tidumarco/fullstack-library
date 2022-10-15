import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { ForbiddenError } from '../helpers/apiError'

type Role = {
  isAdmin: boolean
}

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization
    // console.log('Backend headers:', req.headers.authorization)
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      //   console.log('Backend token:', token)
      const decodedUser = jwt.verify(token, JWT_SECRET) as any

      req.user = decodedUser
      return next()
    }
  } catch (error) {
    throw new ForbiddenError()
  }
}

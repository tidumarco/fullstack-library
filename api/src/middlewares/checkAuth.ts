import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { ForbiddenError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      console.log('🚀 ~ file: checkAuth.ts ~ line 9 ~ token', token)

      const decodedUser = jwt.verify(token, JWT_SECRET)
      console.log(
        '🚀 ~ file: checkAuth.ts ~ line 14 ~ decodedUser',
        decodedUser
      )
      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}

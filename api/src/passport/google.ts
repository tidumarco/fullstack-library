import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/User'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        const email = parsedToken.payload.email
        const userName = parsedToken.payload.name

        let user: any = await User.findOne({
          email: parsedToken.payload.email,
        })

        if (!user) {
          user = new User({
            googleId,
            email,
            isAdmin: email === 'tidumarco@gmail.com',
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
          })
          user.save()
        }
        done(null, user)
        console.log(user)
      } catch (error) {
        done(error)
      }
    }
  )
}

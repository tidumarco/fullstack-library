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
        let user: any = await User.findOne({ email: parsedToken.payload.email })
        if (!user) {
          user = new User({
            email,
            isAdmin: email === 'tidumarco@gmail.com',
          })
          user.save()
        }
        done(null, user)
        console.log('Email', email)
        console.log('Is it Admin?', user.isAdmin)
      } catch (error) {
        done(error)
      }
    }
  )
}

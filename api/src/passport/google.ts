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
      //   console.log('🚀 ~ file: google.ts ~ line 31 ~ parsedToken', parsedToken)
      //   console.log('🚀 ~ file: google.ts ~ line 31 ~ googleId', googleId)

      let user: any = await User.findOne({ email: parsedToken.payload.email })
      if (!user) {
        user = new User({
          email: parsedToken.payload.email,
          isAdmin: false,
        })
        user.save()
      }
      done(null, user)
      return
    }
  )
}

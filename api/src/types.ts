interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}

interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}

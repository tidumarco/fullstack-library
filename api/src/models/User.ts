import mongoose, { Document, Date } from 'mongoose'

export type UserDocument = Document & {
  isAdmin: boolean
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    isAdmin: Boolean,
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDocument>('User', userSchema)

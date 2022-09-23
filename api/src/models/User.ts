import mongoose, { Document, Date } from 'mongoose'

export type UserDocument = Document & {
  isAdmin: boolean
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
  timestamps: {
    createdAt: Date
    updatedAt: Date
  }
}

const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  timestamps: {
    createdAt: '',
    updatedAt: '',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)

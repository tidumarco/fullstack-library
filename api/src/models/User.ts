import mongoose, { Document, Date } from 'mongoose'

export type UserDocument = Document & {
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
})

export default mongoose.model<UserDocument>('User', userSchema)

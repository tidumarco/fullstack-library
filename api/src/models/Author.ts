import mongoose, { Document, Date } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  publishedBooks: string[]
  timestamps: {
    createdAt: Date
    updatedAt: Date
  }
}

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  publishedBooks: [],
  timestamps: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },
})

export default mongoose.model<UserDocument>('User', userSchema)

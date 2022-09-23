import mongoose, { Document, Date } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  publishedBooks: string[]
  timestamps: {
    createdAt: Date
    updatedAt: Date
  }
}

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  publishedBooks: [],
  timestamps: {
    createdAt: '',
    updatedAt: '',
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)

import mongoose, { Document, Date } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  publishedBooks: string[]
}

const authorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    publishedBooks: [],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<AuthorDocument>('Author', authorSchema)

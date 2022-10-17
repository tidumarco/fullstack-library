import mongoose, { Document, Schema } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  publishedBooks: string[]
}

const authorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    publishedBooks: { type: [mongoose.Schema.Types.ObjectId], ref: 'Book' },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<AuthorDocument>('Author', authorSchema)

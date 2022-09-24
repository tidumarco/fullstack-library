import mongoose, { Document, Date } from 'mongoose'

export type BookDocument = Document & {
  ISBN: string
  title: string
  description: string
  publisher: string
  publishedDate: Date
  authors: string[]
  available: boolean
  borrowerId: string[]
  adminId: string[]
}

const bookSchema = new mongoose.Schema(
  {
    ISBN: {
      type: String,
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    publisher: String,
    publishedDate: '',
    authors: [String],
    available: Boolean,
    borrowerId: [String],
    adminId: [String],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<BookDocument>('Book', bookSchema)

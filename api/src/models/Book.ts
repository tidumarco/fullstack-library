import mongoose, { Document, Date } from 'mongoose'

export type BookDocument = Document & {
  ISBN: string
  title: string
  description: string
  publisher: string
  publishedDate: Date
  authors: {}[]
  borrowerId: string[]
  borrowDate: Date
  returnDate: Date
  adminId: string[]
  category: string
  available: boolean
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
    authors: [
      {
        firstName: String,
        lastName: String,
      },
    ],
    available: Boolean,
    borrowerId: [String],
    borrowDate: Date,
    returnDate: Date,
    adminId: [String],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<BookDocument>('Book', bookSchema)

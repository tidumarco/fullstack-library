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
    description: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishedDate: Date,
    authors: [
      {
        firstName: String,
        lastName: String,
      },
    ],
    borrowerId: [
      {
        type: String,
        required: true,
      },
    ],
    borrowDate: Date,
    returnDate: Date,
    adminId: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    available: Boolean,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<BookDocument>('Book', bookSchema)

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
  borrowDate: Date
  returnDate: Date
  adminId: string[]
  timestamps: string
}

const bookSchema = new mongoose.Schema({
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
  borrowDate: {
    type: Date,
    default: () => Date.now(),
  },
  returnDate: {
    type: Date,
    default: () => Date.now(),
  },
  adminId: [String],
  createdAt: {
    type: Date,

    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)

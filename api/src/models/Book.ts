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
  timestamps: {
    createdAt: Date
    updatedAt: Date
  }
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
  borrowDate: '',
  returnDate: '',
  adminId: [String],
  timestamps: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)

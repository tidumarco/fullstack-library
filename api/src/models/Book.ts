import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  ISBN: string
  title: string
  description: string
  publisher: string
  published_date: Date
  author: string[]
  available: boolean
  borrower_id: string[]
  borrow_date: string
  return_date: string
  admin_id: string[]
  edit_date: string
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
  published_date: String,
  author: [String],
  available: Boolean,
  borrower_id: String,
  borrow_date: String,
  return_date: String,
  admin_id: [String],
  edit_date: String,
})

export default mongoose.model<BookDocument>('Book', bookSchema)

import mongoose, { Document, Date } from 'mongoose'

export type BookDocument = Document & {
  //   _id?: mongoose.Schema.Types.ObjectId
  ISBN: string
  title: string
  description: string
  publisher: string
  publishedDate: Date
  authors: string[]
  borrowerId: string[]
  borrowDate: Date
  returnDate: Date
  category: string
  available: boolean
}

const bookSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
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
    authors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Author',
    },
    borrowerId: [
      {
        type: String,
      },
    ],
    borrowDate: Date,
    returnDate: Date,
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

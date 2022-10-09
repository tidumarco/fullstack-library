import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  isAdmin: boolean
  email: string
}

const userSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
    },
    email: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDocument>('User', userSchema)

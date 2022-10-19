import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  //   _id?: string
  isAdmin: boolean
  email: string
  firstName: string
  lastName: string
}

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'User',
    // },
    isAdmin: {
      type: Boolean,
    },
    email: {
      type: String,
      index: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDocument>('User', userSchema)

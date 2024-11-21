import mongoose, { Document, Model, Schema } from 'mongoose';

// Step 1: Define the TypeScript interface for the User document
export interface IUser extends Document<mongoose.Types.ObjectId> {
  email: string;
  password: string;
}

// Step 2: Define the Mongoose Schema
const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// Step 3: Define the User model type
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
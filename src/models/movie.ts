import mongoose, { Document, Model, Schema } from "mongoose";
import User from "./user";

export interface IMovie extends Document<mongoose.Types.ObjectId> {
  posterImage: string;
  title: string;
  releaseYear: number;
  userId: typeof User;
  isDeleted: boolean;
}

const movieSchema: Schema<IMovie> = new Schema(
  {
    posterImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie: Model<IMovie> =
  mongoose.models.Movie || mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;

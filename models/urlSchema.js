import mongoose from "mongoose";

export const urlSchema = mongoose.Schema(
  {
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    originalURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timeStamps: true }
);

export default mongoose.model("URL", urlSchema);

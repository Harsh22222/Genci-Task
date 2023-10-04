import mongoose from "mongoose";
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    score: {
      type: Number,
      required: [true, "Duration is required"],
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Activity", activitySchema);

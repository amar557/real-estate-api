import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      require: true,
      unique: true,
      type: String,
    },
    email: {
      require: true,
      unique: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
    avatar: {
      default:
        "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
      type: String,
    },
  },
  { timestamps: true }
);
const Usermodel = new mongoose.model("user", userSchema);
export default Usermodel;

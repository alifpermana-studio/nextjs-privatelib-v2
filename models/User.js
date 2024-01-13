import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.NEXT_PUBLIC_AUTH_MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    userName: String,
    email: String,
    password: String,
    accountStatus: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
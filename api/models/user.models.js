import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/imgres?q=avata%20pictures%20to%20website&imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fpandavector%2Fpandavector1605%2Fpandavector160500618%2F56794127-boy-avatar-icon-of-vector-illustration-for-web-and-mobile-design.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_56794127_boy-avatar-icon-of-vector-illustration-for-web-and-mobile-design.html&docid=98Ma5PmbqZ28IM&tbnid=nbKXCJ3W9RVjeM&vet=12ahUKEwij6r7m1bWFAxXrxDgGHXoFB8wQM3oECGcQAA..i&w=1300&h=1300&hcb=2&ved=2ahUKEwij6r7m1bWFAxXrxDgGHXoFB8wQM3oECGcQAA",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;

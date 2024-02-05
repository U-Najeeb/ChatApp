import { Schema, mongoose } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select : false
    },
    avatarImage: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)

  next()
})

userSchema.methods.checkCorrectPassword = async function (passwordFromBody , passwordFromDB) {
  return await bcrypt.compare(passwordFromBody, passwordFromDB)
}

const User = mongoose.model("User", userSchema);

export default User;

import { Schema, mongoose } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sender : {
    type : mongoose.Schema.Types.ObjectId, 
    require : true
  }
}, 
{timestamps : true}
);

const Message = mongoose.model("Message", messageSchema)

export default Message;
import Message from "../models/messageModel.js";
import catchAsync from "../utils/catchAsync.js";
const addMessage = catchAsync(async (req, res, next) => {
  const { id, msg } = req.body;
  const sender = req.user._id; 
  const message = await Message.create({
    message: msg,
    users: [id, sender],
    sender: sender,
  });


  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

const getAllMessages = catchAsync (async (req, res, next) => {
    const {id} = req.body
    const message = await Message.find({
        $and: [
            {users : {$elemMatch : {$eq : req.user._id}}},
            {users : {$elemMatch : {$eq : id}}}
        ]
    })
    res.status(200).json({
        message
    })
});

export { addMessage, getAllMessages };

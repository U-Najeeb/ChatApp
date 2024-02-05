import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("email username avatarImage _id");


    res.status(200).json({
        message : "Users Found",
        count : users.length,
        users
    })
});

export { getAllUsers };

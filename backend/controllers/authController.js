import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import {promisify} from "util"
import AppError from "../utils/AppError.js";

const signingFunction = (payload) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET);
};

const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userNameCheck = await User.findOne({ username });

  if (userNameCheck) {
    return res.json({ message: "Username Already Exists" });
  }

  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.json({ message: "User With This Email Already Exists" });
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });

  const token = signingFunction(newUser._id);


  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: false,
  });

  const registeredUser = {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAvatarImage: newUser.isAvatarImage,
    avatarImage: newUser.avatarImage,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
    token
  };

  res.status(201).json({
    message: "Registered Successfully",
    registeredUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password", 401));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return res.json({message : "Email or password incorrect."})
    // return next(new AppError("Email or password incorrect.", 401));
  }
  const token = signingFunction(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: false,
  });
  
  const loggedInUser= {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAvatarImage: user.isAvatarImage,
    avatarImage: user.avatarImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token
  };
  res.status(201).json({
    message: "Logged In Successfully",
    loggedInUser
  });
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please log in first", 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("This user no longer exists", 401));
  } 
  req.user = currentUser
  
  next()
});


export { register, login , protect};

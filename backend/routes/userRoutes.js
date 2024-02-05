import express from "express"
import { getAllUsers } from "../controllers/userController.js";
import {protect} from "../controllers/authController.js"
const userRouter = express.Router();

userRouter.route("/getallusers").get(protect, getAllUsers)

export default userRouter;
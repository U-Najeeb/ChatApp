import express from "express"
import { addMessage, getAllMessages } from "../controllers/messageController.js"
import {protect} from "../controllers/authController.js"

const messageRouter = express.Router()

messageRouter.route("/message").post(protect ,addMessage)
messageRouter.route("/allmessages").post(protect, getAllMessages)
export default messageRouter
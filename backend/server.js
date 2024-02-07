import express from "express";
import { configDotenv } from "dotenv";
import DBConnection from "./config/connectToDB.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

configDotenv();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

DBConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

io.on("connection", (socket) => {
  console.log("A User Connected", socket.id);

  socket.on("send-message", (message) => {

    socket.broadcast.emit("receive-message", {message});
  });
  
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

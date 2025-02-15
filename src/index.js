import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import statusCodes from "http-status-codes";
import { errorHandler } from "./libs/errorhandler.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import { socketHandler } from "./socket/socket.js";
import router from "./auth/google-auth.route.js";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
socketHandler(httpServer)
app.get("/", (req, res) => {
  res.status(statusCodes.OK).json({ message: "Welcome to my app" });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use(router)


app.use(errorHandler);

httpServer.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);
});
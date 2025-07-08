import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { errorHandler } from "./middlewares/errors";
import config from "./config/config";

import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import { userJoin, userSearch } from "./sockets/user";
import { chatList, createGroupChat, createPrivateChat } from "./sockets/chat";
import { messageAck, messageList, postMessage } from "./sockets/message";

const { port, corsOrigin } = config;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);

io.on("connection", (socket) => {
  socket.on("user:join", userJoin({ socket }));
  socket.on("user:search", userSearch({ socket }));

  socket.on("chat:list", chatList({ socket }));
  socket.on("chat:create-private-chat", createPrivateChat({ io, socket }));
  socket.on("chat:create-group-chat", createGroupChat({ io, socket }));

  socket.on("message:list", messageList({ socket }));
  socket.on("message:send", postMessage({ socket }));
  socket.on("message:ack", messageAck({ socket }));
});

app.use(errorHandler);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

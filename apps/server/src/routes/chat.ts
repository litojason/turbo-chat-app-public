import { Router } from "express";

import * as chatController from "../controllers/chat";
import { isAuthenticated } from "../middlewares/authentication";

const chatRouter = Router();

chatRouter.get("/all", chatController.getAllChats);
chatRouter.get("/", isAuthenticated, chatController.getChats);
chatRouter.get(
  "/raw-query",
  isAuthenticated,
  chatController.getChatsWithRawQuery
);
chatRouter.get("/:chatId", isAuthenticated, chatController.getChatById);
chatRouter.delete("/:chatId", isAuthenticated, chatController.deleteChat);

chatRouter.get(
  "/:chatId/messages",
  isAuthenticated,
  chatController.getChatMessages
);
chatRouter.post(
  "/:chatId/messages",
  isAuthenticated,
  chatController.postMessage
);

export default chatRouter;

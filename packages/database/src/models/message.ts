import { z } from "zod";

import { Message } from "../../generated/prisma";
import { userSchema } from "./user";

export const messageSchema = z.object({
  id: z.number(),
  text: z.string().nonempty({ message: "Message is required." }),
  createdAt: z.date(),
  updatedAt: z.date(),
  fromUserId: z.string(),
  chatId: z.string(),
}) satisfies z.Schema<Message>;

export const chatMessageSchema = messageSchema.extend({
  fromUser: userSchema.pick({ id: true, name: true }),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const messagePayloadSchema = messageSchema.pick({
  text: true,
  chatId: true,
  fromUserId: true,
});
export type MessagePayload = z.infer<typeof messagePayloadSchema>;

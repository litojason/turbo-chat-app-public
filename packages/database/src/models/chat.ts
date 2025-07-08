import { z } from "zod";

import { Chat, ChatType } from "../../generated/prisma";
import { chatMessageSchema } from "./message";
import { userSchema } from "./user";

export const chatSchema = z.object({
  id: z.string(),
  name: z.string(),
  chatType: z.enum([ChatType.PRIVATE, ChatType.GROUP]),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.Schema<Chat>;

export const chatListItemSchema = chatSchema.extend({
  clientOffset: z.number().optional().nullable(),
  otherUser: userSchema.pick({ id: true, name: true }).optional(),
  messages: chatMessageSchema
    .pick({ id: true, text: true, fromUser: true, createdAt: true })
    .array(),
});
export type ChatListItem = z.infer<typeof chatListItemSchema>;

export const newChatSchema = chatSchema.pick({ name: true });

export const newPrivateChatSchema = newChatSchema.extend({
  otherUserId: z.string(),
});
export type NewPrivateChatPayload = z.infer<typeof newPrivateChatSchema>;

export const newGroupChatSchema = newChatSchema.extend({
  userIds: z.string().array(),
});
export type NewGroupChatPayload = z.infer<typeof newGroupChatSchema>;

export const memberSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
  about: true,
});
export type Member = z.infer<typeof memberSchema>;

export const chatDetailsSchema = chatSchema.extend({
  users: memberSchema.array(),
});
export type ChatDetails = z.infer<typeof chatDetailsSchema>;

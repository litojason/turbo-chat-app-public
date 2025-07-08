# Socket

List of all available socket events. Current approach is passing userId from payload instead of directly get from session.

Type `Listener` means event is called with socket.on().
Type `Emit` means event is called with socket.emit(), to trigger event listener in web app or other app.

## Events

### Users

| Type       | Event       | Payload      | Return Value                                                              | Description                             |
| ---------- | ----------- | ------------ | ------------------------------------------------------------------------- | --------------------------------------- |
| `Listener` | user:join   | userId       | status                                                                    | User join their room                    |
| `Listener` | user:search | userId, term | status, users: [User](../../../../packages/database/src/models/user.ts)[] | Search available users by passing email |

### Chats

| Type       | Event                     | Payload                                                          | Return Value                                                                      | Description                                           |
| ---------- | ------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `Listener` | chat:list                 | userId                                                           | status, chats: [ChatListItem](../../../../packages/database/src/models/chat.ts)[] | Get all chat list                                     |
| `Listener` | chat:create-private-chat  | userId, name, otherUserId                                        | status, chat: [ChatListItem](../../../../packages/database/src/models/chat.ts)    | Create new private chat                               |
| `Emit`     | chat:private-chat-created | [ChatListItem](../../../../packages/database/src/models/chat.ts) | -                                                                                 | Emit socket in web app after new private chat created |
| `Listener` | chat:create-group-chat    | userId, name, userIds                                            | status, chat: [ChatListItem](../../../../packages/database/src/models/chat.ts)    | Create new group chat                                 |
| `Emit`     | chat:group-chat-created   | [ChatListItem](../../../../packages/database/src/models/chat.ts) | -                                                                                 | Emit socket in web app after new group chat created   |

### Messages

| Type       | Event        | Payload                                                         | Return Value                                                                           | Description                                      |
| ---------- | ------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `Listener` | message:list | chatId                                                          | status, messages: [ChatMessage](../../../../packages/database/src/models/message.ts)[] | Get message list                                 |
| `Listener` | message:send | text, chatId, fromUserId                                        | status, message: [ChatMessage](../../../../packages/database/src/models/message.ts)    | Send new message                                 |
| `Emit`     | message:sent | [ChatMessage](../../../../packages/database/src/models/chat.ts) | -                                                                                      | Emit socket in web app after new message created |
| `Listener` | message:ack  | userId, chatId, messageId                                       | status                                                                                 | Acknowledge (read) message                       |

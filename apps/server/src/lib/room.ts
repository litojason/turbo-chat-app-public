export const userRoom = (chatId: string) => {
  return `user:${chatId}`;
};

export const chatRoom = (chatId: string) => {
  return `chat:${chatId}`;
};

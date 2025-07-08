SELECT
    m.id as messageId,
    m.text as messageText,
    m.createdAt as messageCreatedAt,
    m.fromUserId as messageFromUserId,
    m.chatId as messageChatId,
    u.id as userId,
    u.name as userName
FROM Message m
JOIN User u ON u.id = m.fromUserId
JOIN UserChat uc ON uc.chatId = m.chatId AND uc.userId = ?
WHERE m.chatId = ?
    AND (
        uc.deletedAt IS NULL
        OR uc.deletedAt < m.createdAt
    )
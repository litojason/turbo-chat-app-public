SELECT
    uc.clientOffset,
    uc.deletedAt as userChatDeletedAt,

    c.id as chatId,
    c.name as chatName,
    c.chatType,
    c.createdAt as chatCreatedAt,
    c.updatedAt as chatUpdatedAt,

    m.id as messageId,
    m.text,
    m.createdAt as messageCreatedAt,

    u.id as fromUserId,
    u.name as fromUserName,

    otherU.id as otherUserId,
    otherU.name as otherUserName
FROM UserChat uc

JOIN Chat c ON c.id = uc.chatId

-- Join last message per chat
LEFT JOIN (
    SELECT m1.*
    FROM Message m1
    INNER JOIN (
        SELECT chatId, MAX(createdAt) as maxCreatedAt
        FROM Message
        GROUP BY chatId
    ) m2 ON m1.chatId = m2.chatId AND m1.createdAt = m2.maxCreatedAt
) m ON m.chatId = c.id
-- Remove these lines since visible message will be handled by services
-- AND (
--     uc.deletedAt IS NULL
--     OR uc.deletedAt < m.createdAt
-- )

LEFT JOIN User u ON u.id = m.fromUserId

LEFT JOIN UserChat otherUC 
    ON otherUC.chatId = c.id AND otherUC.userId != ?
LEFT JOIN User otherU ON otherU.id = otherUC.userId

WHERE uc.userId = ?
ORDER BY COALESCE(m.createdAt, c.createdAt) DESC
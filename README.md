# Turbo Chat App (turbo-chat-app)

Chat app built with [Typescript](https://www.typescriptlang.org/), [Turborepo](https://turborepo.com/), [Node JS](https://nodejs.org/en), [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/), [Prisma](https://www.prisma.io/), [Socket.IO](https://socket.io/), [Next Js](https://nextjs.org/), [Shadcn](https://ui.shadcn.com/).

## Documentations

- Database models: [Prisma Schema](./packages/database/prisma/schema.prisma)
- List of available API routes: [CRUD.md](./apps/server/src/docs/CRUD.md)
- List of available Socket events: [SOCKET.md](./apps/server/src/docs/SOCKET.md)

## Additional Dependencies

### Apps (Server and Web)

#### Server:

- [socket.io](https://socket.io/): socket io for server
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): hash password
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): generate token
- [cors](https://www.npmjs.com/package/cors): enable CORS

#### Web:

- [socket.io-client](https://socket.io/docs/v4/client-installation/): socket io for client
- [date-fns](https://date-fns.org/): date utility library

### Packages (Database and UI)

#### Database:

- [Prisma](https://www.prisma.io/): open-source next-generation ORM

#### UI:

- [Shadcn](https://ui.shadcn.com/): UI component library
- [Tailwind](https://tailwindcss.com/): utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/): manage forms
- [zod](https://zod.dev/): validation

## Installation

Currently this project use npm, but might me better to use pnpm instead of npm for turborepo

```bash
git clone https://github.com/litojason/turbo-chat-app-public.git

cd turbo-chat-app-public

npm i
```

## Setup Env

Create new files: `.env`. Please copy example below or refer to `.env.sample` files inside `apps/server`, `apps/web` and `packages/database`.

```bash
# apps/server
PORT=3001
NODE_ENV=development
JWT_SECRET_KEY=jwt-secret-key
CORS_ORIGIN=http://localhost:3000

# apps/web
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_NODE_ENV=development

# packages/database
# Since this repo using mysql, please add credentials
# user, password, host, port, and database name
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

## Setup Prisma

Generate prisma by running

```bash
cd packages/database

# generate generated/prisma
npx prisma generate

# generate sql typings (TypedSQL)
npx prisma generate --sql
```

## Seeders

```bash
cd packages/database

# run seed.ts
npx prisma db seed

# only add dummy users
npm run seed:user
```

## Run

```bash
# Development environment (will run server and web)
npm run dev
```

## Feature Done (But May Need Improvement)

- [Demo 1](https://github.com/litojason/turbo-chat-app-public/issues/1): Create Private Chat
- [Demo 2](https://github.com/litojason/turbo-chat-app-public/issues/2): Create Group Chat
- [Demo 3](https://github.com/litojason/turbo-chat-app-public/issues/3): Delete Chat

1. Login, Register, Edit Profile.
2. Search users to create private or group chat (show max 3 users per search).
3. Create private chat.
4. Chat functionality with socket for private chat.
5. Create group chat.
6. Chat functionality with socket for group chat.
7. Acknowledge message (read message and show unread indicator).
8. Soft delete chat messages (currently delete older messages only without deleting chat list).
   1. Possible alternative: Soft delete chat list so it is not shown on current user chat list. Then show only after creating new private chat or other user has sent new message.

## Possible Improvement

- Handle disconnections.
- Currently to get userId for socket, apps/web will emit socket event with userId as payload which might not be good.
  - Possible idea: Create custom middleware to handle getting userId directly from server, or use [Passport Js](https://www.passportjs.org/) (reference from [official document](https://socket.io/how-to/use-with-passport)).
- Show number of unread messages instead of simple indicator.
- Show if user is typing.
- Show if other user has read current user's messages.
- Change message id type from INT to BIGINT to support larger number of message over time.
- And other possible enhancements.

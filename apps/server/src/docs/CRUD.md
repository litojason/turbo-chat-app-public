# CRUD

List of all available API routes. Authorization with Bearer token.

## Endpoints

### Users

| Method | URL                | Params                |       Token        | Description         |
| ------ | ------------------ | --------------------- | :----------------: | ------------------- |
| `POST` | /v1/users/register | name, email, password |         -          | Register new user   |
| `POST` | /v1/users/login    | email, password       |         -          | Login user          |
| `GET`  | /v1/users/profile  | -                     | :heavy_check_mark: | Get user profile    |
| `PUT`  | /v1/users/profile  | name, about           | :heavy_check_mark: | Update user profile |

## Chats

| Method | URL                         | Params |       Token        | Description                            |
| ------ | --------------------------- | ------ | :----------------: | -------------------------------------- |
| `GET`  | /v1/chats/                  | -      | :heavy_check_mark: | Get chat list for user                 |
| `GET`  | /v1/chats/raw-query         | -      | :heavy_check_mark: | Get chat list for user using raw query |
| `GET`  | /v1/chats/{chatId}          | -      | :heavy_check_mark: | Get chat details by id                 |
| `GET`  | /v1/chats/{chatId}/messages | -      | :heavy_check_mark: | Get chat messages                      |
| `POST` | /v1/chats/{chatId}/messages | text   | :heavy_check_mark: | Send new message                       |

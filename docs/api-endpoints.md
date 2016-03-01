# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`
- `GET /users/show`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

### Lesson
- `GET /lesson/show`
- `GET /lesson/start` **React Component**

### Review
- `GET /review/start` **React Component**

### Last_Reviewed
- `GET /last_review/show`

## JSON API

### Characters

- `GET /api/characters`
  - accepts `lesson_num` query param to list characters by lesson
  - accepts `HSK_lvl` query param to list characters by HSK level
  - accepts `user_id` query param to list characters by ones that the user has learned

### Review

- `GET /api/review`
  - grabs the current users characters to review
- `POST /api/review`

### Last_Reviewed
- `GET /api/last_reviewed`
  - grabs the result of the users last review session

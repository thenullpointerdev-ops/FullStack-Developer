# 🎬 Watchlist & Movie REST API

A production-style RESTful API built with **Node.js, Express.js, and Prisma ORM** for managing movies, user authentication, and personalized watchlists.

The API implements **JWT-based authentication, HTTP-only cookies, Zod request validation, protected CRUD operations, ownership verification, and graceful application shutdown**.

---

## 🚀 Project Overview

This project demonstrates the development of a secure and scalable backend API following common REST API and backend development practices.

Users can:

* Create an account and authenticate securely
* Browse and manage movies
* Create a personalized movie watchlist
* Track movie status such as `PLANNED`, `WATCHING`, `COMPLETED`, or `DROPPED`
* Rate movies from 1–10
* Add personal notes to watchlist items
* Update or remove their own watchlist entries

---

## 🛠️ Tech Stack

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Node.js**    | JavaScript runtime                |
| **Express.js** | REST API framework                |
| **Prisma ORM** | Database access and data modeling |
| **JWT**        | Authentication                    |
| **bcryptjs**   | Password hashing                  |
| **Zod**        | Request validation                |
| **ES Modules** | JavaScript module system          |

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration and login
* Password hashing with `bcryptjs`
* JWT-based authentication
* Supports JWT through:

  * `Authorization: Bearer <token>` header
  * HTTP-only cookies
* Protected routes using authentication middleware
* Logout functionality through cookie clearing

### ✅ Request Validation

Request payloads are validated using **Zod** before reaching the controllers.

Validation includes:

* UUID validation for movie IDs
* Rating validation from **1–10**
* Enum validation for watchlist status
* Optional notes validation
* Required field validation

### 🎬 Movie Management

The API provides CRUD operations for movies:

* Retrieve all movies
* Add new movies
* Update movie information
* Delete movies

### 📑 Personalized Watchlists

Authenticated users can:

* Add movies to their watchlist
* Update watchlist status
* Add or modify ratings
* Add personal notes
* Remove watchlist entries

The API verifies **ownership** before allowing users to update or delete watchlist records.

### 🛡️ Error & Process Handling

The application includes graceful process handling for:

* `unhandledRejection`
* `uncaughtException`
* `SIGTERM`

This helps prevent database connection leaks and allows the application to shut down cleanly.

---

# 📍 API Reference

## 🔐 Authentication Routes

**Base URL:** `/auth`

| Method | Endpoint         | Description                            | Authentication |
| ------ | ---------------- | -------------------------------------- | -------------- |
| `POST` | `/auth/register` | Register a new user and issue JWT      | ❌              |
| `POST` | `/auth/login`    | Authenticate user and issue JWT/cookie | ❌              |
| `POST` | `/auth/logout`   | Clear authentication cookie            | ❌              |

---

## 🎬 Movie Routes

**Base URL:** `/movies`

| Method   | Endpoint      | Description          | Authentication |
| -------- | ------------- | -------------------- | -------------- |
| `GET`    | `/movies`     | Fetch all movies     | ❌              |
| `POST`   | `/movies`     | Add a new movie      | ❌              |
| `PUT`    | `/movies/:id` | Update movie details | ❌              |
| `DELETE` | `/movies/:id` | Delete a movie       | ❌              |

---

## 📑 Watchlist Routes

All watchlist endpoints require a valid JWT.

| Method   | Endpoint         | Description              | Authentication |
| -------- | ---------------- | ------------------------ | -------------- |
| `POST`   | `/watchlist`     | Add a movie to watchlist | ✅              |
| `PUT`    | `/watchlist/:id` | Update watchlist entry   | ✅              |
| `DELETE` | `/watchlist/:id` | Remove watchlist entry   | ✅              |

### Add Movie to Watchlist

`POST /watchlist`

```json
{
  "movieId": "UUID",
  "status": "PLANNED",
  "rating": 8,
  "notes": "Watch this movie this weekend"
}
```

### Update Watchlist Entry

`PUT /watchlist/:id`

```json
{
  "status": "COMPLETED",
  "rating": 9,
  "notes": "Great movie!"
}
```

---

# 📋 Validation Rules

| Field     | Rule                                             |
| --------- | ------------------------------------------------ |
| `movieId` | Must be a valid UUID                             |
| `status`  | `PLANNED`, `WATCHING`, `COMPLETED`, or `DROPPED` |
| `rating`  | Integer between `1` and `10`                     |
| `notes`   | Optional string                                  |

Default watchlist status:

```text
PLANNED
```

---

# 📁 Project Structure

```text
├── config/
│   └── db.js
│
├── controllers/
│   ├── authControllers.js
│   └── watchlistController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── validateRequest.js
│
├── routes/
│   ├── authRoutes.js
│   ├── movieRoutes.js
│   └── watchlistRoutes.js
│
├── validators/
│   └── watchlistValidators.js
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── server.js
├── package.json
└── README.md
```

### Architecture

The project follows a modular backend architecture:

```text
Client
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ├── Authentication
   └── Validation
   │
   ▼
Controllers
   │
   ▼
Prisma ORM
   │
   ▼
Database
```

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_secret_key"
PORT=3000
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Run database migrations

```bash
npx prisma migrate dev
```

## 6. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

---

# 🔑 Authentication

After successful registration or login, the API issues a JWT.

The token can be sent using the `Authorization` header:

```http
Authorization: Bearer <your-jwt-token>
```

The API can also authenticate users through a secure HTTP-only cookie.

Protected routes verify the JWT before allowing access to user-specific resources.

---

# 🧪 API Testing

The API can be tested using tools such as:

* Postman
* Insomnia
* Thunder Client

Recommended testing flow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Create / View Movies
   ↓
Add Movie to Watchlist
   ↓
Update Watchlist
   ↓
Delete Watchlist Item
   ↓
Logout
```

---

# 🔒 Security Practices

This project implements several backend security practices:

* Password hashing using `bcryptjs`
* JWT authentication
* HTTP-only authentication cookies
* Protected routes
* User ownership verification
* Input validation with Zod
* UUID validation
* Rating constraints
* Controlled status values
* Graceful database disconnection

---

# 📌 Future Improvements

Possible future improvements include:

* Pagination and filtering for movies
* Movie search functionality
* Role-based authorization
* API rate limiting
* Automated testing with Jest/Supertest
* Swagger/OpenAPI documentation
* Docker containerization
* CI/CD pipeline
* Refresh token implementation

---

# 👩‍💻 Author

**Leina Elsheiri**

Backend Developer | Node.js | Express.js | Prisma

---

## ⭐ Project Highlights

**Backend technologies demonstrated:**

`Node.js` • `Express.js` • `Prisma` • `JWT` • `bcryptjs` • `Zod` • `REST API` • `Authentication` • `Authorization` • `Database Management`

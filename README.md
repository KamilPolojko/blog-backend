# Blog Application Backend

A high-performance, production-ready backend API for a modern blog application, built with NestJS and TypeScript. This system implements a clean, event-driven architecture using CQRS and features real-time interactions powered by WebSockets and Redis.

## 🚀 Quick Links

- **Production API:** `https://blog-backend-20zl.onrender.com`
- **API Documentation:** `https://blog-backend-20zl.onrender.com/api/docs/client` (Swagger/OpenAPI)
- **Source Code:** https://github.com/KamilPolojko/blog-backend

## ✨ Features

| Feature Area | Technologies & Patterns |
| :--- | :--- |
| 🔐 Authentication | JWT, Passport.js, secure password hashing |
| 📝 Article System | Full CRUD, rich text, categories, publishing workflow |
| 💬 Social Interactions | Comments, nested replies, article & comment likes |
| ⚡ Real-Time Engine | WebSockets for live notifications, comments, and likes |
| 🏗 Architecture | CQRS, Event-Driven Design, Modular Structure |
| 💾 Data & Cache | PostgreSQL with TypeORM, Redis for caching/sessions |
| 🐳 Deployment | Full Docker containerization, Redis & DB included |

## 🛠 Tech Stack

- **Framework:** NestJS with TypeScript
- **Architecture:** CQRS Pattern
- **Database:** PostgreSQL with TypeORM
- **Cache & Sessions:** Redis
- **Real-Time:** WebSockets (for notifications, comments, likes)
- **API Documentation:** Swagger/OpenAPI
- **Containerization:** Docker & Docker Compose
- **Authentication:** JWT, Passport.js
- **Validation:** Class Validator & Class Transformer

## 📁 Project Structure & CQRS

This project uses the Command and Query Responsibility Segregation (CQRS) pattern, which separates read (Queries) and write (Commands) operations for better scalability, performance, and maintainability.

**Project Structure:**

- `db/`                             # Database configuration with migrations
  - `migrations/`                   # All migrations
- `src/`
   - `auth/`                        # Authentication module
   - `user-client/`                 # User management (CQRS)
     - `commands/`                  # e.g., ChangeClientPasswordCommand
     - `queries/`                   # e.g., GetCurrentLoggedClientQuery
     - `entities/`                  # User entity
     - `decorators/`                # Custom decorators (e.g., @User)
     - `types/`                     # TypeScript types
   - `article-client/`              # Core blogging features (CQRS)
     - `commands/`                  # e.g., CreateArticleCommand
     - `queries/`                   # e.g., GetArticlesQuery
     - `entities/`                  # Article entity
     - `types/`                     # TypeScript types
     - `savedArticle/`              # Saved articles sub-module
     - `like/`                      # Article likes sub-module
     - `comment/`                   # Comments sub-module (with nested likes)
   - `notification/`                # Real-time notifications (CQRS)
     - `commands/`                  # e.g., MarkNotificationAsReadCommand
     - `queries/`                   # e.g., GetUserNotificationsQuery
     - `entities/`                  # Notification entity
     - `types/`                     # TypeScript types
   - `node-mailer/`                 # Email module (CQRS)
     - `commands/`                  # e.g., SendVerificationCodeCommand
   - `cloudinary/`                  # Image management module

### CQRS Flow Example: Liking an Article

1.  **Command:** A `LikeArticleCommand` is dispatched.
2.  **Handler:** `LikeArticleHandler` processes the command, updates the database, and publishes an `ArticleLikedEvent`.
3.  **Event:** The `ArticleLikedEventHandler` catches the event and uses the WebSocket gateway to notify connected clients in real-time.
4.  **Query:** A separate `GetArticleLikesQuery` fetches the current like count for reading.

## 🔌 Real-Time Features & Redis

This backend powers live interactions across the platform:

- **Live Comments:** New comments and replies appear instantly for all users on the same article page.
- **Live Likes:** Article and comment likes are updated in real-time without refreshing the page.
- **Notifications:** Instant notifications for various user interactions.

## 📧 Email & Media Services

- **Nodemailer Integration:** Handles transactional emails including welcome emails, notifications, and password resets
- **Cloudinary Integration:** Manages image uploads, storage, optimization, and delivery for article images and user avatars


#### 3. Dodaj sekcję "Security":


## 🔒 Security

- **JWT Authentication:** Secure token-based authentication using Passport.js.
- **Password Hashing:** User passwords are hashed using bcrypt.
- **Input Validation:** All input data is validated using `class-validator` and `class-transformer`.
- **Environment Variables:** Sensitive configuration is stored in environment variables and not committed to the repository.

## ⚙️ Installation & Local Development

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose

### Using Docker (Recommended)

The entire application stack (NestJS app, PostgreSQL, Redis) is containerized for easy setup.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/KamilPolojko/blog-backend.git
    cd blog-backend
    ```
2.  **Environment Configuration**

    Create a `.env` file in the root directory based on the provided `.env.example`.

3.  **Start the services**

    This command will start PostgreSQL, Redis, and your NestJS application with all migrations.
    ```bash
    docker-compose build --no-cache
    docker-compose up
    ```

4.  **But if you want hot-reload in development just shut down blog-backend container (redis and postgres containers should be running) and in CMD enter this command:**
    ```bash
    npm install
    npm run start:dev
    ```

The API will be available at `http://localhost:3000/api/docs/clients`.


## 🚀 Deployment

The application is configured for easy deployment using Docker. The `Dockerfile` and `docker-compose.yml` ensure that the NestJS app, Redis, and PostgreSQL can be deployed consistently across any environment that supports Docker.

The backend is currently deployed on Render.com and uses its built-in capabilities to run the Dockerized services.

## 📚 API Documentation

Once the application is running, access the interactive Swagger documentation at:


`https://blog-backend-20zl.onrender.com/api/docs/client`



Use the production URL when the app is deployed.

The documentation provides a complete list of all endpoints, request/response schemas, and allows you to test API calls directly from the browser.

## 🔒 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_NAME=your_database_name
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER_NAME=your_username
DATABASE_PASSWORD=your_secure_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT - Use a long, randomly generated string in production
JWT_SECRET=your_super_secret_jwt_key_here

# Email (Nodemailer)
MAIL_HOST=smtp.your-email-provider.com
MAIL_SECURE=true
MAIL_SERVICE_MESSAGE_SENDER=your-email@gmail.com
WEBSITE_EMAIL=your-website-email@gmail.com
MAIL_PASSWORD=your_mail_service_message_sender_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application
FRONTEND_WS_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3001
NODE_ENV=development


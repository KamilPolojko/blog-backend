# Blog Application Backend

A high-performance, production-ready backend API for a modern blog application, built with NestJS and TypeScript. This system implements a clean, event-driven architecture using CQRS and features real-time interactions powered by WebSockets and Redis.

## 🚀 Quick Links

- **Production API:** `https://blog-backend-20zl.onrender.com` (Replace with your actual URL)
- **API Documentation:** `https://blog-backend-20zl.onrender.com/api/docs/client` (Swagger/OpenAPI)
- **Source Code:** [GitHub Repository Link]

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

src/

├── auth/ # Authentication module
├── user-client/ # User management
├── article-client/ # Core blogging features
│ ├── commands/ # WRITE operations (e.g., CreateArticleCommand)
│ ├── queries/ # READ operations (e.g., GetArticlesQuery)
│ ├── handlers/ # Command and Query handlers
│ └── events/ # Domain events (e.g., ArticleLikedEvent)
├── notification/ # Real-time notifications
│ └── notification.gateway # WebSocket gateway
└── shared/ # Common utilities


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

## ⚙️ Installation & Local Development

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose

### Using Docker (Recommended)

The entire application stack (NestJS app, PostgreSQL, Redis) is containerized for easy setup.

1.  **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd blog-backend
    ```
2.  **Environment Configuration**

    Create a `.env` file in the root directory based on the provided `.env.example`.

3.  **Start the services**

    This command will start PostgreSQL, Redis, and your NestJS application.
    ```bash
    docker-compose up -d
    ```

4.  **Run database migrations**
    ```bash
    # Access the running app container and run migrations
    docker exec -it <container_name> npm run typeorm migration:run
    ```

The API will be available at `http://localhost:3000`.

### Manual Setup (Without Docker)

1.  **Install dependencies**
    ```bash
    npm install
    ```
2.  **Run Redis with Docker**
    ```bash
    docker run -d --name redis -p 6379:6379 redis:latest
    ```
    Connect using: `redis-cli -h 127.0.0.1 -p 6379`.
3.  **Setup PostgreSQL** and update your `.env` file with the connection details.
4.  **Start the application**
    ```bash
    # Development
    npm run start:dev

    # Production
    npm run build
    npm run start:prod
    ```

## 🚀 Deployment

The application is configured for easy deployment using Docker. The `Dockerfile` and `docker-compose.yml` ensure that the NestJS app, Redis, and PostgreSQL can be deployed consistently across any environment that supports Docker.

The backend is currently deployed on Render.com and uses its built-in capabilities to run the Dockerized services.

## 📚 API Documentation

Once the application is running, access the interactive Swagger documentation at:


http://localhost:3000/api/docs/clients



Use the production URL when the app is deployed.

The documentation provides a complete list of all endpoints, request/response schemas, and allows you to test API calls directly from the browser.

## 🔒 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=blog_db

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Application
PORT=3000
NODE_ENV=development


### Tips for Presenting to Recruiters

- **Preview Your Markdown:** Use a Markdown previewer in your code editor (like the one in VS Code) or a tool like **Markdown Here** to see exactly how it will look :cite[8].
- **Check the Final Render:** Before sending, paste the content into a GitHub `.md` file or a Gist to ensure all tables and code blocks render correctly :cite[1]:cite[5].
- **Keep it Updated:** Remember to replace the placeholder URLs (`https://blog-backend-20zl.onrender.com`) and the `[GitHub Repository Link]` with your actual project links.

This Markdown document is now well-structured and should display beautifully for your recruiters. Powodzenia (Good luck)!
# Real Estate Market API

This is a robust backend API for a real estate marketplace, built with Node.js and Express.js. The application provides a comprehensive set of features for managing properties, user authentication, and property metadata like categories and tags.

## ✨ Features

* **User Management**: Secure user signup and login with JWT-based authentication.
* **Role-Based Access Control**: Differentiates between `user`, `admin`, and `owner-company` roles.
* **Property Listings**: Full CRUD (Create, Read, Update, Delete) functionality for managing real estate properties.
* **Advanced Search**: Search for properties by `type`, `status`, `address`, and `description`.
* **Pagination**: Retrieve property lists with pagination to handle large datasets efficiently.
* **Data Validation**: Ensures data integrity with schema-based validation using the `yup` library.
* **Database Management**: Uses Sequelize ORM with migrations for easy and reliable database schema changes.

---

## 💻 Technology Stack

* **Backend Framework**: Node.js & Express.js
* **Database**: PostgreSQL
* **ORM**: Sequelize
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs
* **Validation**: Yup
* **Fuzzy Search**: Fuse.js

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* PostgreSQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/am17jx/real-estate-market.git](https://github.com/am17jx/real-estate-market.git)
    cd real-estate-market/Real-Estate-Market-main
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add the following variables:

    ```ini
    PORT=5000
    JWT_SECRET=your-secret-key-here
    ```

    You also need to configure your database connection in `db.js`. The current configuration is:
    ```javascript
    const sequelize = new Sequelize('ameer_db', 'postgres', 'newcore', {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false
    });
    ```

4.  **Run database migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5.  **Run database seeders:** (optional)
    ```bash
    npx sequelize-cli db:seed:all
    ```

6.  **Start the server:**
    ```bash
    npm start
    ```

The server will run on the port specified in your `.env` file (default: 5000).

---

## 📖 API Endpoints

### User Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/signup` | `POST` | Creates a new user account. | Public |
| `/api/v1/login` | `POST` | Authenticates a user and returns a JWT. | Public |

### Property Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/property` | `GET` | Retrieves a paginated list of all properties. | All (Public/Auth) |
| `/api/v1/property/search` | `GET` | Searches for properties based on various criteria (`type`, `address`, `status`, `search`). | All (Public/Auth) |
| `/api/v1/property` | `POST` | Creates a new property. | User/Admin |
| `/api/v1/property/:id` | `PATCH` | Updates a specific property by ID. | Owner/Admin |
| `/api/v1/property/:id` | `DELETE` | Deletes a specific property by ID. | Owner/Admin |

### Category Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/category` | `GET` | Retrieves all property categories. | All (Public/Auth) |
| `/api/v1/category` | `POST` | Creates a new category. | User/Admin |
| `/api/v1/category/:id` | `PATCH` | Updates a category by ID. | Admin |
| `/api/v1/category/:id` | `DELETE` | Deletes a category by ID. | Admin |
| `/api/v1/property/category/:id` | `POST` | Assigns a category to a specific property. | Admin |

### Tag Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/tag` | `GET` | Retrieves all tags. | All (Public/Auth) |
| `/api/v1/tag` | `POST` | Creates a new tag. | Admin |
| `/api/v1/tag/:id` | `POST` | Adds a tag to a property. Requires `tag_id` in the request body. | Admin |
| `/api/v1/tag/:id` | `DELETE` | Removes a tag from a property. Requires `tag_id` in the request body. | Admin |

---

## 📊 Database Schema

### `users`

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `name` | `STRING` | `NOT NULL` |
| `email` | `STRING` | `NOT NULL`, `UNIQUE` |
| `password` | `STRING` | `NOT NULL` |
| `role` | `ENUM('user', 'admin', 'owner-company')` | `NOT NULL`, `DEFAULT 'user'` |
| `createdAt` | `DATE` | `NOT NULL` |
| `updatedAt` | `DATE` | `NOT NULL` |

### `Companies`

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `Name` | `STRING` | `NOT NULL` |
| `createdAt` | `DATE` | `NOT NULL` |
| `updatedAt` | `DATE` | `NOT NULL` |

### `categories`

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `name` | `STRING` | `NOT NULL`, `UNIQUE` |
| `createdAt` | `DATE` | |
| `updatedAt` | `DATE` | |

### `tags`

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `Name` | `STRING` | `NOT NULL` |

### `properties`

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `type` | `STRING` | `NOT NULL` |
| `status` | `ENUM('Rent', 'Sell')` | `NOT NULL` |
| `area` | `FLOAT` | `NOT NULL` |
| `address` | `TEXT` | `NOT NULL` |
| `price` | `INTEGER` | `NOT NULL` |
| `description` | `TEXT` | `NULL` |
| `userId` | `INTEGER` | `FOREIGN KEY` references `users(id)`, `CASCADE ON DELETE` |
| `categoryid` | `INTEGER` | `FOREIGN KEY` references `categories(id)`, `NOT NULL`, `CASCADE ON DELETE` |
| `companyid` | `INTEGER` | `FOREIGN KEY` references `Companies(id)`, `NULL`, `CASCADE ON DELETE` |
| `createdAt` | `DATE` | `NOT NULL` |
| `updatedAt` | `DATE` | `NOT NULL` |

### `property_tags` (Join Table)

| Column | Data Type | Constraints |
| :--- | :--- | :--- |
| `tag_id` | `INTEGER` | `PRIMARY KEY`, `FOREIGN KEY` references `tags(id)` |
| `property_id` | `INTEGER` | `PRIMARY KEY`, `FOREIGN KEY` references `properties(id)` |

---

## ⚙️ Environment Variables

The application uses environment variables for configuration. You should create a `.env` file based on the example below:

```ini
NODE_ENV=development
PORT=5000
JWT_SECRET=ameer-ahmed
JWT_EXPIRES_IN=90d

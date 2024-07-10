

```
# To-Do List API

This is a simple To-Do List API with user authentication and task management. The API allows users to register, login, create tasks, update tasks, delete tasks, and get a list of tasks.

## Features

- User registration and login with password hashing
- JWT-based authentication
- Create, update, and delete tasks
- Get a list of tasks with optional filtering by status

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js

## Project Structure

```
project-root/
│
├── config/
│   └── todo-config.js
│
├── controllers/
│   └── taskcontroller.js
│
├── models/
│   ├── usermodel.js
│   └── taskmodel.js
│
├── routes/
│   └── todoroutes.js
│
├── app.js
├── .env
└── package.json
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/todo-list-api.git
    cd todo-list-api
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    ```

### Running the Application

Start the server:

```sh
npm start
```

The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints

### User Authentication

- **Register a new user**

    ```sh
    POST /api/register
    ```

    **Request Body:**

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

- **Login a user**

    ```sh
    POST /api/login
    ```

    **Request Body:**

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

- **Logout a user**

    ```sh
    POST /api/logout
    ```

### Task Management

- **Create a new task**

    ```sh
    POST /api/createTask
    ```

    **Request Body:**

    ```json
    {
      "task": "Task description",
      "status": "pending",
      "date": "2024-07-10"
    }
    ```

- **Get a list of tasks**

    ```sh
    GET /api/getTasks
    ```

- **Update a task**

    ```sh
    PUT /api/updateTask/:id
    ```

    **Request Body:**

    ```json
    {
      "task": "Updated task description",
      "status": "completed",
      "date": "2024-07-11"
    }
    ```

## Notes

- Ensure that the `token` cookie is sent with requests that require authentication (createTask, updateTask).
- Populate the MongoDB URI in the `.env` file correctly to avoid connection issues.
- Add proper error handling and input validation as needed for production use.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This `README.md` provides an overview of the project, installation instructions, API endpoints, and usage examples. Adjust any paths, endpoint URLs, and instructions based on your specific project structure and requirements.

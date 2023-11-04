# Jobhash: Job Management Web App

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Description

This is a full-stack job management web application built with React for the frontend, Node.js/Express for the backend, and MongoDB for the database. The app allows users to monitor the status of their job applications by scheduling them and provides options to mark them as "Interviewed," "Pending," or "Declined." It's designed to help users stay organized and keep track of their job search progress.

## Features

- **User Authentication:** User registration and authentication are required to access the web app, ensuring data privacy and security.

- **Job Scheduling:** Users can schedule job applications, providing details such as company name, position, application deadline, and job status.

- **Status Updates:** Users can update the status of each job application, marking them as "Interviewed," "Pending," or "Declined."

- **CRUD Operations:** Users can perform basic CRUD (Create, Read, Update, Delete) operations on their job applications.

- **Security:** Passwords are securely hashed using the `bcryptjs` package to protect user data. Other security measures, such as rate limiting, HTTP headers with `helmet`, and input sanitization with `xss-clean`, are implemented for enhanced security.

- **API Documentation:** API documentation is provided through Swagger using the `swagger-ui-express` package, [check it out](https://jobhash.onrender.com/api-docs/).

## Technologies Used

### Backend

- Node.js/Express.js
- MongoDB
- Mongoose (ODM)
- Bcrypt.js (for password hashing)
- Cors
- Dotenv (for environment variables)
- Express-Async-Errors (for handling asynchronous errors)
- Express Rate Limit (for rate limiting)
- Helmet (for HTTP header security)
- HTTP Status Codes (for standardized status codes)
- JsonWebToken (for user authentication)
- Swagger UI Express (for API documentation)
- XSS-Clean (for input sanitization)
- YAMLjs (for API documentation configuration)

### Frontend

- React [check out the frontend](https://github.com/samojeyinka/Jobhash-frontend)

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your-repo-url.git
   ```

2. Navigate to the project directory:

   ```
   cd project-directory
   ```

3. Install the backend dependencies:

   ```
   cd backend
   npm install
   ```

4. Install the frontend dependencies:

   ```
   cd frontend
   npm install
   ```

5. Create a `.env` file in the `backend` directory and set the required environment variables (e.g., MongoDB URI, JWT secret, etc.).

6. Start the backend server:

   ```
   cd backend
   npm start
   ```

7. Start the frontend development server:

   ```
   cd frontend
   npm start
   ```

## Usage

To use the app, open your web browser and navigate to `http://localhost:3000`. You can create an account or log in to start managing your job applications and tracking their statuses.

## API Endpoints

- **GET /api/v1/jobs:** Get a list of job applications.
- **GET /api/v1/jobs/:id:** Get a specific job application by ID.
- **POST /api/v1/jobs:** Create a new job application.
- **PATCH /api/v1/jobs/:id:** Update a job application by ID.
- **DELETE /api/v1/jobs/:id:** Delete a job application by ID.
- **GET /api/v1/jobs/status-options:** Get status of each job.

- **POST /api/v1/auth/login:** Login route.
- **POST /api/v1/auth/register:** Register route.
- **GET /api/v1/auth/username:** Get user by username.

## Authentication

User authentication is required to access the app. Users need to register for an account, and their passwords are securely hashed using bcrypt.js for data protection.

## Contributing

If you'd like to contribute to this project, feel free to open issues, submit pull requests, or contact the project maintainer for more information.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as long as you include the original copyright notice and disclaimers.

---

Thank you for using our Job Management Web App! We hope this application helps you stay organized in your job search and manage your job applications effectively. If you have any questions or encounter any issues, please don't hesitate to reach out to us. Happy job hunting!

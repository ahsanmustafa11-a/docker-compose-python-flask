# Backend - Library Management System (LMS)

The **Backend** is the application layer of the Library Management System. It processes client requests, implements business logic, and manages communication between the frontend and the MySQL database through RESTful APIs.



## Overview

The backend is developed using Flask and provides secure and efficient CRUD operations for managing library records. It exposes REST APIs that allow the frontend to retrieve, create, update, and delete data while maintaining communication with the MySQL database. The application is containerized using Docker for consistent deployment across different environments.


## Project Structure

```text
backend/
│
├── Dockerfile          # Backend container configuration
├── app.py              # Main Flask application
├── config.py           # Application configuration
├── models.py           # Database models
└── requirements.txt    # Python dependencies
```



## Technologies Used

| Technology      | Description                           |
| --------------- | ------------------------------------- |
| Python          | Primary programming language          |
| Flask           | REST API framework                    |
| Flask-CORS      | Enables cross-origin communication    |
| MySQL Connector | Connects Flask with MySQL             |
| MySQL           | Relational database management system |
| Gunicorn        | Production WSGI application server    |
| Docker          | Containerizes the backend service     |

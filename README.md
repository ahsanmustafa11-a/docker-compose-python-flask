# 📚 Docker Compose LMS project 3 Tier  Python Flask, Mysql & Nginx

A production-style **Library Management System** built using a multi-container Docker architecture. The project demonstrates how to containerize a full-stack web application by integrating a responsive frontend, a Flask REST API backend, a MySQL database, and an Nginx reverse proxy using Docker Compose.

This project is designed to provide hands-on experience with Docker containerization, multi-container communication, reverse proxy configuration, and full-stack application deployment. It serves as a practical learning resource for Docker, Linux, DevOps, and backend development concepts.

---

# 📑 Table of Contents

* Project Overview
* System Architecture
* Project Structure
* Technologies Used
* Features
* Prerequisites
* Getting Started
* Running with Docker Compose
* Running Manually (Amazon Linux 2023)
* Verification Commands
* API Endpoints
* Docker Architecture
* Troubleshooting
* Future Improvements
* Author

---

# 🚀 Project Overview

The Library Management System consists of four independent Docker containers that work together to provide a complete web application.

* **Frontend:** Responsive user interface built with HTML, CSS, and JavaScript.
* **Backend:** Flask REST API responsible for business logic and database operations.
* **Database:** MySQL database for storing books and library records.
* **Reverse Proxy:** Nginx routes client requests to the appropriate service.

Each service runs inside its own container and communicates through a dedicated Docker bridge network, demonstrating a production-style deployment architecture.

---

# 🏗️ System Architecture

```text
                   User Browser
                        │
                        ▼
                Nginx Reverse Proxy
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
   Frontend Container          Backend Container
      (Nginx)                     (Flask API)
                                      │
                                      ▼
                             MySQL Database
```

---

# 📁 Project Structure

```text
library-management-system/
│
├── .env
├── docker-compose.yml
├── README.md
│
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── nginx.conf
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│
├── backend/
│   ├── Dockerfile
│   ├── README.md
│   ├── app.py
│   └── requirements.txt
│
├── database/
│   └── init.sql
│
└── nginx/
    ├── Dockerfile
    └── default.conf
```

---

# 🛠️ Technologies Used

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| Docker         | Containerization                  |
| Docker Compose | Multi-container orchestration     |
| Python         | Backend programming language      |
| Flask          | REST API framework                |
| Gunicorn       | Production WSGI server            |
| MySQL          | Relational database               |
| HTML5          | Frontend structure                |
| CSS3           | User interface styling            |
| JavaScript     | Client-side functionality         |
| Nginx          | Static web server & reverse proxy |
| Git            | Version control                   |
| GitHub         | Source code hosting               |

---

# ✨ Features

* Multi-container Docker architecture
* Responsive dashboard interface
* Book management (Create, Read, Update, Delete)
* Real-time search functionality
* RESTful API integration
* MySQL database initialization with sample data
* Nginx reverse proxy configuration
* Docker networking between containers
* Persistent database storage using Docker volumes
* Health check support
* Production-ready Dockerfiles

---

# 📋 Prerequisites

Ensure the following software is installed before running the project:

* Docker Engine
* Docker Compose (or `docker-compose`)
* Git

Verify the installation:

```bash
docker --version
docker-compose --version
git --version
```

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/<your-username>/library-management-system.git
```

Navigate to the project directory:

```bash
cd library-management-system
```

---

# 🐳 Running with Docker Compose

Build all images:

```bash
docker compose build --no-cache
```

If your system uses the standalone Compose binary:

```bash
docker-compose build --no-cache
```

Start all containers:

```bash
docker compose up -d
```

or

```bash
docker-compose up -d
```

Stop all containers:

```bash
docker compose down
```

---

# ☁️ Running Manually (Amazon Linux 2023)

Some Amazon Linux 2023 systems may encounter Docker Compose Buildx compatibility issues.

If `docker compose build` or `docker-compose build` fails, build the images manually.

Build Backend

```bash
docker build -t library-management-system-backend ./backend
```

Build Frontend

```bash
docker build -t library-management-system-frontend ./frontend
```

Build Reverse Proxy

```bash
docker build -t library-management-system-nginx ./nginx
```

Start the containers manually using Docker or use the existing Compose file after building the images successfully.

---

# ✅ Verification Commands

Verify Docker images:

```bash
docker images
```

Verify running containers:

```bash
docker ps
```

Verify Docker network:

```bash
docker network ls
```

Inspect the application network:

```bash
docker network inspect lms-network
```

Verify Docker volumes:

```bash
docker volume ls
```

Check container logs:

```bash
docker logs <container_name>
```

Verify backend API:

```bash
curl http://localhost:5000/books
```

Verify application:

```text
http://localhost
```

---

# 🔌 API Endpoints

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/books`      | Retrieve all books            |
| POST   | `/books`      | Add a new book                |
| PUT    | `/books/{id}` | Update an existing book       |
| DELETE | `/books/{id}` | Delete a book                 |
| GET    | `/stats`      | Retrieve dashboard statistics |
| GET    | `/health`     | Application health check      |

---

# 🐳 Docker Architecture

The application is divided into four independent services.

| Service       | Description                                      |
| ------------- | ------------------------------------------------ |
| Frontend      | Serves the user interface using Nginx            |
| Backend       | Flask REST API handling business logic           |
| MySQL         | Stores application data                          |
| Reverse Proxy | Routes incoming requests to frontend and backend |

Communication between services is handled through a Docker bridge network, while MySQL data is stored in a persistent Docker volume.

---

# ⚠️ Troubleshooting

### Docker Compose not found

Use:

```bash
docker-compose
```

instead of

```bash
docker compose
```

if the Compose plugin is unavailable.

---

### Buildx version error

If you encounter a Buildx compatibility issue on Amazon Linux 2023, build the Docker images manually before starting the application.

---

### Port already in use

Identify the process using the port:

```bash
ss -tulpn
```

Stop the conflicting service or update the port mapping.

---

### Database connection issue

Check the MySQL container status:

```bash
docker ps
```

Review the MySQL logs:

```bash
docker logs lms-mysql
```

---

# 🚀 Future Improvements

* User Authentication
* JWT Authorization
* Role-Based Access Control (RBAC)
* Student Management Module
* Book Issue & Return Workflow
* Book Cover Image Upload
* Pagination & Filtering
* Docker Secrets
* CI/CD with GitHub Actions
* Monitoring with Prometheus & Grafana
* Kubernetes Deployment

---

# 👨‍💻 Author

**Ahsan Mustafa**

**Project:** Library Management System (LMS)

**Architecture:** Docker • Flask • MySQL • Nginx

This project was developed for learning Docker containerization, multi-container application deployment, and full-stack web application architecture.

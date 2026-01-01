# 📚 Mrkuze BookStore - Distributed E-Commerce System

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![Docker](https://img.shields.io/badge/Infrastructure-Docker-2496ED?logo=docker)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange)

**Mrkuze BookStore** is a robust, full-stack e-commerce platform engineered as a **Distributed System**. Originally designed as a monolith, it has been refactored into independent, containerized microservices to ensure scalability, fault tolerance, and separation of concerns.

The system features a secure Admin Dashboard, real-time inventory management, order processing, and a responsive customer interface.

---

## 📖 Table of Contents
- [Architecture Overview](#-architecture-overview)
- [Key Distributed Features](#-key-distributed-features)
- [Technology Stack](#-technology-stack)
- [System Services](#-system-services)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Contributors](#-contributors)

---

## 🏗 Architecture Overview

The system follows a **Microservices Architecture** orchestrated by an **API Gateway**.

1.  **Client Layer:** A React.js Single Page Application (SPA).
2.  **Gateway Layer:** A central entry point (Reverse Proxy) that routes traffic, handles CORS, and implements Rate Limiting.
3.  **Service Layer:** Three independent Node.js services running in separate Docker containers:
    *   **Auth Service:** User identity and JWT management.
    *   **Product Service:** Inventory management (Load Balanced with 3 Replicas).
    *   **Order Service:** Transaction processing and Admin Analytics.
4.  **Data Layer:** A shared MongoDB cluster with logically separated collections for Data Consistency.

---

## 🚀 Key Distributed Features

*   **Containerization:** Fully Dockerized environment using `docker-compose`.
*   **Service Discovery:** Services communicate via internal Docker DNS hostnames (e.g., `http://product-service:5002`).
*   **Load Balancing:** The Product Service is scaled to **3 Replicas**. Traffic is distributed using a **Round-Robin** algorithm.
*   **Inter-Service Communication:** Synchronous HTTP communication (via Axios) allows the Order Service to aggregate data from the Product Service without direct database access.
*   **Fault Tolerance:** The system handles partial failures; if the Product Service is down, the Admin Dashboard gracefully degrades rather than crashing.
*   **Security:** Implements **Rate Limiting** at the Gateway and **Role-Based Access Control (RBAC)** via JWTs across all services.

---

## 🛠 Technology Stack

### Frontend
*   **Framework:** React.js (Vite)
*   **State Management:** Redux Toolkit & RTK Query
*   **Styling:** Tailwind CSS
*   **Auth:** Firebase (Client-Side Google Auth)

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Gateway:** Express-HTTP-Proxy
*   **Security:** Bcrypt, JSON Web Token (JWT), Express-Rate-Limit

### Infrastructure & External
*   **Orchestration:** Docker & Docker Compose
*   **Database:** MongoDB Atlas
*   **Media Storage:** Cloudinary
*   **External APIs:** NewsAPI (Content), Formspree (Email)

---

## 🧩 System Services

| Service Name | Internal Port | Description |
| :--- | :--- | :--- |
| **API Gateway** | `5000` | The single entry point. Routes `/api/auth`, `/api/books`, `/api/orders`. |
| **Auth Service** | `5001` | Handles Admin Registration, Login, and Token Generation. |
| **Product Service** | `5002` | CRUD for Books. Scaled to **3 instances** for high availability. |
| **Order Service** | `5003` | Manages Orders, Status Updates, and Aggregate Statistics. |
| **Frontend** | `5173` | The User Interface served via Vite. |

---

## ✅ Prerequisites

Before running this project, ensure you have the following installed:
*   **Docker Desktop** (Running and updated)
*   **Node.js** (v18 or higher - for local development only)
*   **Git**

---

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/feysel2003/MRKUZE_BOOKSTORE.git
    cd Mrkuze-BookStore
    ```

2.  **Configure Environment Variables**
    This project requires a `.env` file in the root directory.
    
    *   Rename the included `.env.example` to `.env`.
    *   Or create a new `.env` file and add the following keys:

    ```env
    DB_URL=Your_MongoDB_Connection_String
    JWT_SECRET_KEY=Your_Secret_Key
    VITE_NEWS_API_KEY=Your_NewsAPI_Key
    VITE_FORMSPREE_ENDPOINT=Your_Formspree_URL
    ```
    ```

3.  **Build and Run with Docker**
    The entire system can be launched with a single command.
    ```bash
    docker-compose up --build
    ```

    *This will build images for the Gateway, Frontend, and all Microservices, install dependencies, and start the network.*

---

## 🏃 Running the Project

Once the Docker containers are running (you will see "Server listening..." logs):

*   **Access the Application:** Open [http://localhost:5173](http://localhost:5173) in your browser.
*   **API Gateway Health Check:** Open [http://localhost:5000](http://localhost:5000).
*   **Verify Load Balancing:**
    1.  Go to the Admin Dashboard.
    2.  Refresh the page multiple times.
    3.  Check the Terminal Logs. You will see requests being handled by different container IDs (e.g., `product-service-1`, `product-service-2`).

### Creating an Admin User
Since the database is initially empty, you can register an admin manually via Postman or the Registration page (if enabled), or use the backend seed script.

---

## 📂 Project Structure

```text
Mrkuze-BookStore
├── api-gateway/         # Entry point & Reverse Proxy
├── auth-service/        # User Authentication Logic
├── product-service/     # Book Inventory Logic
├── order-service/       # Order Processing & Stats
├── frontend/            # React UI
├── docker-compose.yml   # Orchestration Config
└── .env                 # Central Environment Config

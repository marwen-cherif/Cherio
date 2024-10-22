# Cherio

Cherio is a fullstack medical application built with **Next.js**, designed to streamline appointment scheduling and patient record management for healthcare providers and patients. It leverages **PostgreSQL** for secure and efficient data management. The application is run entirely using **Docker Compose** for easy setup, with everything—database and development server—containerized.

## Features

- **Appointment Scheduling**: Patients can book appointments, and doctors can manage their schedules.
- **Patient Records**: Secure and efficient storage and management of patient medical histories.
- **Automated Notifications**: Notifications and reminders for upcoming appointments.
- **Authentication**: Secure user authentication via JWT.
- **Real-time Updates**: Real-time appointment management and updates.

## Tech Stack

- **Framework**: Next.js (Fullstack React)
- **Database**: PostgreSQL (with Prisma ORM)
- **Containerization**: Docker, Docker Compose
- **Package Manager**: pnpm
- **Port**: 4000 (Development and Production)

## Installation

To run **Cherio** locally using Docker Compose, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/cherio.git
    ```

2. Navigate into the project directory:
    ```bash
    cd cherio
    ```

3. Copy the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```

4. Modify the `.env` file with your own values, particularly the `JWT_SECRET`:
    ```env
    JWT_SECRET=your-jwt-secret
    PORT=4000
    ```

5. Run the development server using Docker Compose:
    ```bash
    pnpm start:dev
    ```

6. Open your browser and visit `http://localhost:4000` to access the app.

### Docker Compose Setup

Cherio uses **Docker Compose** to orchestrate the development environment, which includes:

- A **PostgreSQL** database service.
- The **Next.js** development server.

`pnpm start:dev` uses Docker Compose to:
1. Build the PostgreSQL container.
2. Build and start the Next.js development server.
3. Link both services and expose them via `localhost:4000`.

You don’t need to install PostgreSQL manually—the Docker setup handles everything for you.

## Database Setup

The application uses **Prisma** to manage the database schema. Migrations will be automatically applied when the Docker containers are built. If you need to manually run migrations:

```bash
pnpm prisma-migrate

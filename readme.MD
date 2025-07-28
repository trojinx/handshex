# Handshex

Handshex is a web application for creating, verifying, and tracking informal agreements ("contracts") between users.

## Setup with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system.
- A running MongoDB instance (local or cloud, e.g., MongoDB Atlas).

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/handshex.git
cd handshex
```

### 2. Configure Environment Variables

Copy the sample environment file and edit it:

```sh
cp .env.sample .env
```

Edit `.env` and set:

- `MONGO_CONNECTION_URI` to your MongoDB connection string.
- `PORT` (default: 6969).
- `JWT_SECRET` to a secure random string.

### 3. Build the Docker Image

```sh
docker build -t handshex .
```

### 4. Run the Container

```sh
docker run --env-file .env -p 6969:6969 handshex
```

- The app will be available at [http://localhost:6969](http://localhost:6969).

### 5. Stopping the Container

Press `Ctrl+C` in the terminal running the container, or stop it via Docker Desktop/CLI.

## Notes

- Make sure your MongoDB instance is accessible from the container.
- For production, consider using Docker Compose to manage MongoDB and the app together.

## License

# Santa Chat

This project is test assignment by Kirill Leontiev written on the NestJS framework.

## Requirements

- Node.js >= 16
- npm or Yarn
- Docker and Docker Compose (for Docker setup)

## Cloning and Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/username/repo.git
    cd repo
    ```

2. **Copy the environment file (.env.example) and configure the variables:**

    ```bash
    cp .env.sample .env
    ```

   **Note:** Make sure to set all necessary variables in `.env`, such as database connection parameters.

## Running the Application

### 1. Running without Docker

#### Install dependencies

Install all dependencies:

   ```bash
   npm install
   # or
   yarn install
   
   npm run start:dev
   # or
   yarn start:dev
```
### 1. Running without Docker
```bash
docker-compose up --build
docker-compose down
```

## Run migrations
```
npm run migration:run
# or
yarn migration:run

```
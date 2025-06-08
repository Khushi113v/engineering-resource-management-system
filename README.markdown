# Engineering Resource Management System

## Live Demo

- **GitHub Repository**: https://github.com/Khushi113v/engineering-resource-management-system

## Features

- **Manager Dashboard**: View team utilization chart, engineers, projects, and assignments.
- **Engineer Dashboard**: View and update personal profile (name, skills).
- Role-based authentication (JWT).

## Prerequisites

- Node.js (v18+): nodejs.org
- Git: git-scm.com
- MongoDB Atlas: mongodb.com/cloud/atlas

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Khushi113v/engineering-resource-management-system.git
cd engineering-resource-management-system
```

### Step 2: Set Up MongoDB Atlas

1. Sign up at mongodb.com/cloud/atlas.
2. Create a cluster (free tier).
3. Create a user (e.g., username: `your_username`, password: `your_password`).
4. In Network Access, add your IP address or allow access from your machine.
Get the connection string (e.g., `mongodb+srv://your_username:your_password@cluster0.xxx.mongodb.net/engineeringDB?retryWrites=true&w=majority`) and add it to your `.env` file as `MONGODB_URI`.


### Step 3: Set Up the Backend

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Copy and update the `.env` file:

   ```bash
   cp .env.example .env
   ```

   Edit `server/.env`:

   ```
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=supersecret123
   ```
4. Start the backend:

   ```bash
   node index.js
   ```

### Step 4: Set Up the Frontend

1. In a new terminal, navigate to the root folder:

   ```bash
   cd ..
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend:

   ```bash
   npm run dev -- --port 5173
   ```

### Step 5: Access the App

1. Go to `http://localhost:5173`.
2. Log in as "Manager" or "Engineer".

## Troubleshooting

- **MongoDB Connection Issues**: Verify `MONGO_URI` and network access in MongoDB Atlas.
- **Token Errors**: Clear `localStorage` (Inspect &gt; Application &gt; Local Storage &gt; Delete `token`) and log in again.
- **Port Conflicts**: Use a different port (e.g., `npm run dev -- --port 5178`).

## Contact

For issues, contact me at \[khushiverma3052002@gmail.com\].

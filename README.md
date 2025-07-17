# Synonym Dictionary App

A fullstack application for managing words and their synonyms. Built with **React** on the frontend and **Node.js/Express** on the backend.

---

## Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/loredanadelic/synonym-app.git
cd synonym-app
```

### 2. Start the Backend

```bash
cd backend
yarn install
yarn start
```
The backend will run on http://localhost:3000.


### 2. Start the Frontend

```bash
cd frontend
yarn install
yarn dev
```

The frontend will run on http://localhost:5173.

## Environment Variables

### Backend (`backend/.env`)

```bash
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```bash
VITE_BACKEND_URL=http://localhost:3000
```
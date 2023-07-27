# Music Application - README

The Music Application is a full-stack web-based platform that allows users to discover, listen, and manage their favorite songs and playlists. It provides a user-friendly interface for accessing an extensive collection of songs, creating personalized playlists, and enjoying a seamless music experience.

## Table of Contents

- [Introduction]
- [Features]
- [Technologies Used]
- [Getting Started]
  - [Prerequisites]
  - [Installation]
- [Backend API]
  - [API Endpoints]
  - [Authentication Middleware]
- [Frontend Application]
- [Deployment]
- [Contributing]
- [License]
- [Contact Information]

## Introduction

The Music Application is a feature-rich platform that aims to provide users with an enjoyable and immersive music experience. Users can create accounts, browse through a vast library of songs, create personalized playlists, add songs to their playlists, and even like their favorite songs. The application ensures a responsive design to offer seamless access from various devices.

## Features

- User registration and authentication
- Sort and search for songs 
- Sort and search for playlists
- Create, edit, and delete playlists
- Add and remove songs from playlists
- Like and Dislike songs
- Add liked songs to favorite songs 
- Secure user authentication using JSON Web Tokens (JWT)

## Backend

The backend API is built using Node.js, Express.js, and Sequelize as the ORM for the database. It provides various endpoints to handle user authentication, playlist management, song handling, and liked songs.

### Technologies Used

- Node.js
- Express.js
- Sequelize (with MySQL)
- CORS for handling cross-origin requests
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- winston for logging
- nodemon (devDependency) for auto-reloading during development

### Getting Started

1. Clone the repository:

```bash
git clone [https://github.com/martin-joy/musicApplication.git]
cd music-app-backend
```

2. Install the required dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory of the backend.
   - Add the following variables with appropriate values:

```plaintext
PORT=4003
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=Martin@3
MYSQL_DATABASE=music
JWT_SECRET=your_jwt_secret_key
```

Replace `your_jwt_secret_key` with a secure and unique secret key for your JWT authentication. The `JWT_SECRET` variable is used to sign and verify JSON Web Tokens for user authentication. Ensure that this secret key is kept confidential and not shared publicly.

4. Start the backend server:

```bash
npm start
```

### API Endpoints

The backend API provides the following endpoints:

- `POST /api/user/signIn`: Sign in an existing user with their email and password.
- `POST /api/user/signUp`: Create a new user account with a unique email and password.
- `POST /api/playlist`: Create a new playlist for the authenticated user.
- `GET /api/playlist`: Retrieve all playlists belonging to the authenticated user.
- `PUT /api/playlist`: Update an existing playlist's details (name, description) for the authenticated user.
- `POST /api/songs`: Create a new song entry in the database.
- `GET /api/songs`: Retrieve all songs available in the application.
- `POST /api/songToplaylist`: Add a song to a specific playlist for the authenticated user.
- `PUT /api/songToplaylist`: Update the order or details of a song within a playlist for the authenticated user.
- `POST /api/likedSongs`: Like a song and add it to the list of liked songs for the authenticated user.
- `GET /api/likedSongs`: Retrieve all songs that the authenticated user has liked.

### Authentication Middleware

The application uses JWT (JSON Web Tokens) for user authentication. The `validateToken` middleware is used to verify the user's token and restrict access to protected routes. Unauthorized requests will be rejected with a 401 status code.

## Frontend

The frontend application is built using React.js and uses various libraries like Ant Design and Material-UI for UI components. It provides a user-friendly interface for interacting with the backend API.

### Technologies Used

- React.js
- React Router DOM for client-side routing
- Redux for state management
- Axios for handling API requests
- Ant Design and Material-UI for UI components
- Emotion for styling components

### Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd music-app-frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

4. Open your web browser and go to `http://localhost:3000` to access the application.

## Deployment

The backend and frontend applications can be deployed separately to hosting platforms like mysql workBench. Remember to configure environment variables on the hosting platform as per the ones used in the `.env` files.

# Bookstore UI Service

A React single-page application built with Vite.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)
- The Bookstore backend API, if you want to load books or use authentication and cart features

Check your installed versions:

```cmd
node --version
npm --version
```

## Install dependencies

Run all npm commands from the frontend project directory, not the repository root:

use `npm install` to install dependencies.

## Configure the backend API URL

The app uses `http://localhost:8080/api` by default. If your backend runs at a different URL, create a `.env` file in `BookStoreUIService` and set its API base URL:

```dotenv
VITE_API_BASE_URL=http://localhost:8080/api
```

Replace the value with the base URL for your backend. Restart the development server after changing `.env`. The backend must be running and accessible for API-powered features to work.

## Run the app locally

From `BookStoreUIService`, start the Vite development server:

```cmd
npm run dev
```

Open the URL shown in the terminal. By default, the app is available at:

```text
http://localhost:3000
```

Stop the development server with `Ctrl+C`.

## Run tests and checks

Run the component tests once:

```cmd
npm test -- --run
```

Run ESLint:

```cmd
npm run lint
```

Create a production build:

```cmd
npm run build
```

Preview the production build locally after building:

```cmd
npm run preview
```


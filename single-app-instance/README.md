# React Singleton Instance Demo

This application demonstrates how to ensure only one instance of a React application runs in the browser using the BroadcastChannel API.

## Features

- Ensures only one primary instance of the application runs
- Shows warning message in secondary instances
- Uses BroadcastChannel API for cross-tab communication
- Built with React, TypeScript, and Vite

## How It Works

The application uses a singleton pattern with the BroadcastChannel API to communicate between different browser tabs. When a new instance is opened:

1. It checks if there's already a primary instance running
2. The first instance becomes the primary instance
3. Any subsequent instances show a warning message

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Testing the Singleton Behavior

1. Open the application in your browser
2. Open the same URL in a new tab
3. The first tab will show "This is the primary instance"
4. Any subsequent tabs will show a warning message

## Technical Details

- Uses `BroadcastChannel` API for cross-tab communication
- Implements a singleton service pattern
- Handles cleanup when tabs are closed
- Built with TypeScript for type safety

## Specification: Production-Grade Microfrontend Application

### 1. High-Level Objective

Generate a complete, production-grade application demonstrating a microfrontend architecture. The application will consist of multiple, independent React SPAs (microfrontends) that are loaded and orchestrated by a central container application. Communication between these frontends must be handled via browser custom events. A Node.js server will act as the container and a central hub for providing a shared application context. The entire codebase must use TypeScript.

### 2. Core Technologies & Architectural Principles

*   **Architecture:** Microfrontend
*   **Frontend Framework:** React 18+
*   **Backend Framework:** Node.js with Express
*   **Language:** TypeScript everywhere
*   **Code Organization:** Monorepo (managed by Lerna or Nx) with a feature-based structure.
*   **Communication Pattern:** Browser Custom Events for communication between microfrontends.
*   **Styling:** Use simple CSS files for each component. Do not use CSS-in-JS or complex styling libraries for this implementation.

### 3. Project Structure

Create a monorepo with the following directory structure. Use `yarn workspaces` or `lerna` to manage the packages.

```text
/production-microfrontend-app
|
|-- /packages
|   |
|   |-- /container-app        // The Node.js + Express container
|   |   |-- /src
|   |   |   |-- index.ts      // Main express server logic
|   |   |-- /public
|   |   |   |-- index.html    // The main shell HTML page
|   |   |-- package.json
|   |   |-- tsconfig.json
|   |
|   |-- /microfrontend-product  // React SPA for the product feature
|   |   |-- /src
|   |   |   |-- index.tsx     // React entry point
|   |   |   |-- App.tsx       // Main App component
|   |   |   |-- App.css
|   |   |-- package.json
|   |   |-- tsconfig.json
|   |   |-- vite.config.ts  // Use Vite for development and bundling
|   |
|   |-- /microfrontend-cart     // React SPA for the cart feature
|   |   |-- /src
|   |   |   |-- index.tsx     // React entry point
|   |   |   |-- App.tsx       // Main App component
|   |   |   |-- App.css
|   |   |-- package.json
|   |   |-- tsconfig.json
|   |   |-- vite.config.ts  // Use Vite for development and bundling
|   |
|   |-- /shared-types         // Shared TypeScript interfaces
|   |   |-- /src
|   |   |   |-- index.ts
|   |   |-- package.json
|   |   |-- tsconfig.json
|
|-- lerna.json  (or equivalent monorepo config)
|-- package.json
|-- tsconfig.base.json
```

### 4. Component Specifications

#### 4.1. `shared-types` Package

*   **Purpose:** To provide consistent, shared TypeScript interfaces across all packages to prevent type mismatches.
*   **File:** `packages/shared-types/src/index.ts`
*   **Content:**
    ```typescript
    export interface Product {
      productId: string;
      productName: string;
      price: number;
    }

    export interface CartItem extends Product {
      quantity: number;
    }

    export interface User {
      isLoggedIn: boolean;
      name: string;
    }

    export interface AppContext {
      user: User | null;
    }
    ```

#### 4.2. `container-app` Package (Node.js Hub)

*   **Purpose:**
    1.  Serve the main `index.html` shell.
    2.  Serve the bundled static assets (JS, CSS) for each microfrontend.
    3.  Provide an API endpoint to deliver the shared application context.
*   **Framework:** Express.js
*   **File:** `packages/container-app/src/index.ts`
*   **Logic:**
    *   Create an Express server listening on port `4000`.
    *   Statically serve the `public` directory.
    *   Create static routes `/mf-product` and `/mf-cart` to serve the `dist` directories of the respective microfrontend packages. This allows the container to serve the microfrontend bundles.
    *   Create a `GET /api/context` endpoint. This endpoint should return a JSON object with the `AppContext` shape, for example: `{ user: { isLoggedIn: true, name: 'Jane Doe' } }`.
*   **File:** `packages/container-app/public/index.html`
*   **Content:** This is the shell that will host the microfrontends.
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Microfrontend App</title>
      <link rel="stylesheet" href="/mf-product/assets/index.css">
      <link rel="stylesheet" href="/mf-cart/assets/index.css">
      <style>
        body { font-family: sans-serif; padding: 2em; }
        #root-product, #root-cart { border: 1px solid #ccc; padding: 1em; margin-bottom: 1em; border-radius: 8px; }
      </style>
    </head>
    <body>
      <h1>My Microfrontend Store</h1>
      <div id="root-product"></div>
      <div id="root-cart"></div>

      <!-- Load Microfrontend Bundles -->
      <!-- NOTE: The exact bundle names might differ based on Vite's build output -->
      <script type="module" src="/mf-product/assets/index.js"></script>
      <script type="module" src="/mf-cart/assets/index.js"></script>
    </body>
    </html>
    ```

#### 4.3. `microfrontend-product` Package (React SPA)

*   **Purpose:** To display a list of products and allow a user to add a product to the cart.
*   **Framework:** React with TypeScript. Use Vite for the build tool.
*   **DOM Target:** Mount this application inside the `<div id="root-product"></div>` element in the main `index.html`.
*   **File:** `packages/microfrontend-product/src/App.tsx`
*   **Logic:**
    1.  Create a simple component that displays a product's name, price, and an "Add to Cart" button.
    2.  For this example, hardcode one or two sample products.
    3.  When the "Add to Cart" button is clicked, it must dispatch a `CustomEvent` on the `window` object.
    4.  The event must be named `addToCart`.
    5.  The event's `detail` payload must be an object matching the `Product` interface from `shared-types`.
*   **File:** `packages/microfrontend-product/vite.config.ts`
*   **Configuration:** Ensure the `build.outDir` is set to `dist` and that the base path is configured correctly for serving from a sub-path (`/mf-product`).

#### 4.4. `microfrontend-cart` Package (React SPA)

*   **Purpose:** To display the items that have been added to the shopping cart.
*   **Framework:** React with TypeScript. Use Vite for the build tool.
*   **DOM Target:** Mount this application inside the `<div id="root-cart"></div>` element in the main `index.html`.
*   **File:** `packages/microfrontend-cart/src/App.tsx`
*   **Logic:**
    1.  The component should maintain a state variable for cart items, typed as `CartItem[]`.
    2.  Use a `useEffect` hook to add an event listener to the `window` for the `addToCart` custom event.
    3.  When the event is received, update the component's state by adding the new product from the event's `detail` payload. If the product already exists in the cart, increment its quantity.
    4.  Render the list of items in the cart, showing the product name, price, and quantity.
    5.  Implement a cleanup function in the `useEffect` hook to remove the event listener when the component unmounts.
*   **File:** `packages/microfrontend-cart/vite.config.ts`
*   **Configuration:** Similar to the product microfrontend, configure the build output and base path for serving from `/mf-cart`.

### 5. Communication Protocol (Custom Events)

*   **Event Name:** `addToCart`
*   **Direction:** `microfrontend-product` -> `microfrontend-cart`
*   **Trigger:** User clicks the "Add to Cart" button in the product microfrontend.
*   **Payload (`event.detail`):** An object conforming to the `Product` interface.
    ```typescript
    // Example Payload
    {
      productId: 'prod-001',
      productName: 'Wireless Mouse',
      price: 29.99
    }
    ```

### 6. Development & Execution Instructions

1.  **Setup:**
    *   Initialize `yarn workspaces` or `lerna` in the root directory.
    *   Install all dependencies for all packages using a single `yarn` or `npm install` command from the root.
2.  **Running in Development:**
    *   Concurrently run the `dev` script for all packages. Use a tool like `concurrently`.
    *   The `container-app` should run its server (`ts-node src/index.ts`).
    *   The React microfrontends should run their Vite dev servers.
3.  **Building for Production:**
    *   Each microfrontend package should have a `build` script that executes `vite build`.
    *   The `container-app` should have a `build` script that compiles the TypeScript (`tsc`).
    *   The `container-app` should have a `start` script to run the compiled output from its `dist` folder (`node dist/index.js`).
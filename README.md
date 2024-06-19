# SaasterKit Backend: The Nest.js Boilerplate Kit for SaaS Apps

Welcome to SaasterKit, a comprehensive solution designed to streamline the development process and accelerate the creation of modern web applications. This Nest.js Boilerplate Kit aims to address the common pain point of spending an excessive amount of time on boilerplate code setup by providing a solid foundation with essential features pre-configured, allowing you to **focus on implementing the core business logic quickly and efficiently.**

👀 If you're looking for a **Next.js** Boilerplate kit instead, [check this link](https://saasterkit.vercel.app).

### Features

The following features are available out-of-the-box and ready to use in this Nest.js Boilerplate Kit. The project uses **Nest.js** and **TypeScript**, **Prisma ORM**, **Supabase** and **PostgreSQL** for database management, **Clerk** for authentication, and **Lemon Squeezy** integration for streamlined payment processing.

### Integration With Next.js Boilerplate Kit

SaasterKit is designed specifically as a backend solution using Nest.js. This means it provides a robust foundation for building the server-side logic of your SaaS application. While it functions independently, it can also be integrated with the existing [Next.js boilerplate kit](https://saasterkit.vercel.app) for a complete frontend and backend solution. 

#### Call API Routes from Next.js Frontend:

Within your Next.js components or pages, use the fetch function to make requests to SaasterKit's API backend endpoints:

```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://your-saasterkit-backend-url/todo'); // Replace with your SaasterKit's URL
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // ... render products using the products state
};

export default MyComponent;
```

### Secure Your API with Built-in Clerk Authentication

The code under `todo.module.ts` demonstrates how to leverage Clerk, a pre-configured authentication solution within SaasterKit, to protect routes from unauthorized access. By utilizing `ClerkExpressRequireAuth` middleware, you can enforce authentication for specific routes within your Controller. This middleware throws an error when encountering an unauthenticated request, ensuring only authorized users can interact with protected endpoints. For demonstration purposes, the GET requests for `/todo` and `/todo/:id` are excluded, allowing public access to these endpoints for visualization purposes. You can adjust the excluded routes to fit your specific security requirements.

From the frontend application, use `getToken()` from `auth()` (server-side) or `useAuth()` (client-side) to fetch the user's bearer token. Include this token in the Authorization header (Bearer ${bearerToken}) when making API calls to protected endpoints. This ensures only authorized users can access them. Remember to configure the `ClerkExpressRequireAuth` middleware to exclude specific routes as needed.

You can find more information [here](https://clerk.com/docs/backend-requests/handling/nodejs).

## Full documentation

Find the full documentation [here](https://saasterkit.vercel.app/docs)

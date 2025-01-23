# Blue Berry E-Commerce Web Application

## Overview

This project is an e-commerce web application that allows users to browse, manage products, and handle their cart, wishlist, and reviews. Admins can manage the product catalog, while users can interact with products, add them to their carts, wishlists, and leave reviews. The application is built with Express, MongoDB, and integrates Cloudinary for image storage.

## Features

- **User Authentication and Authorization:**
  - JWT-based authentication for secure login and role-based access.
  - Admins can manage products, while users can add items to their cart and wishlist.
- **Product Management:**
  - Admins can add, update, and delete products.
  - Each product includes information such as name, description, price, weight, and images.
- **Cart and Wishlist:**
  - Users can add and remove products from their cart or wishlist.
  - Users can view their cart and wishlist at any time.
- **Reviews:**

  - Users can leave reviews for products they've added to their cart or wishlist.

- **Cloudinary Integration:**
  - Users can upload product and profile images, which are stored on Cloudinary.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Passport.js
- **Validation:** Zod for schema validation
- **Image Storage:** Cloudinary for storing images
- **Error Handling:** Custom error handling with AppError
- **Middleware:** Custom authentication and authorization middleware
- **Other Libraries:**
  - `mongoose` for MongoDB interactions
  - `multer-storage-cloudinary` for image upload handling
  - `http-status` for standard HTTP status codes

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB instance (either local or using MongoDB Atlas)
- Cloudinary account (for image storage)

### Steps to Install and Run Locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecommerce-project.git
   cd ecommerce-project
   ```

2. **Install dependencies:**
   npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and add the following configuration:
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

4. **Set up environment variables:**
   Run the application:
   npm start

## API Endpoints

**Authentication:**

- POST /api/auth/register: Register a new user (admin or regular user).
- POST /api/auth/login: Login and receive a JWT for authentication.

**Product Management (Admin):**

- POST /api/products/add: Add a new product.
- PUT /api/products/update/:id: Update an existing product.
- DELETE /api/products/delete/:id: Delete a product.

**Orders:**

- POST /api/orders/place: Place an order using items from the cart (User Only).

- GET /api/orders: Retrieve all orders (Admin Only).

- GET /api/orders/:orderId: Retrieve details of a specific order (User/Admin).

- PUT /api/orders/:orderId/status: Update the status of an order (Admin Only).

**Cart & Wishlist (User):**

- POST /api/wishlist/add: Add a product to the wishlist.
- POST /api/wishlist/remove: Remove a product from the -

**wishlist:**

- GET /api/wishlist: Retrieve the user's wishlist.
- POST /api/cart/add: Add a product to the cart.
- POST /api/cart/remove: Remove a product from the cart.
- GET /api/cart: Retrieve the user's cart.
  Reviews
- POST /api/reviews/add: Add a review for a product.

## Common Error Responses

- 400 Bad Request: Missing or invalid parameters.

- 401 Unauthorized: Missing or invalid authentication token.

- 403 Forbidden: User does not have permission for the requested action.

- 404 Not Found: Requested resource not found.

## Acknowledgements

Cloudinary for image storage.
JWT for token-based authentication.
MongoDB for database management.

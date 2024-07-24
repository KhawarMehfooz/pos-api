# POS API

> API developed for the POS project.

## Documentation

The API has endpoints for the following:

- Customers
- Categories
- Products
- Settings
- Transactions

### Categories

- **Get all categories**
  - `GET /categories`
- **Create a new category**
  - `POST /categories`
- **Get a single category by ID**
  - `GET /category/:id`
- **Edit a category by ID**
  - `PUT /category/:id`
- **Delete a category by ID**
  - `DELETE /category/:id`

### Customers

- **Get all customers**
  - `GET /customers`
- **Create a new customer**
  - `POST /customers`
- **Get a single customer by ID**
  - `GET /customer/:id`
- **Edit a customer by ID**
  - `PUT /customer/:id`
- **Delete a customer by ID**
  - `DELETE /customer/:id`

### Products

- **Get all products**
  - `GET /products`
- **Create a new product**
  - `POST /products` (with image upload)
- **Get a product by ID**
  - `GET /product/:id`
- **Get products by category ID**
  - `GET /products/category/:id`
- **Edit a product by ID**
  - `PUT /product/:id` (with image upload)
- **Delete a product by ID**
  - `DELETE /product/:id`

### Settings

- **Create settings**
  - `POST /settings` (with store logo upload)
- **Get settings**
  - `GET /settings`

### Transactions

- **Create a new transaction**
  - `POST /transactions`
- **Get all transactions**
  - `GET /transactions`
- **Get a transaction by ID**
  - `GET /transaction/:id`
- **Get transactions by customer ID**
  - `GET /transaction/customer/:customerId`
- **Delete a transaction by ID**
  - `DELETE /transaction/:id`

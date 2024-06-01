# POS API

> API developed for the POS project.

## API Endpoints

> All API endpoints require a valid token to be passed in the `Authorization` header. The token can be obtained from the [User Auth](https://github.com/KhawarMehfooz/pos-user-auth-api) API.

### For Categories

#### Get All Categories

```http
GET /categories
```

#### Create a New Category

```http
POST /categories
```

| Parameter      | Type     | Description                 |
| :------------- | :------- | :-------------------------- |
| `categoryName` | `string` | **Required**. Category name |

#### Get a Category

```http
GET /category/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category ID |

#### Update a Category

```http
PUT /category/:id
```

| Parameter      | Type     | Description                 |
| :------------- | :------- | :-------------------------- |
| `categoryName` | `string` | **Required**. Category name |

#### Delete a Category

```http
DELETE /category/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category ID |

### For Products

#### Get All Products

```http
GET /products
```

#### Create a New Product

```http
POST /products
```

| Parameter    | Type     | Description                               |
| :----------- | :------- | :---------------------------------------- |
| `name`       | `string` | **Required**. Product name                |
| `price`      | `number` | **Required**. Product price               |
| `quantity`   | `number` | **Required**. Product stock               |
| `category`   | `string` | **Required**. Category ID                 |
| `image`      | `string` | **Required**. Product image               |
| `stockCheck` | `number` | **Required**. Stock check status [0 or 1] |

#### Get a Product

```http
GET /product/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. Product ID |

#### Update a Product

```http
PUT /product/:id
```

| Parameter    | Type     | Description                               |
| :----------- | :------- | :---------------------------------------- |
| `name`       | `string` | **Required**. Product name                |
| `price`      | `number` | **Required**. Product price               |
| `quantity`   | `number` | **Required**. Product stock               |
| `category`   | `string` | **Required**. Category ID                 |
| `image`      | `string` | **Required**. Product image               |
| `stockCheck` | `number` | **Required**. Stock check status [0 or 1] |

#### Delete a Product

```http
DELETE /product/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. Product ID |

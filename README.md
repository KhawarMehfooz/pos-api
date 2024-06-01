# POS API

> API developed for the POS project.

## API Endpoints

> All API endpoints require a valid token to be passed in the `Authorization` header. The token can be obtained from the [User Auth](https://github.com/KhawarMehfooz/pos-user-auth-api) API.

### Get All Categories

```http
GET /categories
```

### Create a New Category

```http
POST /categories
```

| Parameter      | Type     | Description                 |
| :------------- | :------- | :-------------------------- |
| `categoryName` | `string` | **Required**. Category name |

### Get a Category

```http
GET /category/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category ID |

### Update a Category

```http
PUT /category/:id
```

| Parameter      | Type     | Description                 |
| :------------- | :------- | :-------------------------- |
| `categoryName` | `string` | **Required**. Category name |

### Delete a Category

```http
DELETE /category/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category ID |
# Flask Backend API Documentation

## Overview

REST API for Dress Customizer built with Flask, PostgreSQL, and JWT authentication.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### POST `/auth/signup`

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**

```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2025-01-01T12:00:00",
    "updated_at": "2025-01-01T12:00:00"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### POST `/auth/signin`

Authenticate user and get JWT token.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "user": {...},
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### GET `/auth/verify`

Verify JWT token validity. **[Requires JWT]**

**Response (200):**

```json
{
  "valid": true,
  "user": {...}
}
```

### Users

#### GET `/users/profile`

Get current user profile. **[Requires JWT]**

**Response (200):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2025-01-01T12:00:00",
  "updated_at": "2025-01-01T12:00:00"
}
```

#### PUT `/users/profile`

Update user profile. **[Requires JWT]**

**Request:**

```json
{
  "name": "Jane Doe"
}
```

**Response (200):**

```json
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

#### DELETE `/users/delete`

Delete user account and all associated data. **[Requires JWT]**

**Response (200):**

```json
{
  "message": "Account deleted successfully"
}
```

### Designs

#### GET `/designs`

Get all designs for current user. **[Requires JWT]**

**Response (200):**

```json
{
  "designs": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "Evening Gown",
      "prompt": "blue evening gown",
      "color": "#EC4899",
      "pattern": "solid",
      "sleeve_length": 70,
      "neckline": "v-neck",
      "train_length": 50,
      "texture": "satin",
      "texture_intensity": 40,
      "skirt_volume": 60,
      "created_at": "2025-01-01T12:00:00",
      "updated_at": "2025-01-01T12:00:00"
    }
  ]
}
```

#### GET `/designs/<design_id>`

Get specific design. **[Requires JWT]**

**Response (200):**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Evening Gown",
  ...
}
```

#### POST `/designs`

Create new design. **[Requires JWT]**

**Request:**

```json
{
  "name": "Evening Gown",
  "prompt": "blue evening gown with lace",
  "color": "#EC4899",
  "pattern": "solid",
  "sleeve_length": 70,
  "neckline": "v-neck",
  "train_length": 50,
  "texture": "satin",
  "texture_intensity": 40,
  "skirt_volume": 60,
  "svg": "<svg>...</svg>",
  "thumbnail": null
}
```

**Response (201):**

```json
{
  "message": "Design created successfully",
  "design": {...}
}
```

#### PUT `/designs/<design_id>`

Update design. **[Requires JWT]**

**Request:** (any fields to update)

```json
{
  "color": "#0000FF",
  "texture": "silk"
}
```

**Response (200):**

```json
{
  "message": "Design updated successfully",
  "design": {...}
}
```

#### DELETE `/designs/<design_id>`

Delete design. **[Requires JWT]**

**Response (200):**

```json
{
  "message": "Design deleted successfully"
}
```

### Avatars

#### GET `/avatars`

Get user avatar measurements. **[Requires JWT]**

**Response (200):**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "height": 100,
  "width": 100,
  "build": 0,
  "head": 100,
  "created_at": "2025-01-01T12:00:00",
  "updated_at": "2025-01-01T12:00:00"
}
```

#### POST `/avatars`

Create or update avatar measurements. **[Requires JWT]**

**Request:**

```json
{
  "height": 110,
  "width": 105,
  "build": 5,
  "head": 100
}
```

**Response (200/201):**

```json
{
  "message": "Avatar updated successfully",
  "avatar": {...}
}
```

### Health Check

#### GET `/health`

Check API health status.

**Response (200):**

```json
{
  "status": "ok"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common status codes:

- `400` - Bad Request (missing fields, invalid data)
- `401` - Unauthorized (invalid credentials or token)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Internal Server Error

## Rate Limiting

No rate limiting implemented yet. Consider adding for production.

## CORS

CORS is enabled for all origins. For production, update to allow only specific origins.

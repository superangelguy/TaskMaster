# TaskMaster API Documentation

## Base URL
```
https://api.taskmaster.com/v1
```

## Authentication
All API requests require authentication using JWT tokens in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```
Request body:
```json
{
  "email": "string",
  "password": "string",
  "userType": "client|professional",
  "name": "string"
}
```

#### Login
```http
POST /auth/login
```
Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Tasks

#### Create Task
```http
POST /tasks
```
Request body:
```json
{
  "title": "string",
  "description": "string",
  "budget": "number",
  "deadline": "date",
  "category": "string",
  "requirements": "string[]"
}
```

#### Get Tasks
```http
GET /tasks
```
Query parameters:
- `category`: string (optional)
- `minBudget`: number (optional)
- `maxBudget`: number (optional)
- `status`: string (optional)
- `page`: number (optional)
- `limit`: number (optional)

#### Get Task Details
```http
GET /tasks/{taskId}
```

### Profiles

#### Get Profile
```http
GET /profiles/{userId}
```

#### Update Profile
```http
PUT /profiles/{userId}
```
Request body:
```json
{
  "name": "string",
  "bio": "string",
  "skills": "string[]",
  "experience": "string",
  "portfolio": "string[]"
}
```

### Messages

#### Send Message
```http
POST /messages
```
Request body:
```json
{
  "receiverId": "string",
  "content": "string",
  "taskId": "string"
}
```

#### Get Messages
```http
GET /messages
```
Query parameters:
- `taskId`: string (optional)
- `userId`: string (optional)
- `page`: number (optional)
- `limit`: number (optional)

### Payments

#### Create Payment
```http
POST /payments
```
Request body:
```json
{
  "taskId": "string",
  "amount": "number",
  "paymentMethod": "string"
}
```

#### Get Payment Status
```http
GET /payments/{paymentId}
```

### Reviews

#### Create Review
```http
POST /reviews
```
Request body:
```json
{
  "taskId": "string",
  "rating": "number",
  "comment": "string"
}
```

#### Get Reviews
```http
GET /reviews/{userId}
```
Query parameters:
- `page`: number (optional)
- `limit`: number (optional)

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## Pagination
All list endpoints support pagination using `page` and `limit` parameters. Response includes:
```json
{
  "data": [],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "pages": "number"
  }
}
```

## Webhooks
Available webhook events:
- `task.created`
- `task.updated`
- `payment.completed`
- `message.received`
- `review.created`

## Support
For API support, contact:
- Email: api-support@taskmaster.com
- Documentation: https://docs.taskmaster.com/api 
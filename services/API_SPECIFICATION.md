# 🚀 Xinetee Dashboard - API Specification

## 📋 Overview

This document contains the complete API specification for the Xinetee Dashboard application. All endpoints should be implemented on the backend to replace the current mock API implementation.

---

## 🔐 **AUTHENTICATION ENDPOINTS**

### **1. Organization Registration**

- **Endpoint:** `POST /auth/register/organization`
- **Description:** Register a new organization user
- **Request Body:**

```json
{
  "username": "string (required)",
  "organization_name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "wallet_address": "string (optional)",
  "industry": "string (optional)",
  "size": "string (optional)",
  "website": "string (optional, valid URL)"
}
```

- **Response (Success - 201):**

```json
{
  "access_token": "string (JWT token)",
  "token_type": "bearer",
  "user_type": "organization",
  "username": "string"
}
```

- **Response (Error - 400/409):**

```json
{
  "detail": "string (error message)",
  "status_code": "number"
}
```

### **2. Wallet Registration**

- **Endpoint:** `POST /auth/register/wallet`
- **Description:** Register a new user with wallet address
- **Request Body:**

```json
{
  "wallet_address": "string (required, valid ETH address)",
  "user_type": "string (required, default: 'organization')"
}
```

- **Response (Success - 201):**

```json
{
  "access_token": "string (JWT token)",
  "token_type": "bearer",
  "user_type": "string",
  "username": "string (auto-generated)"
}
```

### **3. Form Login**

- **Endpoint:** `POST /auth/login`
- **Description:** Login with username and password
- **Request Body:**

```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

- **Response (Success - 200):**

```json
{
  "access_token": "string (JWT token)",
  "token_type": "bearer",
  "user_type": "string",
  "username": "string",
  "user": {
    "id": "number",
    "username": "string",
    "userType": "string",
    "createdAt": "ISO date string"
  }
}
```

### **4. Wallet Login**

- **Endpoint:** `POST /auth/login/wallet`
- **Description:** Login with wallet address and signature
- **Status:** Frontend mock API working - Backend endpoint needs implementation
- **Note:** Currently handled by frontend mock API, backend endpoint to be implemented
- **Request Body:**

```json
{
  "wallet_address": "string (required, valid ETH address)",
  "signature": "string (required, MetaMask signature)",
  "message": "string (required, original signed message)"
}
```

- **Response (Success - 200):**

```json
{
  "access_token": "string (JWT token)",
  "token_type": "bearer",
  "user_type": "string",
  "username": "string"
}
```

---

## 👥 **USER MANAGEMENT ENDPOINTS**

### **5. Get All Users**

- **Endpoint:** `GET /users`
- **Description:** Get all registered users (admin only)
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success - 200):**

```json
[
  {
    "id": "number",
    "username": "string",
    "userType": "string",
    "createdAt": "ISO date string"
  }
]
```

### **6. Get User by ID**

- **Endpoint:** `GET /users/{id}`
- **Description:** Get specific user by ID
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success - 200):**

```json
{
  "id": "number",
  "username": "string",
  "userType": "string",
  "createdAt": "ISO date string"
}
```

### **7. Get User by Username**

- **Endpoint:** `GET /users/username/{username}`
- **Description:** Get specific user by username
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Same as Get User by ID

### **8. Get User by Wallet**

- **Endpoint:** `GET /users/wallet/{wallet_address}`
- **Description:** Get specific user by wallet address
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Same as Get User by ID

### **9. Get Current User**

- **Endpoint:** `GET /auth/me`
- **Description:** Get current authenticated user's profile
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success - 200):**

```json
{
  "username": "string",
  "user_type": "string",
  "email": "string",
  "organization_name": "string (if organization)",
  "full_name": "string (if individual)",
  "wallet_address": "string (if provided)",
  "industry": "string (if organization)",
  "size": "string (if organization)",
  "website": "string (if organization)"
}
```

---

## 🏗️ **SUPPLY CHAIN ENDPOINTS**

### **10. Add Product**

- **Endpoint:** `POST /supply-chain/products`
- **Description:** Add a new product to the supply chain
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**

```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "category": "string (required)",
  "quantity": "number (required, positive)",
  "unit": "string (required)",
  "price": "number (optional, positive)",
  "manufacturer": "string (required)",
  "batchNumber": "string (required)",
  "productionDate": "ISO date string (required)",
  "expiryDate": "ISO date string (optional)"
}
```

- **Response (Success - 201):**

```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "category": "string",
  "quantity": "number",
  "unit": "string",
  "price": "number",
  "manufacturer": "string",
  "batchNumber": "string",
  "productionDate": "ISO date string",
  "expiryDate": "ISO date string",
  "createdAt": "ISO date string",
  "createdBy": "number (user ID)"
}
```

### **11. Get Products**

- **Endpoint:** `GET /supply-chain/products`
- **Description:** Get all products (with optional filtering)
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `manufacturer` (optional): Filter by manufacturer
  - `page` (optional): Page number for pagination
  - `limit` (optional): Items per page
- **Response (Success - 200):**

```json
{
  "products": [
    {
      "id": "number",
      "name": "string",
      "category": "string",
      "quantity": "number",
      "manufacturer": "string",
      "createdAt": "ISO date string"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### **12. Add Checkpoint**

- **Endpoint:** `POST /supply-chain/checkpoints`
- **Description:** Add a new checkpoint to track product movement
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**

```json
{
  "productId": "number (required)",
  "location": "string (required)",
  "status": "string (required, enum: 'manufactured', 'shipped', 'delivered', 'stored')",
  "notes": "string (optional)",
  "timestamp": "ISO date string (required)",
  "coordinates": {
    "latitude": "number (optional)",
    "longitude": "number (optional)"
  }
}
```

- **Response (Success - 201):**

```json
{
  "id": "number",
  "productId": "number",
  "location": "string",
  "status": "string",
  "notes": "string",
  "timestamp": "ISO date string",
  "coordinates": {
    "latitude": "number",
    "longitude": "number"
  },
  "createdAt": "ISO date string",
  "createdBy": "number (user ID)"
}
```

### **13. Get Product Checkpoints**

- **Endpoint:** `GET /supply-chain/products/{productId}/checkpoints`
- **Description:** Get all checkpoints for a specific product
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success - 200):**

```json
[
  {
    "id": "number",
    "location": "string",
    "status": "string",
    "timestamp": "ISO date string",
    "coordinates": {
      "latitude": "number",
      "longitude": "number"
    }
  }
]
```

---

## 🔧 **UTILITY ENDPOINTS**

### **14. Health Check**

- **Endpoint:** `GET /health`
- **Description:** Check API health status
- **Response (Success - 200):**

```json
{
  "status": "healthy",
  "timestamp": "ISO date string",
  "version": "string"
}
```

### **15. API Statistics**

- **Endpoint:** `GET /stats`
- **Description:** Get API usage statistics
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success - 200):**

```json
{
  "totalUsers": "number",
  "totalProducts": "number",
  "totalCheckpoints": "number",
  "activeUsers": "number",
  "lastUpdated": "ISO date string"
}
```

---

## 🚨 **ERROR RESPONSES**

### **Common Error Codes:**

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource not found
- **409 Conflict:** Resource already exists
- **422 Unprocessable Entity:** Validation errors
- **500 Internal Server Error:** Server error

### **Error Response Format:**

```json
{
  "detail": "string (error message)",
  "status_code": "number",
  "timestamp": "ISO date string",
  "path": "string (request path)"
}
```

---

## 🔒 **AUTHENTICATION & AUTHORIZATION**

### **JWT Token Format:**

- **Header:** `Authorization: Bearer {token}`
- **Token Expiry:** 24 hours (configurable)
- **Refresh Token:** Implement refresh token mechanism

### **Required Headers:**

```http
Content-Type: application/json
Authorization: Bearer {jwt_token}
```

---

## 📊 **DATA MODELS**

### **User Model:**

```json
{
  "id": "number (auto-increment)",
  "username": "string (unique)",
  "email": "string (unique, if provided)",
  "password": "string (hashed)",
  "userType": "string (enum: 'organization')",
  "walletAddress": "string (nullable)",
  "organizationName": "string (nullable)",
  "industry": "string (nullable)",
  "size": "string (nullable)",
  "website": "string (nullable)",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

### **Product Model:**

```json
{
  "id": "number (auto-increment)",
  "name": "string",
  "description": "string (nullable)",
  "category": "string",
  "quantity": "number",
  "unit": "string",
  "price": "number (nullable)",
  "manufacturer": "string",
  "batchNumber": "string",
  "productionDate": "ISO date string",
  "expiryDate": "ISO date string (nullable)",
  "createdBy": "number (user ID)",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

### **Checkpoint Model:**

```json
{
  "id": "number (auto-increment)",
  "productId": "number (foreign key)",
  "location": "string",
  "status": "string",
  "notes": "string (nullable)",
  "timestamp": "ISO date string",
  "coordinates": {
    "latitude": "number (nullable)",
    "longitude": "number (nullable)"
  },
  "createdBy": "number (user ID)",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

---

## 🚀 **IMPLEMENTATION NOTES**

### **Current Implementation Status:**

- ✅ **Organization Registration** - Backend implemented
- ✅ **Wallet Registration** - Backend implemented
- ✅ **Form Login** - Backend implemented
- ✅ **Wallet Login** - Frontend mock API working, Backend needs implementation
- ✅ **User Management** - Backend implemented
- ❌ **Supply Chain Endpoints** - Not implemented yet
- ❌ **Utility Endpoints** - Not implemented yet

### **Database Requirements:**

- **Users Table:** Store user information and authentication
- **Products Table:** Store supply chain products
- **Checkpoints Table:** Store product movement tracking
- **Indexes:** On username, email, walletAddress, productId

### **Security Considerations:**

- **Password Hashing:** Use bcrypt or similar
- **JWT Secret:** Strong, unique secret key
- **Rate Limiting:** Implement API rate limiting
- **Input Validation:** Validate all input data
- **SQL Injection:** Use parameterized queries

### **Performance Considerations:**

- **Pagination:** Implement for large datasets
- **Caching:** Cache frequently accessed data
- **Database Optimization:** Proper indexing
- **Response Compression:** Enable gzip compression

---

## 📝 **TESTING ENDPOINTS**

### **Test Data Endpoints:**

- **Clear Test Data:** `DELETE /test/clear-data`
- **Seed Test Data:** `POST /test/seed-data`
- **Get Test Stats:** `GET /test/stats`

---

**Last Updated:** $(date)
**Version:** 1.0.0
**Status:** Ready for Implementation

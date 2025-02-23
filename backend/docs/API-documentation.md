# 📌 Library Management System API Documentation

## **Base URL:**
```
http://localhost:3000
```

---

## **🔹 Authentication**
All API requests must include an **API Key** in the request headers:
```
x-api-key: your_secure_api_key
```

---

## **📌 Member Routes** (`/member`)

### **🔹 Get All Members**
**GET /member**
#### Request:
```
GET /member
Headers: { x-api-key: your_secure_api_key }
```
#### Response:
```json
[
  {
    "mem_id": 1,
    "mem_name": "John Doe",
    "mem_phone": "9876543210",
    "mem_email": "john.doe@example.com"
  }
]
```

### **🔹 Get Member by ID**
**GET /member/:id**
#### Request:
```
GET /member/1
```
#### Response:
```json
{
  "mem_id": 1,
  "mem_name": "John Doe",
  "mem_phone": "9876543210",
  "mem_email": "john.doe@example.com"
}
```

### **🔹 Create a Member**
**POST /member**
#### Request:
```json
{
  "mem_name": "Alice Brown",
  "mem_phone": "9998887770",
  "mem_email": "alice.brown@example.com"
}
```
#### Response:
```json
{
  "mem_id": 2,
  "mem_name": "Alice Brown",
  "mem_phone": "9998887770",
  "mem_email": "alice.brown@example.com"
}
```

### **🔹 Update Member**
**PUT /member/:id**
#### Request:
```json
{
  "mem_name": "Alice B.",
  "mem_phone": "9998887770",
  "mem_email": "alice.b@example.com"
}
```
#### Response:
```json
{
  "mem_id": 2,
  "mem_name": "Alice B.",
  "mem_phone": "9998887770",
  "mem_email": "alice.b@example.com"
}
```

---

## **📌 Book Routes** (`/book`)

### **🔹 Get All Books**
**GET /book**
#### Response:
```json
[
  {
    "book_id": 1,
    "book_name": "The Great Gatsby",
    "book_cat_id": 1,
    "book_collection_id": 2,
    "book_launch_date": "1925-04-10T00:00:00.000Z",
    "book_publisher": "Charles Scribner's Sons"
  }
]
```

### **🔹 Create a Book**
**POST /book**
#### Request:
```json
{
  "book_name": "1984",
  "book_cat_id": 2,
  "book_collection_id": 1,
  "book_launch_date": "1949-06-08",
  "book_publisher": "Secker & Warburg"
}
```

---

## **📌 Issuance Routes** (`/issuance`)

### **🔹 Get All Issuance Records**
**GET /issuance**
#### Response:
```json
[
  {
    "issuance_id": 1,
    "book_id": 1,
    "issuance_member": 2,
    "issued_by": "Librarian A",
    "issuance_date": "2024-02-22T00:00:00.000Z",
    "target_return_date": "2024-03-01T00:00:00.000Z",
    "issuance_status": "pending"
  }
]
```

### **🔹 Create an Issuance Record**
**POST /issuance**
#### Request:
```json
{
  "book_id": 1,
  "issuance_member": 2,
  "issued_by": "Librarian A",
  "target_return_date": "2024-03-15",
  "issuance_status": "pending"
}
```

---

## **📌 Reports & Custom Queries** (`/reports`)

### **🔹 Get Books Never Borrowed**
**GET /reports/never-borrowed**
#### Response:
```json
[
  {
    "book_name": "1984",
    "book_publisher": "Secker & Warburg"
  }
]
```

### **🔹 Get Outstanding Books**
**GET /reports/outstanding-books**
#### Response:
```json
[
  {
    "Member": "Alice Brown",
    "Book": "1984",
    "issuance_date": "2024-02-10T00:00:00.000Z",
    "target_return_date": "2024-02-20T00:00:00.000Z",
    "Publisher": "Secker & Warburg"
  }
]
```

### **🔹 Get Top 10 Most Borrowed Books**
**GET /reports/top-borrowed-books**
#### Response:
```json
[
  {
    "book_name": "To Kill a Mockingbird",
    "times_borrowed": 25,
    "members_borrowed": 18
  }
]
```

---

### 📌 **Error Responses**
#### **Invalid API Key:**
```json
{
  "error": "Unauthorized: Invalid API Key"
}
```
#### **Resource Not Found:**
```json
{
  "error": "Not Found"
}
```
#### **Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

### 📌 **Notes**
- **All requests require the `x-api-key` header.**
- **Date fields (e.g., `book_launch_date`) use ISO format (`YYYY-MM-DD`).**
- **Reports provide useful analytics based on book issuance.**

This API ensures seamless management of members, books, and issuance records with robust authentication and custom reporting features. 🚀


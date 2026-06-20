# expressBookReviews

## Online Book Review Application

A server-side RESTful application built with **Node.js** and **Express.js** for managing book ratings and reviews. Features JWT and session-based authentication for secure user operations.

## Features

- Retrieve all books available in the bookshop
- Search books by ISBN, Author, or Title
- Retrieve reviews for specific books
- User registration and login
- Add, modify, and delete book reviews (authenticated users only)
- Async/Await and Promise-based operations with Axios
- JWT + Session authentication

## Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- Express Session
- Axios

## Getting Started

### Local Development
```bash
cd final_project
npm install
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |
| GET | `/review/:isbn` | Get book reviews |
| POST | `/register` | Register new user |

### Authenticated Routes (require login)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customer/login` | User login |
| PUT | `/customer/auth/review/:isbn` | Add/modify review |
| DELETE | `/customer/auth/review/:isbn` | Delete review |

### Async Routes (Axios)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/async/books` | Get all books (async) |
| GET | `/async/isbn/:isbn` | Get book by ISBN (promise) |
| GET | `/async/author/:author` | Get books by author (promise) |
| GET | `/async/title/:title` | Get books by title (async) |

## Testing with cURL

```bash
# Task 1: Get all books
curl http://localhost:5000/

# Task 2: Get book by ISBN
curl http://localhost:5000/isbn/1

# Task 3: Get books by author
curl http://localhost:5000/author/Chinua%20Achebe

# Task 4: Get books by title
curl http://localhost:5000/title/Things%20Fall%20Apart

# Task 5: Get book review
curl http://localhost:5000/review/1

# Task 6: Register
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}"

# Task 7: Login
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}" -c cookies.txt

# Task 8: Add review
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" -b cookies.txt

# Task 9: Delete review
curl -X DELETE http://localhost:5000/customer/auth/review/1 -b cookies.txt
```
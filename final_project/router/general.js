const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user. Username and password are required." });
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn], null, 4));
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let booksByAuthor = [];
    let isbns = Object.keys(books);

    isbns.forEach((isbn) => {
        if (books[isbn]["author"].toLowerCase() === author.toLowerCase()) {
            booksByAuthor.push({ "isbn": isbn, ...books[isbn] });
        }
    });

    if (booksByAuthor.length > 0) {
        res.send(JSON.stringify({ "booksbyauthor": booksByAuthor }, null, 4));
    } else {
        return res.status(404).json({ message: "No books found for the given author" });
    }
});

// Task 4: Get book details based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let booksByTitle = [];
    let isbns = Object.keys(books);

    isbns.forEach((isbn) => {
        if (books[isbn]["title"].toLowerCase() === title.toLowerCase()) {
            booksByTitle.push({ "isbn": isbn, ...books[isbn] });
        }
    });

    if (booksByTitle.length > 0) {
        res.send(JSON.stringify({ "booksbytitle": booksByTitle }, null, 4));
    } else {
        return res.status(404).json({ message: "No books found for the given title" });
    }
});

// Task 5: Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn]["reviews"], null, 4));
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 10: Get all books using async-await with Axios
public_users.get('/async/books', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Task 11: Get book details based on ISBN using Promises with Axios
public_users.get('/async/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error fetching book by ISBN", error: error.message });
        });
});

// Task 12: Get book details based on Author using Promises with Axios
public_users.get('/async/author/:author', function (req, res) {
    const author = req.params.author;
    axios.get(`http://localhost:5000/author/${author}`)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error fetching books by author", error: error.message });
        });
});

// Task 13: Get book details based on Title using async-await with Axios
public_users.get('/async/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by title", error: error.message });
    }
});

module.exports.general = public_users;

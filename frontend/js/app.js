// ======================================
// Library Management System
// Developed by Ahsan Mustafa
// ======================================

// Backend API URL
const API = "/api";

// Store books locally
let books = [];

// ======================================
// Load Books Automatically
// ======================================

window.onload = function () {
    loadBooks();
};

// ======================================
// Get All Books
// ======================================

async function loadBooks() {

    try {

        const response = await fetch(`${API}/books`);

        books = await response.json();

        renderTable(books);

        loadStatistics();

    } catch (error) {

        console.error("Unable to connect Backend");

    }

}

// ======================================
// Render Table
// ======================================

function renderTable(data) {

    const table = document.getElementById("bookTable");

    table.innerHTML = "";

    data.forEach(book => {

        table.innerHTML += `

        <tr>

            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.isbn}</td>

            <td>${book.status}</td>

            <td>

                <button class="edit-btn"
                onclick="editBook(${book.id})">

                Edit

                </button>

                <button class="delete-btn"
                onclick="deleteBook(${book.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// Add Book
// ======================================

async function addBook() {

    const title = document.getElementById("title").value.trim();

    const author = document.getElementById("author").value.trim();

    const category = document.getElementById("category").value.trim();

    const isbn = document.getElementById("isbn").value.trim();

    if (!title || !author || !category || !isbn) {

        alert("Please fill all fields.");

        return;

    }

    const response = await fetch(`${API}/books`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            title,

            author,

            category,

            isbn

        })

    });

    if (response.ok) {

        clearForm();

        loadBooks();

    } else {

        alert("Failed to Add Book");

    }

}

// ======================================
// Delete Book
// ======================================

async function deleteBook(id) {

    if (!confirm("Delete this book?"))

        return;

    await fetch(`${API}/books/${id}`, {

        method: "DELETE"

    });

    loadBooks();

}

// ======================================
// Edit Book
// ======================================

function editBook(id) {

    const book = books.find(b => b.id === id);

    if (!book)

        return;

    const title = prompt("Book Title", book.title);

    const author = prompt("Author", book.author);

    const category = prompt("Category", book.category);

    const isbn = prompt("ISBN", book.isbn);

    if (title == null)

        return;

    updateBook(id, title, author, category, isbn);

}

// ======================================
// Update Book
// ======================================

async function updateBook(id, title, author, category, isbn) {

    await fetch(`${API}/books/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            title,

            author,

            category,

            isbn

        })

    });

    loadBooks();

}

// ======================================
// Search Books
// ======================================

function searchBook() {

    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = books.filter(book =>

        book.title.toLowerCase().includes(keyword) ||

        book.author.toLowerCase().includes(keyword) ||

        book.category.toLowerCase().includes(keyword) ||

        book.isbn.toLowerCase().includes(keyword)

    );

    renderTable(filtered);

}

// ======================================
// Dashboard Statistics
// ======================================

function loadStatistics() {

    document.getElementById("totalBooks").innerHTML = books.length;

    let available = books.filter(book =>

        book.status === "Available"

    ).length;

    let issued = books.filter(book =>

        book.status === "Issued"

    ).length;

    document.getElementById("availableBooks").innerHTML = available;

    document.getElementById("issuedBooks").innerHTML = issued;

    document.getElementById("students").innerHTML = "25";

}

// ======================================
// Clear Form
// ======================================

function clearForm() {

    document.getElementById("title").value = "";

    document.getElementById("author").value = "";

    document.getElementById("category").value = "";

    document.getElementById("isbn").value = "";

}

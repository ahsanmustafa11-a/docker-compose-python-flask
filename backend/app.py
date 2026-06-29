from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# =====================================================
# Database Configuration
# =====================================================

db_config = {
    "host": os.getenv("DB_HOST", "mysql"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "root123"),
    "database": os.getenv("DB_NAME", "library_db"),
    "port": 3306
}


# =====================================================
# Database Connection
# =====================================================

def get_connection():
    return mysql.connector.connect(**db_config)


# =====================================================
# Home Route
# =====================================================

@app.route("/")
def home():

    return jsonify({
        "Application": "Library Management System",
        "Developer": "Ahsan Mustafa",
        "Version": "1.0",
        "Status": "Running"
    })


# =====================================================
# GET ALL BOOKS
# =====================================================

@app.route("/books", methods=["GET"])
def get_books():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM books ORDER BY id DESC")

    books = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)


# =====================================================
# ADD BOOK
# =====================================================

@app.route("/books", methods=["POST"])
def add_book():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO books
    (title,author,category,isbn,status)
    VALUES(%s,%s,%s,%s,%s)
    """

    values = (
        data["title"],
        data["author"],
        data["category"],
        data["isbn"],
        "Available"
    )

    cursor.execute(sql, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Book Added Successfully"
    })


# =====================================================
# UPDATE BOOK
# =====================================================

@app.route("/books/<int:id>", methods=["PUT"])
def update_book(id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE books
    SET
        title=%s,
        author=%s,
        category=%s,
        isbn=%s
    WHERE id=%s
    """

    values = (
        data["title"],
        data["author"],
        data["category"],
        data["isbn"],
        id
    )

    cursor.execute(sql, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Book Updated Successfully"
    })


# =====================================================
# DELETE BOOK
# =====================================================

@app.route("/books/<int:id>", methods=["DELETE"])
def delete_book(id):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM books WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Book Deleted Successfully"
    })


# =====================================================
# Dashboard Statistics
# =====================================================

@app.route("/stats")
def stats():

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) total FROM books")
    total = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) available
        FROM books
        WHERE status='Available'
    """)
    available = cursor.fetchone()["available"]

    cursor.execute("""
        SELECT COUNT(*) issued
        FROM books
        WHERE status='Issued'
    """)
    issued = cursor.fetchone()["issued"]

    cursor.close()
    conn.close()

    return jsonify({

        "total_books": total,

        "available_books": available,

        "issued_books": issued,

        "students": 25

    })


# =====================================================
# Health Check
# =====================================================

@app.route("/health")
def health():

    return jsonify({
        "status": "healthy"
    })


# =====================================================
# Run Server
# =====================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

    )

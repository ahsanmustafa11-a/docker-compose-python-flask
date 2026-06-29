-- =====================================================
-- Library Management System Database
-- Developed by: Ahsan Mustafa
-- =====================================================

CREATE DATABASE IF NOT EXISTS library_db;

USE library_db;

-- =====================================================
-- Books Table
-- =====================================================

CREATE TABLE IF NOT EXISTS books (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    author VARCHAR(255) NOT NULL,

    category VARCHAR(100) NOT NULL,

    isbn VARCHAR(50) UNIQUE NOT NULL,

    status ENUM('Available','Issued') DEFAULT 'Available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- Students Table
-- =====================================================

CREATE TABLE IF NOT EXISTS students (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(150) UNIQUE,

    phone VARCHAR(30),

    department VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- Issued Books Table
-- =====================================================

CREATE TABLE IF NOT EXISTS issued_books (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    book_id INT,

    issue_date DATE,

    return_date DATE,

    status ENUM('Issued','Returned') DEFAULT 'Issued',

    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE,

    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE

);

-- =====================================================
-- Sample Books
-- =====================================================

INSERT INTO books(title,author,category,isbn,status) VALUES

('Python Programming','John Smith','Programming','9781111111111','Available'),

('Docker Deep Dive','Nigel Poulton','DevOps','9782222222222','Available'),

('Linux Administration','Jason Cannon','Linux','9783333333333','Issued'),

('AWS Solutions Architect','Stephane Maarek','Cloud','9784444444444','Available'),

('Kubernetes in Action','Marko Luksa','DevOps','9785555555555','Available'),

('Red Hat RHCSA','Sander van Vugt','Linux','9786666666666','Issued'),

('Networking Fundamentals','Todd Lammle','Networking','9787777777777','Available'),

('Azure Administrator','Microsoft','Cloud','9788888888888','Available');

-- =====================================================
-- Sample Students
-- =====================================================

INSERT INTO students(name,email,phone,department) VALUES

('Ahsan Mustafa','ahsan@gmail.com','03001234567','Computer Science'),

('Ali Khan','ali@gmail.com','03001112222','Software Engineering'),

('Ahmed Raza','ahmed@gmail.com','03005556666','Information Technology'),

('Usman Tariq','usman@gmail.com','03009998888','Computer Science');

-- =====================================================
-- Sample Issued Books
-- =====================================================

INSERT INTO issued_books
(student_id,book_id,issue_date,return_date,status)

VALUES

(1,3,'2026-06-01','2026-06-15','Issued'),

(2,6,'2026-06-10','2026-06-25','Issued');

-- =====================================================
-- View Books
-- =====================================================

SELECT * FROM books;

SELECT * FROM students;

SELECT * FROM issued_books;

CREATE TABLE authors(
	id serial PRIMARY KEY,
	firstName char(24) NOT NULL,
	lastName char(24) NOT NULL,
	publishedBooks text [] REFERENCES books(id)
);
CREATE TABLE users(
	id serial PRIMARY KEY,
	isAdmin boolean NOT NULL,
	email char(24) NOT NULL,
	firstName char(24) NOT NULL,
	lastName char(24) NOT NULL,
);
CREATE TABLE book(
	id serial PRIMARY KEY,
	ISBN char(24) NOT NULL UNIQUE,
	title char(24) NOT NULL,
	description varchar(255) NOT NULL,
	publisher char(24),
	publishedDate date,
	authors serial REFERENCES authors(id),
	borrowerId serial REFERENCES users(id),
	borrowDate date,
	returnDate date,
	category char(24),
	available boolean
);
CREATE INDEX authors_id_index ON authors(id);
CREATE INDEX users_id_index ON users(id);
CREATE INDEX books_id_index ON books(id);
CREATE INDEX books_title_index ON books(title);
CREATE INDEX books_authors_index ON books(authors);
CREATE INDEX books_isbn_index ON books(ISBN);
CREATE INDEX books_available_index ON books(available);


SELECT id
FROM authors
WHERE id = query;

SELECT id
FROM users
WHERE id = query;

SELECT *
FROM books;

SELECT id
FROM books
WHERE id = query;

SELECT * 
FROM books
WHERE title = query;

SELECT *
FROM books
WHERE authors = query;

SELECT *
FROM books
WHERE isbn = query;

SELECT *
FROM books
WHERE available = query;



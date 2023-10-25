const getBookInfo = "SELECT * FROM booksinfo";
const addBook = "INSERT INTO booksinfo (Name, Author, Description) VALUES ($1, $2, $3)";
const deleteBook = "DELETE FROM booksinfo WHERE id = $1";
const updateBook ="UPDATE booksinfo SET Name = $1, Author = $2, Description = $3  WHERE id = $4";

module.exports = {
    getBookInfo,
    addBook,
    deleteBook,
    updateBook
}